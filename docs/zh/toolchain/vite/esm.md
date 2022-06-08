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
<!DOCTYPE html>
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
