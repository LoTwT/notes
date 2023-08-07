# 再谈 ESM

Vite 本身是借助浏览器原生的 ESM 解析能力 ( `type="module"` ) 实现了开发阶段的 no-bundle ，即不用打包也可以构建 Web 应用。

但请不要对原生 ESM 的理解仅仅停留在 `type="module"` 这个特性上。

一方面浏览器和 Node.js 各自提供了不同的 ESM 使用特性，如 `import maps` 、package.json 的 `imports` 和 `exports` 属性等。

另一方面，前端社区开始筑家你向 ESM 过渡，有的包甚至仅留下 ESM 产物，Pure ESM 的概念随之席卷前端圈。

基于 ESM 的 CDN 基础设施也如雨后春笋般不断涌现，如 esm.sh 、skypack 、jspm 等。

ESM 已经不仅仅局限于一个模块规范的概念，它代表了前端社区生态的走向以及各项前端基础设施的未来。

## 高阶特性

### import map

在浏览器中，可以使用包含 `type="module"` 属性的 script 标签来加载 ESM 模块，而模块路径主要包含三种：

1. 绝对路径，如 `https://cdn.skypack.dev/react`
1. 相对路径，如 `./module-a`
1. `bare import` ，直接写一个第三方包名，如 react 、lodash

对于前两种模块路径，浏览器是原生支持的，而对于 `bare import` ，在 Node.js 能直接执行，因为 Node.js 的路径解析算法会从 node_modules 找到第三方包的路径，但是在浏览器中无法直接执行。

使用现代浏览器内置的 `import map` 可以解决上述问题：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="root"></div>
    <script type="importmap">
      {
        "imports": {
          "react": "https://cdn.skypack.dev/react"
        }
      }
    </script>

    <script type="module">
      import React from "react"
      console.log(React)
    </script>
  </body>
</html>
```

> import map 可能存在浏览器兼容性问题

在支持 `import map` 的浏览器中，在遇到 `type="module"` 的 script 标签时，浏览器会记录下第三方包的路径映射表，在遇到 bare import 时会根据这张表拉取远程的依赖代码。

但 `import map` 只能兼容市面上 68% 左右的浏览器份额，然而 `type="module"` 能兼容 95% 以上的浏览器，但社区对应的 polyfill 解决方案 —— [es-module-shims](https://github.com/guybedford/es-module-shims) ，完整地实现了包含 `import map` 在内的各大 ESM 特性，还包括：

1. `dynamic import` 。动态导入，部分老版本的 Firefox 和 Edge 不支持
1. `import.meta` 和 `import.meta.url` 。当前模块的元信息，类似 Node.js 中的 `__dirname` 、`__filename`
1. `modulepreload` 。以前需要在 link 标签中加上 `rel="preload"` 来进行资源预加载，即在浏览器解析 HTML 之前就开始加载资源，现在对于 ESM 也有对应的 `modulepreload` 支持这个行为
1. `JSON Modules` 和 `CSS Modules` ，通过如下方式引入 json 或 css：

   ```html
   <script type="module">
     // 获取 json 对象
     import json from "https://site.com/data.json" assert { type: "json" }
     // 获取 CSS Modules 对象
     import sheet from "https://site.com/sheet.css" assert { type: "css" }
   </script>
   ```

es-module-shims 基于 WASM 实现，性能并不差，相比浏览器原生的行为没有明显的下降。

## Node.js 包导入导出策略

在 Node.js ( >= 12.20 ) 有以下几种方式使用原生 ESM ：

1. 文件以 .mjs 结尾
1. package.json 中声明 `type: "module"`

在 Node.js 处理 ESM 导入导出时，如果是处理 Npm 包级别的情况，细节比想象中更复杂。

当导出一个包使，有两种方式：main 和 exports 属性。这两个属性均来自 package.json ，并且根据 Node.js 官方的 [resolve 算法](http://nodejs.cn/api/esm.html#resolver-algorithm-specification) ，exports 的优先级比 main 更高，如果同时设置了这两个属性，exports 会优先生效。

> main 的使用比较简单，设置包的入口文件路径即可

```json
{
  "main": "./dist/index.js"
}
```

> exports 比较复杂，它包含了多种导出形式：默认导出、子路径导出、条件导出

```json
// package.json
{
  "name": "package-a",
  "type": "module",
  "exports": {
    // 默认导出，使用方式: import a from 'package-a'
    ".": "./dist/index.js",
    // 子路径导出，使用方式: import d from 'package-a/dist'
    "./dist": "./dist/index.js",
    "./dist/*": "./dist/*", // 这里可以使用 `*` 导出目录下所有的文件
    // 条件导出，区分 ESM 和 CommonJS 引入的情况
    "./main": {
      "import": "./main.js",
      "require": "./main.cjs"
    }
  }
}
```

条件导出可包括以下常见的属性：

- node ：在 Node.js 环境下适用，可以定义为嵌套条件导出

  ```json
  {
    "exports": {
      ".": {
        "node": {
          "import": "./main.js",
          "require": "./main.cjs"
        }
      }
    }
  }
  ```

- import ：用于 import 方式导入的情况，如 `import("package-a")`
- require ：用于 require 方式导入的情况，如 `require("package-a")`
- default ：兜底方案，如果前面的条件都没命中，则使用 default 导出的路径
- types 、browser、development、production 等 ：请参考[文档](https://nodejs.org/api/packages.html#cond

> imports

```json
{
  "imports": {
    // key 一般以 # 开头
    // 也可以直接赋值为一个字符串: "#dep": "lodash-es"
    "#dep": {
      "node": "lodash-es",
      "default": "./dep-polyfill.js"
    }
  },
  "dependencies": {
    "lodash-es": "^4.17.21"
  }
}
```

可以这样使用：

```ts
// index.js
import { cloneDeep } from "#dep"

const obj = { a: 1 }

// { a: 1 }
console.log(cloneDeep(obj))
```

Node.js 在执行使会将 `#dep` 定位到 `lodash-es` 这个第三方包，当也可以定位到某个内部文件，这样相当于实现了路径别名功能。不过与构建工具中的 alias 功能不同的是，`imports` 中声明的别名必须全量匹配，，否则 Node.js 会直接报错。
