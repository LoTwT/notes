import { type DefaultTheme } from "vitepress"

export const test: DefaultTheme.SidebarMulti = {
  "/test/": [
    {
      text: "测试",
      link: "/test/main",
    },
    {
      text: "单元测试",
      collapsed: true,
      items: [
        {
          text: "概述",
          link: "/test/automated/overview",
        },
        {
          text: "选型",
          link: "/test/automated/setup",
        },
        {
          text: "断言",
          link: "/test/automated/assertion",
        },
      ],
    },
  ],
}
