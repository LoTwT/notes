# Cors

浏览器出于安全考虑，会限制不同域的资源请求，但是在实际场景中，很多情况下都需要跨域。

[跨资源共享 CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

## 相关配置

在请求跨域时，会有一次客户端和服务端的协商处理，第一次跨域请求返回的状态码是 204 。

在协商过程中，可以对一些头 ( header ) 属性进行校验。

- Origin：首部字段表明预检请求或实际请求的源站。
- Access-Control-Request-Method：首部字段用于预检请求，其作用是将实际请求所使用的 HTTP 方法告诉服务器。
- Access-Control-Request-Headers：首部字段用于预检请求，其作用是将实际请求所携带的首部字段告诉服务器。

还有一些响应 header 的设置如下：

- Access-Control-Allow-Origin：对于不需要携带身份凭证的请求，服务器可以指定哪些域可以请求。例如，`Access-Control-Allow-Origin:https://koajs.com/` 表示只允许来自 `https://koajs.com/` 的请求。如果服务端指定了具体的域名，而非 `*` ，那么响应首部中的 Vary 字段的值必须包含 Origin ，这将告诉客户端，服务器对不同的源站返回不同的内容。
- Access-Control-Expose-Headers：在跨源访问时，XMLHttpRequest 对象的 `getResponseHeader()` 方法只能得到一些最基本的响应头，如 `Cache-Control` 、`Content-Language` 、`Content-Type` 、`Expires` 、`Last-Modified` 、`Pragma` 。如果要访问其他头，则需要服务器设置本响应头，如 `Access-Control-Expose-Headers:X-My-Custom-Header,X-Another-Custom-Header` ，这样浏览器就能够通过 `getResponseHeader()` 访问 `X-My-Custom-Header` 和 `X-Another-Custom-Header` 响应头了。
- Access-Control-Max-Age：指定了 preflight 请求的结果能够被缓存多久。
- Access-Control-Allow-Credentials：指定了当浏览器的 credentials 设置为 true 时，是否允许浏览器读取 response 的内容。这个参数表示在预请求 ( preflight ) 中，是否可以使用 credentials 字段。请注意，简单 GET 请求不会被预检，如果对此类请求的响应中不包含该字段，这个响应将被忽略，并且浏览器也不会将相应内容返回给网页。
- Access-Control-Allow-Methods：首部字段用于预检请求的响应，指明了实际请求所允许使用的 HTTP 方法。
- Access-Control-Allow-Headers：首部字段用于预检请求的响应，指明了实际请求中允许携带的首部字段。
