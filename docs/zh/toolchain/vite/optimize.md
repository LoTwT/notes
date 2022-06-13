# 性能优化

在不同的场景中，对于项目性能的关注点并不相同。

在开发阶段，更关注开发体验，注重项目构建性能。

在生产环境，更看重项目的线上运行时性能。

关于开发阶段的构建性能问题，Vite 内部已经做了相当多的优化，实现了项目秒级启动和毫秒级热更新。

下面介绍的性能优化主要指线上环境的项目加载性能优化，与页面的 FCP 、TTI 这些指标息息相关。

对于项目的加载性能优化，常见的手段可分为下面三类：

1. 网络优化。包括 HTTP2 、DNS 预解析、Preload 、Prefetch 等手段。
1. 资源优化。包括产物构建分析、资源压缩、产物拆包、按需加载等优化方式。
1. 预渲染优化。包括服务端渲染 ( SSR ) 和静态站点生成 ( SSG ) 。

以上的优化方式，都离不开构建工具的支持。

在这些性能优化的场景中，将高频地使用到 Vite ，对 Vite 本身的构建能力进行深度地应用或者定制。

## 网络优化

### HTTP2

传统的 HTTP1.1 存在队头阻塞的问题，同一个 TCP 管道中同一时刻只能处理一个 HTTP 请求，也就是说如果当前请求没有处理完，其它的请求都处于阻塞状态；另外，浏览器对于同一个域名下的并发请求数量都有限制，比如 Chrome 只允许 6 个请求并发且不支持用户配置，也就是说请求数量超过 6 个时，多出来的请求只能排队、等待发送。

因此，在 HTTP1.1 协议中，队头阻塞和请求排队问题很容易成为网络层的性能瓶颈。

而 HTTP2 的诞生就是为了解决这些问题，它主要实现了如下的能力：

- 多路复用。将数据分为多个二进制帧，多个请求和响应的数据帧在同一个 TCP 通道进行传输，解决了之前的队头阻塞问题。与此同时，在 HTTP2 协议下，浏览器不再有同域名的并发请求数量限制，因此请求排队问题得到了解决。
- Server Push 。服务端推送。可以让某些资源能够提前到达浏览器，比如对于一个 HTML 的请求，通过 HTTP2 可以同时将相应的 JS 和 CSS 资源推送到浏览器，省去后续请求的开销。

在 Vite 中，可以通过 [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert) 在本地 Dev Server 上开启 HTTP2 。

由于 HTTP2 依赖 TLS 握手，插件会自动生成 TLS 证书，然后支持通过 HTTPS 的方式启动，而 Vite 会自动把 HTTPS 服务升级为 HTTP2 。

> 其中有一个特例，当使用 Vite 的 proxy 配置时，Vite 会将 HTTP2 降级为 HTTPS ，这个问题可以通过 [vite-plugin-proxy-middleware](https://github.com/williamyorkl/vite-plugin-proxy-middleware) 解决。

对于线上项目来说，HTTP2 对性能的提升非常可观，几乎成为了一个必选项。而 `vite-plugin-mkcert` 仅用于开发阶段，在生产环境中需要对线上服务器进行配置，开启 HTTP2 的能力，如 [Nginx 的 HTTP2 配置](http://nginx.org/en/docs/http/ngx_http_v2_module.html) 。

### DNS 预解析

浏览器在向跨域的服务器发送请求时，首先会进行 DNS 解析，将服务器域名解析为对应的 IP 地址。可以通过 `dns-prefetch` 技术，将这一过程提前，降低 DNS 解析的延迟时间，具体方式如下：

```html
<!-- href 为需要预解析的域名 -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
```

一般情况下，`dns-prefetch` 和 `preconnect` 搭配使用，前者用来解析 DNS ，而后者用来建立与服务器的连接，建立 TCP 通道及进行 TLS 握手，进一步降低请求延迟，使用方式如下：

```html
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
<link rel="dns-prefetch" href="https://fonts.gstatic.com/" />
```

> 值得注意的是，对于 preconnect 的 link 标签，一般需要加上 crossorigin ( 跨域标识 ) ，否则对于一些字体资源 preconnect 会失效。

### Preload / Prefetch

对于一些比较重要的资源，可以通过 Preload 方式进行预加载，即在资源使用之前就进行加载，而不是在用到的时候才加载，这样可以使资源更早地到达浏览器，使用方式如下：

```html
<link rel="preload" href="style.css" as="style" />
<link rel="preload" href="main.js" as="script" />
```

一般会声明 href 和 as 属性，分别表示资源地址和资源类型。

Preload 的浏览器兼容性也比较好。

与普通 script 标签不同的是，对于原生 ESM 模块，浏览器提供了 modulepreload 进行预加载：

```html
<link rel="modulepreload" href="/src/app.js" />
```

可在 Vite 中通过配置开启 modulepreload 的 Polyfill，从而使所有支持原生 ESM 的浏览器都能使用该特性，配置方式如下：

```ts
// vite.config.ts
export default {
  build: {
    polyfillModulePreload: true,
  },
}
```

除了 Preload ，Prefetch 也是一个比较常用的优化方式，它相当于告诉浏览器空闲的时候去预加载其它页面的资源，比如对于 A 页面中插入了这样的 link 标签：

```html
<link rel="prefetch" href="https://B.com/index.js" as="script" />
```

这样浏览器会在 A 页面加载完毕之后去加载 B 域名线下的资源，如果用户跳转到了 B 页面，浏览器会直接使用预加载好的资源，从而提升 B 页面的加载速度。

Prefetch 的浏览器兼容性不太乐观。

## 资源优化

### 产物分析报告

可视化地感知到产物的体积，可以使用 `rollup-plugin-visualizer` 进行产物分析。

```ts
// 注: 首先需要安装 rollup-plugin-visualizer 依赖
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      // 打包完成后自动打开浏览器，显示产物体积报告
      open: true,
    }),
  ],
})
```

```bash
pnpm build
```

### 资源压缩

在生产环境中，为了极致的代码体积，可以通过构建工具对产物进行压缩。

有以下积累资源可以被压缩处理：

1. JavaScript 代码
1. CSS 代码
1. 图片文件

#### JavaScript 压缩

在 Vite 生产环境构建的过程中，JavaScript 产物代码会自动进行压缩，相关的配置参数如下：

```ts
// vite.config.ts
export default {
  build: {
    // 类型: boolean | 'esbuild' | 'terser'
    // 默认为 `esbuild`
    minify: "esbuild",
    // 产物目标环境
    target: "modules",
    // 如果 minify 为 terser，可以通过下面的参数配置具体行为
    // https://terser.org/docs/api-reference#minify-options
    terserOptions: {},
  },
}
```

值得注意的是 target 参数，也就是压缩产物的目标环境。Vite 默认的参数是 modules，即如下的 browserlist ：

```ts
;["es2019", "edge88", "firefox78", "chrome87", "safari13.1"]
```

对于 JS 代码压缩的理解仅仅停留在去除空行、混淆变量名的层面是不够的，为了达到极致的压缩效果，压缩器一般会根据浏览器的目标，会对代码进行语法层面的转换。

这就是压缩工具在背后所做的事情，将某些语句识别之后转换成更高级的语法，从而达到更优的代码体积。

因此，设置合适的 target 就显得特别重要了，一旦目标环境的设置不能覆盖所有的用户群体，那么极有可能在某些低端浏览器中出现语法不兼容问题，从而发生线上事故。

因此，为了线上的稳定性，推荐大家最好还是将 target 参数设置为 ECMA 语法的最低版本 es2015 / es6 。

#### CSS 压缩

```ts
// vite.config.ts
export default {
  build: {
    // 设置 CSS 的目标环境
    cssTarget: "",
  },
}
```

默认情况下 Vite 会使用 Esbuild 对 CSS 代码进行压缩，一般不需要我们对 cssTarget 进行配置。

不过在需要兼容安卓端微信的 webview 时，我们需要将 build.cssTarget 设置为 chrome61，以防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式，出现样式问题。

#### 图片压缩

图片资源是一般是产物体积的大头，如果能有效地压缩图片体积，那么对项目体积来说会得到不小的优化。而在 Vite 中我们一般使用 vite-plugin-imagemin 来进行图片压缩。

#### 产物拆包

一般来说，如果不对产物进行代码分割 ( 或者拆包 )，全部打包到一个 chunk 中，会产生如下的问题:

- 首屏加载的代码体积过大，即使是当前页面不需要的代码也会进行加载。
- 线上缓存复用率极低，改动一行代码即可导致整个 bundle 产物缓存失效。

而 Vite 中内置如下的代码拆包能力:

- CSS 代码分割，即实现一个 chunk 对应一个 css 文件。
- 默认有一套拆包策略，将应用的代码和第三方库的代码分别打包成两份产物，并对于动态 import 的模块单独打包成一个 chunk。

当然，我们也可以通过 manualChunks 参数进行自定义配置：

```ts
// vite.config.ts
{
  build {
    rollupOptions: {
      output: {
        // 1. 对象配置
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          'react-vendor': ['react', 'react-dom'],
          // 将 Lodash 库的代码单独打包
          'lodash': ['lodash-es'],
          // 将组件库的代码打包
          'library': ['antd'],
        },
        // 2. 函数配置
          if (id.includes('antd') || id.includes('@arco-design/web-react')) {
            return 'library';
          }
          if (id.includes('lodash')) {
            return 'lodash';
          }
          if (id.includes('react')) {
            return 'react';
          }
      },
    }
  },
}
```

#### 按需加载

在一个完整的 Web 应用中，对于某些模块当前页面可能并不需要，如果浏览器在加载当前页面的同时也需要加载这些不必要的模块，那么可能会带来严重的性能问题。一个比较好的方式是对路由组件进行动态引入，比如在 React 应用中使用 @loadable/component 进行组件异步加载：

```ts
import React from "react"
import ReactDOM from "react-dom"
import loadable from "@loadable/component"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const Foo = loadable(() => import("./routes/Foo"))
const Bar = loadable(() => import("./routes/Bar"))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/foo" element={<Foo />} />
        <Route path="/bar" element={<Bar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)
```

这样在生产环境中，Vite 也会将动态引入的组件单独打包成一个 chunk。

当然，对于组件内部的逻辑，也可以通过动态 import 的方式来延迟执行，进一步优化首屏的加载性能，如下代码所示：

```ts
function App() {
  const computeFunc = async () => {
    // 延迟加载第三方库
    // 需要注意 Tree Shaking 问题
    // 如果直接引入包名，无法做到 Tree-Shaking，因此尽量导入具体的子路径
    const { default: merge } = await import("lodash-es/merge")
    const c = merge({ a: 1 }, { b: 2 })
    console.log(c)
  }
  return (
    <div className="App">
      <p>
        <button type="button" onClick={computeFunc}>
          Click me
        </button>
      </p>
    </div>
  )
}

export default App
```

## 预渲染优化

SSR、SSG
