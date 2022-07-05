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

### 生产环境特有插件

#### 全局变量替换插件

提供全局变量替换功能，比如下面这个配置：

```ts
// vite.config.ts
const version = "2.0.0"

export default {
  define: {
    __APP_VERSION__: `JSON.stringify(${version})`,
  },
}
```

全局变量替换的功能和 `@rollup/plugin-replace` 差不多，在实现上，Vite 会有所区别：

- 开发环境下，Vite 会通过将所有的全局变量挂载到 window 对象，而不用经过 define 插件的处理，节省编译开销：
- 生产环境下，Vite 会使用 [define 插件](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/define.ts) ，进行字符串替换以及 sourcemap 生成

> 特殊情况：SSR 构建会在开发环境经过这个插件，仅替换字符串

#### CSS 后处理插件

CSS 后处理插件即 name 为 `vite:css-post` 的插件，它的功能包括开发阶段 CSS 响应结果处理和生产环境 CSS 文件生成。

首先，在开发阶段，这个插件会将之前的 CSS 编译插件处理后的结果，包装成一个 ESM 模块，返回给浏览器。

其次，生产环境中，Vite 默认会通过这个插件进行 CSS 的 code splitting ，即对于每个异步 chunk ，Vite 会将其依赖的 CSS 代码单独打包成一个文件。

如果 CSS 的 code splitting 功能被关闭 ( 通过 `build.cssCodeSplit` 配置 ) ，那么 Vite 会将所有的 CSS 代码打包到同一个 CSS 文件中。

最后，插件会调用 Esbuild 对 CSS 进行压缩，实现在 `minifyCSS` 函数中。

#### HTML 构建插件

HTML 构建插件即 `build-html` 插件，项目根目录下的 html 会转换为一段 JavaScript 代码，比如下面这个例子：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    // 普通方式引入
    <script src="./index.ts"></script>
    // 内联脚本
    <script type="module">
      import React from "react"
      console.log(React)
    </script>
  </body>
</html>
```

首先，当 Vite 在生产环境 transform 这段入口 HTML 时，会做三件事：

1. 对 HTML 执行各个插件中带有 `enforce: "pre"` 属性的 transformIndexHtml 钩子

> 插件本身可以带有 `enforce: "pre" | "post"` 属性，而 transformIndexHtml 本身也可以带有这个属性，用于在不同的阶段进行 HTML 转换。

1. 将其中的 script 标签内容删除，将其转换为 import 语句，如 `import "./index.ts"` ，并记录

1. 在 transform 钩子中返回记录下的 import 内容，将 import 语句作为模块内容进行加载。也就是说，虽然 Vite 处理的是一个 HTML 文件，但最后进行打包的内容确是一段 JS 的内容。

   ```ts
   export function buildHtmlPlugin() {
     name: 'vite:build',
     transform(html, id) {
       if (id.endsWith('.html')) {
         let js = '';
         // 省略 HTML AST 遍历过程(通过 @vue/compiler-dom 实现)
         // 收集 script 标签，转换成 import 语句，拼接到 js 字符串中
         return js;
       }
     }
   }
   ```

其次，在生成产物的最后一步，即 `generateBundle` 钩子中，拿到入口 Chunk ，分析入口 Chunk 内容，分情况进行处理。

如果只有 import 语句，先通过 Rollup 提供的 chunk 和 bundle 对象获取入口 chunk 所有的依赖 chunk ，并将这些 chunk 进行后续排列，如 `a 依赖 b ，b 依赖 c` ，最后的依赖数组就算是 `[c, b, a]` 。然后依次将 c ，b ，a 生成三个 script 标签，插入 HTML 中。最后，Vite 会将入口 chunk 的内容从 bundle 产物中移除，因此它的内容只要 import 语句，而它 import 的 chunk 已经作为 script 标签插入到了 HTML 中，那入口 chunk 的存在也就没有意义了。

如果除了 import 语句，还有其它内容，Vite 就会将入口 chunk 单独生成一个 script 标签，分析出依赖的后序排列 ( 和上一种情况同分析手段 ) ，然后通过注入 `<link rel="modulepreload">` 标签，对入口文件的依赖 chunk 进行预加载。

最后，插件会调用用户插件中带有 `enforce: "post"` 属性的 transformIndexHtml 钩子，对 HTML 进行进一步的处理。

#### Commonjs 转换插件

在开发环境中，Vite 使用 Esbuild 将 Commonjs 转换为 ESM ，而生产环境中，Vite 会直接使用 Rollup 的官方插件 `@rollup/plugin-commonjs` 。

#### date-url 插件

date-url 插件用来支持 import 模块中含有 Base64 编码的情况，如：

```ts
import batman from "data:application/json;base64, eyAiYmF0bWFuIjogInRydWUiIH0="
```

#### dynamic-import-vars 插件

用于支持在动态 import 中使用变量的功能，如：

```ts
function importLocale(locale) {
  return import(`./locales/${locale}.js`)
}
```

内部使用的是 Rollup 的官方插件 `@rollup/plugin-dynamic-import-vars`

#### import-meta-url 支持插件

用来转换如下格式的资源 URL ：

```ts
new URL("./foo.png", import.meta.url)
```

将其转换为生产环境的 URL 格式，如：

```ts
// 使用 self.location 来保证低版本浏览器和 Web Worker 环境的兼容性
new URL('./assets.a4b3d56d.png, self.location)
```

同时也能支持动态 import ，如：

```ts
function getImageUrl(name) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
```

Vite 识别到 `./dir/${name}.png` 这样的模板字符串，会将整行代码转换成下面这样：

```ts
function getImageUrl(name) {
  return import.meta.globEager("./dir/**.png")[`./dir/${name}.png`].default
}
```

#### 生产环境 import 分析插件

`vite:build-import-analysis` 插件会在生产环境打包时，用作 import 语句分析和重写，主要目的是对动态 import 的模块进行预加载处理。

Vite 内置了 CSS 代码分割的能力，当一个模块通过动态 import 引入时，这个模块会被单独打包成一个 chunk ，与此同时这个模块中的样式代码也会打包成单独的 CSS 文件。如果异步模块的 CSS 和 JS 同时进行预加载，那么在某些浏览器 ( 如 IE ) 就会出现 [FOUC 问题](https://en.wikipedia.org/wiki/Flash_of_unstyled_content#:~:text=A flash of unstyled content,before all information is retrieved.) ，页面样式会闪烁，影响用户体验。但 Vite 通过监听 link 标签 load 事件的方式来保证 CSS 在 JS 之前加载完成，从而解决了 FOUC 问题，如：

```ts
if (isCss) {
  return new Promise((res, rej) => {
    link.addEventListener("load", res)
    link.addEventListener("error", rej)
  })
}
```

现在已经知道了预加载的实现方法，那么 Vite 是如何将动态 import 编译成预加载的代码的呢？

从源码的 transform 钩子实现中，Vite 会将动态 import 的代码进行转换，如：

```ts
// 转换前
import('a')
// 转换后
__vitePreload(() => 'a', __VITE_IS_MODERN__ ?"__VITE_PRELOAD__":void)
```

其中，`__vitePreload` 会被加载为前文中的 `preload` 工具函数，`__VITE_IS_MODERN__` 会在 renderChunk 中被替换成 true 或者 false ，表示是否为 Modern 模式打包，而对于 `__VITE_PRELOAD__` ，Vite 会在 `generateBundle` 阶段，分析出 a 模块所有依赖文件 ( 包括 CSS ) ，将依赖文件名的数组作为 preload 工具函数的第二个参数。

同时，对于 Vite 独有的 `import.meta.glob` 语法，也会在这个插件中进行编译，如：

```ts
const modules = import.meta.glob("./dir/*.js")
```

会通过插件转换成下面这段代码：

```ts
const modules = {
  "./dir/foo.js": () => import("./dir/foo.js"),
  "./dir/bar.js": () => import("./dir/bar.js"),
}
```

具体实现在 [transformImportGlob](https://github.com/vitejs/vite/blob/075128a8dd0a2680540179dad2277a797f793199/packages/vite/src/node/importGlob.ts#L11) 函数中，除了被该插件使用外，这个函数还被依赖预构建、开发环境 import 分析等核心流程使用，属于比较底层的逻辑。

#### JS 压缩插件

Vite 提供了两种 JS 代码压缩工具，Esbuild 和 Terser ，分别由两个插件实现：

- `vite:esbuild-transpile` ：在 renderChunk 阶段，调用 Esbuild 的 transform API ，并指定 minify 参数，从而实现 JS 的压缩。
- `vite:terser` ：同样在 renderChunk 阶段，Vite 会单独的在 Worker 进程中调用 Terser 进行 JS 代码压缩。

#### 构建报告插件

主要由三个插件输出构建报告：

- `vite:manifest` ：提供打包后的各种资源文件及其关联信息
- `vite:ssr-manifest` ：提供每个模块与 chunk 之间的映射关系，方便 SSR 时期通过渲染的组件来确定哪些 chunk 会被使用，从而按需进行预加载
- `vite:reporter` ：主要提供打包时的命令行构建日志

### 开发环境特有插件

#### 客户端环境变量注入插件

在开发环境中，Vite 会自动往 HTML 中注入一段 client 的脚本：

```ts
<script type="module" src="/@vite/client"></script>
```

这段脚本主要提供注入环境变量、处理 HMR 更新逻辑、构建出现错误时提供报错界面等功能。通过 `vite:client-inject` 完成环境变量的注入，将 client 脚本中的 `__MODE__` 、`__BASE__` 、`__DEFINE__` 等等字符串替换为运行时的变量，实现环境变量以及 HMR 相关上下文信息的注入。

#### 开发阶段 import 分析插件

Vite 会在开发阶段加入 import 分析插件，即 `vite:import-analysiss` 。与 `vite:build-import-analysis` 相对应，主要处理 import 语句相关的解析和重写，但 `vite:import-analysis` 插件的关注点不太一样，主要围绕 Vite 开发阶段的各项特性实现，它会完成以下内容：

- 对 `bare import` ，将路径名转换为真实的文件路径

  ```ts
  // 转换前
  import "foo"
  // 转换后
  // tip: 如果是预构建的依赖，则会转换为预构建产物的路径
  import "/@fs/project/node_modules/foo/dist/foo.js"
  ```

  主要调用 `PluginContainer` 的上下文对象方法，即 `this.resolve` 实现，这个方法会调用所有插件的 `resolveId` 方法，包括 `vite:pre-alias` 和 `vite:resolve` ，完成路径解析的核心逻辑。

- 对于 HMR 的客户端 API ，即 `import.meta.hot` ，Vite 在识别到这样的 import 语句后，一方面会注入 `import.meta.hot` 的实现，因为浏览器原生并不具备这样的 API ；另一方面会识别 accept 方法，并判断 accept 是否为 `接受自身更新` 的类型，如果是，则标记上 `isSelfAccepting` ，便于 HMR 在服务端进行更新时进行 `HMR Boundary` 的查找

- 对于全局环境变量读取语句，即 `import.meta.env` ，Vite 会注入 `import.meta.env` 的实现，也就是如下的 env 字符串：

  ```ts
  // config 即解析完的配置
  let env = `import.meta.env = ${JSON.stringify({
    ...config.env,
    SSR: !!ssr,
  })};`
  // 对用户配置的 define 对象中，将带有 import.meta.env 前缀的全局变量挂到 import.meta.env 对象上
  for (const key in config.define) {
    if (key.startsWith(`import.meta.env.`)) {
      const val = config.define[key]
      env += `${key} = ${typeof val === "string" ? val : JSON.stringify(val)};`
    }
  }
  ```

- 对于 `import.meta.glob` ，Vite 会调用 `transformImportGlob` 函数进行语法转换，但与生产环境的处理不同，在转换之后，Vite 会将该模块通过 glob 导入的依赖模块记录在 server 实例上，以便于 HMR 更新的时候能得到更准确的模块依赖信息
