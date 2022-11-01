import { type DefaultTheme } from "vitepress"

export const http: DefaultTheme.SidebarMulti = {
  "/http/": [
    {
      text: "报文",
      collapsible: true,
      collapsed: true,
      items: [{ text: "HTTP 报文", link: "/http/message/1-message" }],
    },
  ],
}
