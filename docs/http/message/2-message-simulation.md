# HTTP 报文模拟

## nc / telnet

nc ( netcat 的简称 )以及 telnet 能够连接 TCP/UDP 端口号与其通信，也可用于端口连通性测试。

两个命令有可能需要通过手动安装。

## HTTP 报文测试

通常，HTTP 默认监听的是 80 端口，可以通过 `nc` 与网站的 80 端口直接通过 HTTP 报文进行通信。

输入 `nc httpbin.org 80` 后回车，随后手动输入 HTTP 请求报文，`nc` 将打印出响应报文。

```bash
$ brew install nc
$ brew install telnet
```

```bash
# 以下三行都要输入，可用 shift + enter 换行输入
$ nc httpbin.org 80
GET /get HTTP/1.1
Host: httpbin.org

HTTP/1.1 200 OK
Date: Wed, 21 Sep 2022 07:16:25 GMT
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
  "url": "http://httpbin.org/get"
}
```

通过 `telnet` 同样可以达到效果，但一般建议用 `nc`

```bash
$ telnet httpbin.org 80
Trying 18.207.88.57...
Connected to httpbin.org.
Escape character is '^]'.
# 以下两行需要输入
GET /get HTTP/1.1
Host: httpbin.org

HTTP/1.1 200 OK
Date: Wed, 21 Sep 2022 07:22:36 GMT
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
  "url": "http://httpbin.org/get"
}
```
