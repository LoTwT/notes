# Host 与 :authority

在一个服务器中，可能拥有多个 Host 的应用服务，即同一个 IP 地址，可能对应多个域名，此时仅仅通过 IP 无法访问到对应的服务，可通过 `Host` 进行定位。

如果某 IP 对应多个域名，则 `Host` 是必须携带的请求头，如果缺失了该请求头则会返回 400 状态码。

在 HTTP/2 以及 HTTP/3 中，以一个伪头 `:authority` 代替。

在浏览器中使用 `fetch`，或者使用 `curl/httpie` 发送请求时，将会自动携带该请求头。

## nc

可通过 `nc` 命令，直接以发送报文的形式来请求数据，进行测试 :

```bash
$ nc httpbin.org 80
GET /get HTTP/1.1
Host: httpbin.org

HTTP/1.1 200 OK
Date: Wed, 21 Sep 2022 05:49:27 GMT
Content-Type: application/json
Content-Length: 200
Connection: keep-alive
Server: gunicorn/19.9.0
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

{
  "args": {},
  "headers": {
    "Host": "httpbin.org"
  },
  "origin": "122.222.222.222",
  "url": "http://httpbin.org/get"
}
```

如果不携带 `Host` 请求头，则直接返回 400 状态码。

```bash
$ nc httpbin.org 80
GET /get HTTP/1.1

HTTP/1.1 400 Bad Request
Server: awselb/2.0
Date: Wed, 21 Sep 2022 05:51:39 GMT
Content-Type: text/html
Content-Length: 122
Connection: close

<html>
<head><title>400 Bad Request</title></head>
<body>
<center><h1>400 Bad Request</h1></center>
</body>
</html>
```

如果某 IP 仅对应一个域名，并且通过 IP 地址可直接访问应用，则可不加 `Host` 请求头，比如百度。但这种情况很少。

```bash
$ dig +short www.baidu.com
www.a.shifen.com.
14.215.177.38
14.215.177.39

# 直接访问 IP 地址成功
$ curl --head 14.215.177.39
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: keep-alive
Content-Length: 277
Content-Type: text/html
Date: Sun, 23 Oct 2022 03:01:08 GMT
Etag: "575e1f71-115"
Last-Modified: Mon, 13 Jun 2016 02:50:25 GMT
Pragma: no-cache
Server: bfe/1.0.8.18

# 此时 nc 时，可不发送 HOST 请求头
$ nc www.baidu.com 80
GET / HTTP/1.1

HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: no-cache
```

## curl

通过 `curl` 发送 HTTP 请求时，将会自动携带 `HOST` 请求头。

通过 `curl` 模拟 `HOST` 功能 :

1. 通过 `-H HOST:` 删除 HOST 请求头。在 `curl` 中，如果 `-H` 指定的参数以 `:` 结尾，代表不发送该请求头。
1. 通过请求 IP 地址，并通过 `-H` 参数明确指定 Host 头部

```bash
$ curl -i http.devtool.tech -H HOST:
HTTP/1.1 404 Not Found
Connection: keep-alive
Content-Length: 67
Content-Type: text/plain; charset=utf-8
Date: Sun, 23 Oct 2022 04:18:47 GMT
Server: Vercel
X-Vercel-Error: DEPLOYMENT_NOT_FOUND
X-Vercel-Id: hnd1::cgcvn-1666498727096-1e18fb504bcb

The deployment could not be found on Vercel.

DEPLOYMENT_NOT_FOUND
```

以下是通过 IP + HOST 的方式 :

```bash
# 请求成功
$ curl http.devtool.tech

# 获取到其 IP 地址
$ dig +short http.devtool.tech
76.223.126.88

# 直接请求 IP，导致找不到该应用
$ curl 76.223.126.88

# 请求成功
$ curl 76.223.126.88 -H "Host: http.devtool.tech"
```
