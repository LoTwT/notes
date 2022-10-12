import { type DefaultTheme } from "vitepress"

export const compilation: DefaultTheme.SidebarMulti = {
  "/compilation/": [
    {
      text: "编译",
      collapsible: true,
      collapsed: true,
      items: [{ text: "介绍", link: "/compilation/intro" }],
    },
    {
      text: "编译原理之美",
      collapsible: true,
      collapsed: true,
      items: [{ text: "介绍", link: "/compilation/beauty/intro" }],
    },
  ],
}
