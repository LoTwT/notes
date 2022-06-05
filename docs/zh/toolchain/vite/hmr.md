# 热更新

HMR 的全称叫做 Hot Module Replacement ，即模块热更新或模块热替换。

在计算机领域当中，有一个类似的概念，叫做热插拔。

HMR 的作用就是，在页面模块更新的时候，直接把页面中发生变化的模块替换为新的模块，同时不影响其它模块的正常运作。

通过 HMR 的技术可以实现局部刷新和状态保存。

## API

Vite 作为一个完整的构建工具，本身实现了一套 HMR 系统，这套 HMR 系统基于原生的 ESM 模块规范实现，在文件发生改变时，Vite 会侦测到相应 ES 模块的变化，从而触发相应的 API ，实现局部的更新。

HMR API 的类型定义：

```ts
interface ImportMeta {
  readonly hot?: {
    readonly data: any
    accept(): void
    accept(cb: (mod: any) => void): void
    accept(dep: string, cb: (mod: any) => void): void
    accept(deps: string[], cb: (mods: any[]) => void): void
    prune(cb: () => void): void
    dispose(cb: (data: any) => void): void
    decline(): void
    invalidate(): void
    on(event: string, cb: (...args: any[]) => void): void
  }
}
```

`import.meta` 对象是现代浏览器原生的一个内置对象，Vite 所做的事情就是在这个对象上的 hot 属性中定义了一套完整的属性和方法。

因此，在 Vite 当中，可以通过 `import.meta.hot` 访问关于 HMR 的这些属性和方法。

### accept

模块更新时的逻辑。

它决定了 Vite 进行热更新的边界。

从字面上看，accept 表示接受的意思，它是用来接受模块更新的。一旦 Vite 接受了这个更新，当前模块就会被认为是 HMR 的边界。

Vite 会接受三种更新：

1. 接受自身模块的更新
1. 接受某个子模块的更新
1. 接受多个子模块的更新

三种情况分别对应 accept 方法三种不同的使用方式

#### 接受自身更新

当模块接受自身更新时，则当前模块会被认为是 HMR 的边界。也就是说，除了当前模块，其他的模块均未收到任何影响。

```ts
// 条件守卫
if (import.meta.hot) {
  import.meta.hot.accept((mod) => mod.render())
}
```

`import.meta.hot` 对象只有在开发阶段才会被注入到全局，生产环境无法访问，增加条件守卫之后，打包时识别到 if 条件不成立，会自动把这部分代码从打包产物中移除，优化资源体积。

`import.meta.hot.accept((mod) => mod.render())` 传入了一个回调函数作为参数，入参为 Vite 提供的更新后的模块内容，`mod.render()` 就是当模块变动后，每次都重新渲染一遍内容。

直接调用 `import.meta.hot.accept()` 并不会重新渲染页面，只会把模块的最新内容执行一遍。

#### 接受依赖模块的更新

比如，main 模块依赖 render 模块，即 main 模块是 render 模块的父模块，那么也可以在 main 模块中接受 render 模块的更新，此时 HMR 边界是 main 模块。

```ts
// main.ts
import { render } from "./render"
import "./state"
render()

if (import.meta.hot) {
  import.meta.hot.accept("./render.ts", (newModule) => {
    newModule.render()
  })
}
```

这里调用 accept 方法时，第一个参数传入一个依赖的路径，这里是 render 模块的路径，这相当于通知 Vite ，代码监听了 render 模块的更新，当它的内容更新的时候，请把最新的内容返回。第二个参数中定义了模块变化后的回调函数，这里拿到了 render 模块最新的内容，然后执行其中的渲染逻辑，让页面展示最新的内容。

#### 接受多个子模块的更新

父模块可以接受多个子模块的更新，当其中任何一个子模块更新之后，父模块会成为 HMR 边界。

```ts
// main.ts
import { render } from "./render"
import { initState } from "./state"
render()
initState()

if (import.meta.hot) {
  import.meta.hot.accept(["./render.ts", "./state.ts"], (modules) => {
    console.log(modules)
  })
}
```

Vite 回调传来的参数 modules 是一个数组，和第一个参数声明的子模块数组一一对应。
