import { type DefaultTheme } from "vitepress"

export const http: DefaultTheme.SidebarMulti = {
  "/http/": [
    {
      text: "报文",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "HTTP 报文", link: "/http/message/1-message" },
        { text: "HTTP 报文模拟", link: "/http/message/2-message-simulation" },
        { text: "Chrome Devtools", link: "/http/message/3-chrome-devtools" },
        { text: "curl", link: "/http/message/4-curl" },
      ],
    },
    {
      text: "头部",
      collapsible: true,
      collapsed: true,
      items: [
        { text: "header", link: "/http/header/5-header" },
        { text: "请求头列表", link: "/http/header/6-request-header" },
        { text: "响应头列表", link: "/http/header/7-response-header" },
        { text: "Host 与 :authority", link: "/http/header/8-host-authority" },
        { text: "内容协商", link: "/http/header/9-content-nego" },
        { text: "Content-Type", link: "/http/header/10-content-type" },
      ],
    },
  ],
}
