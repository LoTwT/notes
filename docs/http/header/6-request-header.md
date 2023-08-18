# 请求头列表

请求头一般有以下分类，以下仅为常见请求头。

## 控制相关

- `Host` : 一般一个 IP 地址对应 N 哥应用，通过 `Host` 即可定位到对应的应用
- `Cache-Control` : 发送请求时，如何控制客户端的缓存策略
- `Expect` : 与 100 状态码相关
- `Range` : 指定范围请求，与 206 状态码相关

  - Range: bytes=200-1000,2000-6576,19000- 可以一次请求多个部分
  - 如果范围有效，服务器返回 206 Partial Content
  - 如果范围无效，服务器返回 416 Range Not Satisfiable
  - 服务器也可以忽略 Range 并用 200 状态码返回整个资源

## 条件相关

条件请求相关头部，前两者与 304 状态码相关，`If-Range` 与 206 状态码相关。

- `If-Range`
- `If-Modified-Since`
- `If-Range`

## 内容协商

内容协商，告知服务器端需要什么样的资源，比如语言以及压缩编码，如果服务器无法返回对应的资源，则返回 406 状态码。

<div style="background: #fff;">
  <img src="/http/header/httpnego.png" alt="内容协商" />
</div>

- `Accept` : 客户端需要什么样的资源，比如 `json` 与 `html`
- `Accept-Encoding` : 需要什么样的压缩编码，比如 `gzip` 与 `br`，如果不配置可能不进行压缩
- `Accept-Language` : 需要什么样的语言，比如 `en-US` 和 `zh-CN`

## 认证相关

- `Authorization` : 每次发送请求时，使用该头部携带 token 信息，维护客户端的认证状态

## 来源相关

通过来源相关，可以更好地统计用户信息，也可以以此为依据用来防止爬虫

- `Referer` : 当前页面的上一个页面是哪里，或者说该页面是由哪个页面跳转来的
- `User-Agent` : 用户代理，或者说该页面是由哪个客户端 ( 比如浏览器版本号之类 ) 跳转来的
