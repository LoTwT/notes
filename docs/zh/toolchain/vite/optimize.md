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
