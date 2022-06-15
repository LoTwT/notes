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
