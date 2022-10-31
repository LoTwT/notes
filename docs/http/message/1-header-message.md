# HTTP 报文

HTTP，`Hyper Text Transfer Protocol` 简写，超文本传输协议。在前端最重要的体现在于，浏览器 ( HTTP Client ) 与服务器 ( HTTP Server ) 之间的通信。

HTTP 是前后端沟通的桥梁，了解 HTTP 协议及报文相当重要。

## HTTP 报文

HTTP Message，也叫 HTTP 报文，用于在客户端与服务器间传送数据。HTTP 由请求 ( Request ) 及相应 ( Response ) 构成。

访问百度首页的报文格式如下，报文每行由 `\r\n` 换行，详见<https://xunlianying.feishu.cn/wiki/wikcneuhkG5arSjujYIjcwBHlke>。

从报文可以看出，HTTP 是基于文本的协议。

```bash
# 请求报文

# 首行由 Method Path Version 构成
# 每一行结尾是 \r\n
GET / HTTP/1.1
# 以下是请求头，Host 是请求的域名
Host: www.baidu.com
User-Agent: curl/7.79.1
Accept: */*

# 响应报文
# 相隔两个 \r\n，将会收到响应报文

# 首行由 Version StatusCode StatusText 组成
# 一般在 HTTP/2 中，没有 StatusText
HTTP/1.1 200 OK
# 以下是响应头
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: keep-alive
Content-Length: 2443
Content-Type: text/html
Date: Wed, 31 Aug 2022 09:23:42 GMT
Etag: "58860402-98b"
Last-Modified: Mon, 23 Jan 2017 13:24:18 GMT
Pragma: no-cache
Server: bfe/1.0.8.18
Set-Cookie: BDORZ=27315; max-age=86400; domain=.baidu.com; path=/

# 响应体
# 相隔两个 \r\n，将会收到响应体
<!DOCTYPE html>
...
```

通过 `curl -v https://www.baidu.com` 可以获得完整的相应报文以及响应体。

## HTTP Client / Server

HTTP 由请求以及响应组成，负责请求的被称为 `HTTP Client`，即 HTTP 客户端，而负责响应的被称为 `HTTP Server`，即 HTTP 服务器端。

在后端中，他们的 `nginx / django / express / koa` 等，便是扮演 HTTP 服务器端的角色，接收 HTTP 客户端的请求，分析路由、请求方法请求体，并返回对应的相应报文。

在前端中，浏览器便是扮演 HTTP 客户端的角色，从代码层面来说，使用的 `fetch` / `axios` 就是 HTTP 客户端，各种编程语言的请求库以及 `curl` 都可以视为 HTTP 客户端。

在前后端联调 API 时，团队经常使用的 API 管理工具，Apifox 与 Postman 也属于 HTTP 客户端。
