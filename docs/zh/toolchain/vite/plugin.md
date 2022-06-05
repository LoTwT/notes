# plugin

## example

插件名称和发布的 npm 包名建议统一，建议格式为 `vite-plugin-xxx`

```ts
// myPlugin.js
export function myVitePlugin(options) {
  console.log(options)
  return {
    name: "vite-plugin-xxx",
    load(id) {
      // 在钩子逻辑中可以通过闭包访问外部的 options 传参
    },
  }
}

// 使用方式
// vite.config.ts
import { myVitePlugin } from "./myVitePlugin"
export default {
  plugins: [
    myVitePlugin({
      /* 给插件传参 */
    }),
  ],
}
```

## hook

## 通用 hook

Vite 开发阶段会模拟 Rollup 的行为，其中 Vite 会调用一系列与 Rollup 兼容的钩子，主要分为三个阶段：

1. 服务器启动阶段：options 和 buildStart 钩子会在服务启动时被调用
1. 请求响应阶段：当浏览器发起请求时，Vite 内部依次调用 resolveId 、load 和 transform 钩子
1. 服务器关闭阶段：Vite 会依次执行 buildEnd 和 closeBundle 钩子

除了以上钩子，其他 Rollup 插件钩子 ( 如 moduleParsed 、renderChunk ) 均不会在 Vite 开发阶段调用。

而在生产环境下，由于 Vite 2.x 直接使用 Rollup ，Vite 插件中所有 Rollup 的插件钩子都会生效。

## 独有 hook

这些 hook 只会在 Vite 内部调用，放到 Rollup 中会被直接忽略。

### config

给配置加料。

Vite 在读取完配置文件 ( 即 vite.config.ts ) 后，会拿到用户导出的配置对象，然后执行 config 钩子。

在这个钩子里，可以对配置文件导出的对象进行自定义操作。

推荐在 config 钩子中返回一个配置对象，这个配置对象会和 Vite 已有的配置进行深度的合并。但也可以通过钩子的入参拿到 config 对象进行自定义修改。

```ts
// 返回部分配置（推荐）
const editConfigPlugin = () => ({
  name: "vite-plugin-modify-config",
  config: () => ({
    alias: {
      react: require.resolve("react"),
    },
  }),
})

// 自定义修改
const mutateConfigPlugin = () => ({
  name: "mutate-config",
  // command 为 `serve`(开发环境) 或者 `build`(生产环境)
  config(config, { command }) {
    // 生产环境中修改 root 参数
    if (command === "build") {
      config.root = __dirname
    }
  },
})
```

### configResolved

记录最终配置。

Vite 在解析完配置后会调用 configResolved 钩子，这个钩子一般用来记录最终的配置信息，而不建议再修改配置。

```ts
const exmaplePlugin = () => {
  let config

  return {
    name: "read-config",

    configResolved(resolvedConfig) {
      // 记录最终配置
      config = resolvedConfig
    },

    // 在其他钩子中可以访问到配置
    transform(code, id) {
      console.log(config)
    },
  }
}
```

### configureServer

获取 Dev Server 实例。

这个钩子仅在开发阶段会被调用，用于扩展 Vite 的 Dev Server ，一般用于增加自定义 server 中间件。

```ts
const myPlugin = () => ({
  name: "configure-server",
  configureServer(server) {
    // 姿势 1: 在 Vite 内置中间件之前执行
    server.middlewares.use((req, res, next) => {
      // 自定义请求处理逻辑
    })
    // 姿势 2: 在 Vite 内置中间件之后执行
    return () => {
      server.middlewares.use((req, res, next) => {
        // 自定义请求处理逻辑
      })
    }
  },
})
```

### transformIndexHtml

转换 HTML 内容。

这个钩子用来灵活控制 HTML 的内容，可以拿到原始的 html 内容后进行任意的转换。

```ts
const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(
        /<title>(.*?)</title>/,
        `<title>换了个标题</title>`
      )
    }
  }
}
// 也可以返回如下的对象结构，一般用于添加某些标签
const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return {
        html,
        // 注入标签
        tags: [
          {
            // 放到 body 末尾，可取值还有`head`|`head-prepend`|`body-prepend`，顾名思义
            injectTo: 'body',
            // 标签属性定义
            attrs: { type: 'module', src: './index.ts' },
            // 标签名
            tag: 'script',
          },
        ],
      }
    }
  }
}
```

### handleHotUpdate

热更新处理。

这个钩子会在 Vite 服务端处理热更新时被调用，可以在这个钩子中拿到热更新相关的上下文信息，进行热更模块的过滤，或者进行自定义的热更处理。

```ts
const handleHmrPlugin = () => {
  return {
    async handleHotUpdate(ctx) {
      // 需要热更的文件
      console.log(ctx.file)
      // 需要热更的模块，如一个 Vue 单文件会涉及多个模块
      console.log(ctx.modules)
      // 时间戳
      console.log(ctx.timestamp)
      // Vite Dev Server 实例
      console.log(ctx.server)
      // 读取最新的文件内容
      console.log(await read())
      // 自行处理 HMR 事件
      ctx.server.ws.send({
        type: "custom",
        event: "special-update",
        data: { a: 1 },
      })
      return []
    },
  }
}

// 前端代码中加入
if (import.meta.hot) {
  import.meta.hot.on("special-update", (data) => {
    // 执行自定义更新
    // { a: 1 }
    console.log(data)
    window.location.reload()
  })
}
```

### 总结

- config ：进一步修改配置
- configResolved ：记录最终的配置信息
- configureServer ：获取 Vite Dev Server 实例，添加中间件
- transformIndexHtml ：转换 HTML 内容
- handleHotUpdate ：进行热更新模块的过滤，或者进行自定义的热更新处理

## hook 执行顺序

```ts
// test-hooks-plugin.ts
// 注: 请求响应阶段的钩子
// 如 resolveId, load, transform, transformIndexHtml在下文介绍
// 以下为服务启动和关闭的钩子
export default function testHookPlugin () {
  return {
    name: 'test-hooks-plugin',
    // Vite 独有钩子
    config(config) {
      console.log('config');
    },
    // Vite 独有钩子
    configResolved(resolvedCofnig) {
      console.log('configResolved');
    },
    // 通用钩子
    options(opts) {
      console.log('options');
      return opts;
    },
    // Vite 独有钩子
    configureServer(server) {
      console.log('configureServer');
      setTimeout(() => {
        // 手动退出进程
        process.kill(process.pid, 'SIGTERM');
      }, 3000)
    },
    // 通用钩子
    buildStart() {
      console.log('buildStart');
    },
    // 通用钩子
    buildEnd() {
      console.log('buildEnd');
    },
    // 通用钩子
    closeBundle() {
      console.log('closeBundle');
    }
}
```

- 服务启动阶段：config、configResolved、options、configureServer、buildStart
- 请求响应阶段：如果是 html 文件，仅执行 transformIndexHtml ；对非 html 文件，则依次执行 resolveId、load 和 transform
- 热更新阶段：执行 handleHotUpdate
- 服务关闭阶段：执行 buildEnd 和 closeBundle

## 应用位置

应用情景和应用顺序。

默认情况下 Vite 插件同时被用于开发环境和生产环境，可以通过 apply 属性决定应用场景

```ts
{
  // 'serve' 表示仅用于开发环境，'build'表示仅用于生产环境
  apply: "serve"
}

// 也可以配置成函数
{
  apply(config, { command }) {
  // 只用于非 SSR 情况下的生产环境构建
  return command === 'build' && !config.build.ssr
}
}
```

可以通过 enforce 属性指定插件的执行顺序

```ts
{
  // 默认为`normal`，可取值还有`pre`和`post`
  enforce: "pre"
}
```

## 执行顺序

- Alias ( 路径别名 ) 相关的插件
- 带有 `enforce: "pre"` 的用户插件
- Vite 核心插件
- 没有 `enforce` 的用户插件 ( 普通插件 )
- Vite 生产环境构建用的插件
- 带有 `enforce: "post"` 的用户插件
- Vite 后置构建插件 ( 如压缩插件 )
