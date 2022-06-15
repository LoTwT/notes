# 插件流水线

Vite 在开发阶段实现了一个按需加载的服务器，每一个文件请求进来都会经历一系列的编译流程，然后 Vite 会将编译结果响应给浏览器。在生产环境下，Vite 同样会执行一系列的编译过程，将编译结果交给 Rollup 进行模块打包。这一系列的编译过程指的就是 Vite 的插件工作流水线 ( Pipeline ) ，而插件功能是 Vite 构建能力的核心，谈到阅读 Vite 源码，绕不开插件的作用与实现原理。

## 插件容器

- 生产环境中 Vite 直接调用 Rollup 进行打包，所以 Rollup 可以调度各种插件
- 在开发环境中，Vite 模拟了 Rollup 的插件机制，设计了一个 `PluginContainer` 对象来调度各个插件

`PluginContainer` ( 插件容器 ) 对象非常重要，它的[实现](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/server/pluginContainer.ts)基于 WMR 中的 `rollup-plugin-container.js` ，主要分为：

1. 实现 Rollup 插件钩子的调度
1. 实现插件钩子内部的 Context 上下文对象

在各种钩子被调用时，Vite 会强制将钩子函数的 `this` 绑定为一个上下文对象。

这个上下文对象的作用是模拟 Rollup 钩子函数中插件执行的上下文对象。

Vite 将 Rollup 的 `PluginContext` 对象重新实现了一遍，因为只是开发阶段用到，所以去除了一些打包相关的方法实现。同时，上下文对象与 Vite 开发阶段的 ModuleGraph ( 模块依赖图 ) 相结合，是为了实现开发时的 HMR 。

`transform` 钩子也会绑定一个插件上下文对象，但这个对象继承自之前的 `Context` 对象，其只比其它钩子多做了一些扩展，增加了 sourcemap 合并的功能，将不同插件的 transform 钩子执行后返回的 sourcemap 进行合并，以保证 sourcemap 的准确性和完整性。

## 插件工作流

Vite 使用 `resolvePlugins` 方法生成插件流水线。

Vite 插件的具体执行顺序：

1. 别名插件：包括 `vite:pre-alias` 和 `@rollup/plugin-alias` ，用于路径别名替换
1. 用户自定义 pre 插件：带有 `enforce: "pre"` 属性的自定义插件
1. Vite 核心构建插件
1. 用户自定义普通插件：不带有 `enforce` 属性的自定义插件
1. Vite 生产环境插件和用户插件中带有 `enforce: "post"` 属性的插件
1. 开发阶段特有插件：包括环境变量注入插件 `clientInjectionsPlugin` 和 import 语句分析及重写插件 `importAnalysisPlugin`

## 插件功能

除了用户自定义插件外，Vite 的内置插件有以下几类：

1. 别名插件
1. 核心构建插件
1. 生产环境特有插件
1. 开发环境特有插件

### 别名插件

别名插件有两个，分别是 `vite:pre-alias` 和 `@rollup/plugin-alias` ，前者主要是为了将 `bare import` 路径重定向到预构建依赖的路径；后者则是实现了比较通用的路径别名 ( `resolve.alias` 配置 ) 的功能。

### 核心构建插件

#### module preload 特性的 Polyfill

当在 Vite 配置文件中开启以下配置时：

```ts
{
  build: {
    polyfillModulePreload: true
  }
}
```

Vite 会自动应用 `modulePreloadPolyfillPlugin` 插件，在产物中注入 module preload 的 Polyfill 代码，实现原理：

1. 扫描出当前所有的 modulepreload 标签，拿到 link 标签对应的地址，通过 fetch 实现预加载
1. 同时通过 MutationObserver 监听 DOM 的变化，一旦发现包含 modulepreload 属性的 link 标签，则同样通过 fetch 请求实现预加载

> 由于部分支持原生 ESM 的浏览器并不支持 module preload ，因此某些情况下需要注入相应的 polyfill 进行降级。

#### 路径解析插件

路径解析插件 `vite:resolve` 是 Vite 中比较核心的插件，几乎所有重要的 Vite 特性都离不开这个插件的实现，诸如依赖预构建、HMR 、SSR 等等。同时它也是实现相当复杂的插件，一方面实现了 [Node.js 官方的 resolve 算法](https://nodejs.org/api/modules.html#modules_all_together) ，另一方面需要支持前面所说的各项特性，可以说是专门给 Vite 实现了一套路径解析算法。

#### 内联脚本加载插件

对于 HTML 中的内联脚本，Vite 会通过 `vite:html-inline-script-proxy` 插件进行加载，比如下面这个 script 标签：

```html
<script type="module">
  import React from "react"
  console.log(React)
</script>
```

以上内容会在后续的 `build-html` 插件从 HTML 代码中剔除，并且变成下面这一行代码插入到项目入口模块的代码中：

```ts
import "/User/xxx/vite-app/index.html?http-proxy&index=0.js"
```

#### CSS 编译插件

即名为 `vite:css` 的插件，主要实现以下功能：

1. CSS 预处理器的编译
1. CSS Modules
1. Postcss 编译
1. 通过 @import 记录依赖，便于 HMR

这个插件的核心在于 `compileCSS` 函数的实现。

#### Esbuild 转译插件

即名为 `vite:esbuild` 的插件，用来进行 `.js` 、`.ts` 、`.jsx` 、`.tsx` 的转译，代替了传统的 Babel 或 TSC 功能，这也是 Vite 开发阶段性能强悍的一个原因。

插件的主要逻辑是 `transformWithEsbuild` 函数，Vite 本身也导出了这个函数，作为一种通用的 transform 能力，可以这样使用：

```ts
import { transformWithEsbuild } from "vite"

// 传入两个参数: code, filename
transformWithEsbuild("<h1>hello</h1>", "./index.tsx").then((res) => {
  // {
  //   warnings: [],
  //   code: '/* @__PURE__ */ React.createElement("h1", null, "hello");\n',
  //   map: {/* sourcemap 信息 */}
  // }
  console.log(res)
})
```

#### 静态资源加载插件

静态资源加载插件包括：

1. `vite:json` ：用来加载 JSON 文件，通过 `@rollup/pluginutils` 和 `dataToESM` 方法可实现 JSON 的按名导入
1. `vite:wasm` ：用来加载 `.wasm` 格式的文件
1. `vite:worker` ：用来加载 Web Worker 脚本，插件内部会使用 Rollup 对 Worker 脚本进行打包
1. `vite:asset` ：开发阶段实现了其它格式静态资源的加载，而生产环境会通过 `renderChunk` 钩子将静态资源地址重写为产物的文件地址，如 `./img.png` 重写为 `https://cdn.xxx.com/assets/img.91ee297e.png`

值得注意的是，Rollup 本身存在 asset cascade 问题，即静态资源哈希更新，引用它的 JS 的哈希并没有更新。因此 Vite 在静态资源处理的时候，并没有交给 Rollup 生成资源哈希，而是自己根据资源内容生成哈希，并手动进行路径重写，以此避免 asset-cascade 问题。
