# SSR

随着 AJAX 技术的成熟以及各种前端框架的兴起，前后端分离的开发模式逐渐成为常态，前端只负责页面 UI 及逻辑的开发，而服务端只负责提供数据接口，这种开发方式下的页面渲染叫客户端渲染 ( Client Side Render ，简称 CSR ) 。

客户端渲染存在首屏加载慢，SEO 不友好等问题，因此 SSR ( Server Side Render ) 即服务端渲染技术应运而生，它保留 CSR 技术栈的同时，也能解决 CSR 的各种问题。

## 基本概念

CSR 的 HTML 产物结构：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" href="xxx.css" />
  </head>
  <body>
    <!-- 一开始没有页面内容 -->
    <div id="root"></div>
    <!-- 通过 JS 执行来渲染页面 -->
    <script src="xxx.chunk.js"></script>
  </body>
</html>
```

浏览器渲染流程：

![浏览器渲染流程](/vite/browser-render.jpg)

当浏览器拿到 CSR 的 HTML 内容后，并不能立即渲染完整的页面内容，此时 body 中只有一个空的 div 节点。需要等待浏览器下载并执行 JS 代码，经历了框架初始化、数据请求、DOM 插入等操作后才能渲染出完整的页面。

CSR 中完整的页面内容本质上通过 JS 代码执行之后进行渲染，所以会导致首屏加载慢和 SEO 不友好。

然而，在 SSR 的场景下，服务端生成好完整的 HTML 内容，直接返回给浏览器，浏览器能够根据 HTML 渲染出完整的首屏内容，而不需要依赖 JS 的加载。

但是，SSR 中只能生成页面的内容和结构，并不能完成事件绑定，因此需要在浏览器中执行 CSR 的 JS 脚本，完成事件绑定，让页面拥有交互的能力，这个过程被称作 hydrate ( 可以翻译为注水、激活、水合 ) 。

像这样服务端渲染 + 客户端 hydrate 的应用叫做同构应用。

## 生命周期

SSR 首先需要保证前端的代码经过编译后放到服务端中能够正常执行，其次在服务端渲染前端组件，生成并组装应用的 HTML 。

这里涉及到了 SSR 应用的两大生命周期：构建时和运行时。

SSR 是构建时和运行时互相配合才能实现，仅靠构建工具是不够的，写一个 Vite 插件严格意义上无法实现 SSR 的能力，需要对 Vite 的构建流程做一些整体的调整，并且加入一些服务端运行时的逻辑才能实现。

### 构建时

构建时需要做以下事情：

1. 解决模块加载问题。在原有的构建过程外，需要加入 SSR 构建过程，具体来说，就是需要另外生成一份 CommonJS 格式的产物，使之能在 Node.js 正常加载。但随着 Node.js 对 ESM 的支持越来越成熟，可以复用前端 ESM 格式的代码。
1. 移除样式代码的引入。直接引入一行 CSS 在服务端是无法执行的，因为 Node.js 无法解析 CSS 内容，但 CSS Modules 情况除外：

   ```ts
   import styles from "./index.module.css"

   // 这里的 styles 是一个对象，如{ "container": "xxx" }，而不是 CSS 代码
   console.log(styles)
   ```

1. 依赖外部化 ( external ) 。对于某些第三方依赖，并不需要使用构建后的版本，而是直接从 node_modules 中读取，比如 react-dom ，因此在 SSR 构建的过程中将不会构建这些依赖，从而加速 SSR 构建。

### 运行时

SSR 的运行时可以拆分为比较固定的生命周期阶段：

1. 加载 SSR 入口模块。在这个阶段，需要确定 SSR 构建产物的入口，即组件的入口在哪里，并加载对应的模块。
1. 进行数据预取。这个阶段，Node.js 侧会通过查询数据库或者网络请求来获取应用所需的数据。
1. 渲染组件。这个阶段是 SSR 的核心，主要将第一步中加载组件渲染成 HTML 字符串或 Stream 流。
1. HTML 拼接。在组件渲染完成之后，需要拼接完整的 HTML 字符串，并将其作为响应返回给浏览器。

## 基于 Vite 搭建 SSR 项目

### SSR 构建 API

开发环境下，Vite 秉承 ESM 模块按需加载即 no-bundle 的理念，对外提供 `ssrLoadModule` API ，无需打包项目，将入口文件的路径传入即可。

```ts
// 加载服务端入口模块
const xxx = await vite.ssrLoadModule("/src/entry-server.tsx")
```

在生产环境下，Vite 会默认进行打包，对于 SSR 构建输出 CommonJS 格式的产物。( Vite 3 改为 ESM )

```json
// package.json
{
  "build:ssr": "vite build --ssr 服务端入口路径"
}
```

通过执行上述命令，Vite 会专门为 SSR 打包出一份构建产物，开箱即用即可。

### 项目链接

[vite-ssr-demo](https://github.com/LoTwT/vite-ssr-demo)

### 工程化问题

#### 路由管理

在 SPA 场景下，对于不同的前端框架，一般会有不同的路由管理方案，如 Vue 中的 vue-router ，React 的 react-router ，但不管是什么路由方案，在 SSR 过程中所完成的功能都是差不多的：

1. 告诉框架现在渲染哪个路由。在 Vue 中使用 `router.push` ，在 React 中通过 `StaticRouter` 配合 `location` 参数。
1. 设置 `base` 前缀。规定路径的前缀，如 `vue-router` 的 base 参数，react-router 中 `StaticRouter` 组件的 basename 。

#### 全局状态管理

对于全局的状态管理而言，不同的框架也有不同的生态和方案。

各个状态管理工具接入 SSR 的思路也比较简单，在`预取数据`阶段初始化服务端的 `store` ，将异步获取的数据存入 `store` ，然后在`拼接 HTML` 阶段将数据从 `store` 中取出，放到 `script` 标签中，最后在客户端 `hydrate` 时通过 `window` 访问到预取数据。

> 需要注意的是，服务端处理很多不同的请求，对于每个请求都需要分别初始化 store ，即一个请求一个 store ，不然会造成全局状态污染。

### CSR 降级

在某些极端情况下，需要从 SSR 降级回 CSR ，即客户端渲染，一般包括以下场景：

1. 服务端预取数据失败，需要降级到客户端获取数据
1. 服务器异常，需要返回兜底的 CSR 模板，完全降级为 CSR
1. 本地开发调试，有时需要跳过 SSR ，仅进行 CSR
