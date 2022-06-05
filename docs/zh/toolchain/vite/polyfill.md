# 语法降级与 polyfill

通过 Vite 构建，完全可以兼容各种低版本浏览器，打包出既支持现代 ( modern ) 浏览器，又支持旧版 ( legacy ) 浏览器的产物。

## legacy

旧版浏览器的语法兼容问题主要分为：语法降级和 polyfill 缺失。

语法降级，比如，某些浏览器不支持箭头函数，就需要将其转换为 `function() {}` 语法。

polyfill ，本身可以翻译为垫片，也就是为浏览器提前注入一些 API 的实现代码，如 `Object.entries` 方法的实现，这样可以保证产物可以正常使用这些 API ，防止报错。

这两类问题，本质上是通过前端的编译工具链 ( 如 Babel ) 以及 JavaScript 的基础 Polyfill 库 ( 如 corejs ) 来解决，不会跟具体的构建工具绑定。

构建工具考虑的仅仅是如何将这些底层基础设施接入到构建过程的问题，自己并不需要提供底层的解决方案。

## 底层工具链

### 工具概览

- 编译时工具，代表有：`@babel/preset-env` 和 `@babel/plugin-transform-runtime`
- 运行时基础库，代表有：`core-js` 和 `regenerator-runtime`

编译时工具的作用是在代码编译阶段进行语法降级以及添加 polyfill 代码的引用语句，如

```ts
import "core-js/modules/es6.set.js"
```

这些工具只是编译阶段用到，运行时并不需要，只需要将其放入 package.json 的 devDependencies 即可。

而运行时基础库是根据 ECMAScript 官方语言规范提供各种 Polyfill 实现代码，主要包括 core-js 和 regenerator-runtime 两个基础库，Babel 也有一些上层的封装，如：

1. @babel/polyfill
1. @babel/runtime
1. @babel/runtime-corejs2
1. @babel/runtime-corejs3

`@babel/runtime` 是个特例，不包含 core-js 的 polyfill 。这类库是项目运行时必须要用到的，因此一定要放到 package.json 的 dependencies 中。

### 实际使用

- `@babel/cli` ：为 Babel 官方的脚手架工具
- `@babel/core` ：Babel 核心编译库
- `@babel/preset-env` ：Babel 的预设工具集，基本为 Babel 必装的库

配置 `.babelrc.json` 如下：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 指定兼容的浏览器版本
        "targets": {
          "ie": "11"
        },
        // 或使用 Browserslist 配置，因其他工具也可能用到，可以修改为对应格式放到 package.json 中
        // ie 不低于 11 版本，全球超过 0.5% 使用，且还在维护更新的浏览器
        // "targets": "ie >= 11, > 0.5%, not dead",
        // 基础库 core-js 的版本，一般指定为最新的大版本
        "corejs": 3,
        // Polyfill 注入策略，后文详细介绍
        "useBuiltIns": "usage",
        // 不将 ES 模块语法转换为其他模块语法
        "modules": false
      }
    ]
  ]
}
```

使用 `@babel/preset-env` 的局限性：

1. 如果使用新特性，往往是通过基础库 ( 如 core-js ) 往全局环境添加 polyfill ，如果是开发应用没有任何问题，如果是开发第三方工具库，则很可能会对全局空间造成污染
1. 很多工具函数的实现代码 ( 如 \_defineProperty 方法 ) ，会在许多文件中重复出现，造成文件体积冗余

### transform-runtime

更优的 polyfill 注入方案。

> `transform-runtime` 是作为 `@babel/preset-env` 中 `useBuiltIns` 配置的替代品，一旦使用，需要将 `useBuiltIns` 设为 false

```bash
# 编译时工具
pnpm i @babel/plugin-transform-runtime -D
# 运行时基础库，封装了 core-js 、regenerator-runtime 和各种语法转换用到的工具函数
pnpm i @babel/runtime-corejs3 -S
```

> core-js 有三种产物，分别是 core-js 、 core-js-pure 、core-js-bundle 。第一种是全局 polyfill，比如 `@babel/preset-env` ；第二种是按需引入；第三种是打包好的版本，包含所有 polyfill ，不太常用。`@babel/runtime-corejs3` 是第二种产物。

.babelrc.json 如下

```json
{
  "plugins": [
    // 添加 transform-runtime 插件
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11"
        },
        "corejs": 3,
        // 关闭 @babel/preset-env 默认的 Polyfill 注入
        "useBuiltIns": false,
        "modules": false
      }
    ]
  ]
}
```

## Vite 语法降级与 Polyfill 注入

Vite 官方提供了开箱即用的方案 `@vitejs/plugin-legacy` ，它同样使用了 `@babel/preset-env` 和 `core-js` 等一系列基础库。

```bash
pnpm i @vitejs/plugin-legacy -D
```

```ts
// vite.config.ts
import legacy from "@vitejs/plugin-legacy"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    // 省略其它插件
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: ["ie >= 11"],
    }),
  ],
})
```

通过 legacy 插件，Vite 会分别打包出 Modern 模式和 Legacy 模式的产物，然后将两种产物插入同一个 HTML 里，Modern 产物被放到 `type="module"` 的 script 标签中，而 Legacy 产物则被放到带有 [nomodule](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-nomodule) 的 script 标签中，这样产物就能同时放到现代浏览器和不支持 ESM 的低版本浏览器中执行。

### 执行原理

![plugin-legacy](/vite/plugin-legacy.jpg)
