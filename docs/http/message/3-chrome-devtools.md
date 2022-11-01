# Chrome Devtools

在 Chrome 浏览器中，可通过控制台中网络面板来查看 HTTP 报文消息。

打开 Chrome 浏览器，快捷键 `<Control-Shift-I>` 或者 `<Command-Shift-I>` 可打开控制台网络面板。

详细内容可查看 [Inspect network activity](https://developer.chrome.com/docs/devtools/network/#search)

## Header Options

![header options](/http/message/header-options.png)

在网络面板中，右键，点击 `Header Options`，可在网络面板中显示更多选项列。

建议添加以下选项

- `Protocol` : HTTP 协议版本号
- `Content-Length` : 响应体大小
- `Content-Encoding` : 响应体编码

## Filter

![filter-1](/http/message/filter-1.png)

在筛选条的最左侧，有筛选文本输入框，可对资源进行筛选。

![filter-2](/http/message/filter-2.png)

![filter-3](/http/message/filter-3.png)

1. `/[cj]s/` : 直接输入正则表达式对资源进行筛选
1. `domain:<domain>` : 根据域名进行筛选
1. `method` : 根据请求方法进行筛选
1. `status-code` : 根据状态码进行筛选，另它会自动补充所有资源的状态码，可查看该网站资源有多少状态码
1. `larger-than:<size>` : 筛选大于指定体积的资源，如 `larger-than:100k`
1. `has-response-header:<header>` : 筛选是否包含某响应头，如 `has-response-header:cache-control`
1. `mime-type` : 根据指定 MIME 类型进行筛选

## 底部状态栏

![footer-status-1](/http/message/footer-status-1.png)

1. 打开网络面板控制台后，有 126 哥请求
1. 打开网络面板控制台后，有 1.9 MB 资源进行了传输，未压缩时体积 2.8 MB，压缩后为 1.9MB

![footer-status-2](/http/message/footer-status-2.png)

在控制台中，也可以通过以上配置显示每条资源压缩前和压缩后的体积。
