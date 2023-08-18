# header

HTTP 中的 Header 有一些规则容易忽略 :

1. HTTP Header 名称不区分大小写。因此 `Content-Type` 与 `content-type` 并无差别
1. HTTP Header 名称与值由 `:` 分割，值首部空格将被忽略，更严格地说，是被 `/:\s+/` 分割。因此 `A: 3` 与 `A: 3` 并无差别
1. HTTP Header 中的非标准自定义首部由 `X-` 作为前缀，[虽已被废弃](https://datatracker.ietf.org/doc/html/rfc6648)，但仍有大量使用。比如 `X-Powered-By`，仍被大量服务器框架所使用

HTTP Header 虽然不区分大小写，但有时也希望获取到原始的 Header，因此在 Node.js 中提供了两个 API :

1. [message.headers](https://nodejs.org/api/http.html#messageheaders) : 对头部全部转化为小写形式返回
1. [message.rawHeaders](https://nodejs.org/api/http.html#messagerawheaders) : 对头部不做大小写转化进行返回

## pseudo-header ( 伪头 )

![pseudo-header](/http/header/pseudo-header.png)

在 HTTP/2 协议中，以 `:` 开头，被称为伪头，他们用于传递 HTTP 报文初识行数据。见 [RFC9113](https://www.rfc-editor.org/rfc/rfc9113.html#name-request-pseudo-header-field)，尽管伪头不属于 HTTP 头部字段，但仍在这里列出，因为浏览器控制台网络面板中也将他们置于一起。

有以下 4 + 1 个伪头，其中四个用于请求，一个用于响应。

- `:authority`，同 Host
- `:method`，同 METHOD
- `:path`，同 PATH
- `:scheme`，同 SCHEME，即 HTTPS/HTTP
- `:status`，同 Status Code

## 测试

[httpbin.org/headers](https://httpbin.org/headers) 可返回请求头，可与 `curl` 结合使用。

```bash
# 请求头无关大小写，在 httpbin 中会全部作大写处理
$ curl "http://httpbin.org/headers" -H "A: 3" -H "b: 4" -H "c:     5"
{
  "headers": {
    "A": "3",
    "Accept": "*/*",
    "B": "4",
    "C": "5",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1",
    "X-Amzn-Trace-Id": "Root=1-63214e3e-5b4c2b280bc00e7e39b568fc"
  }
}
```
