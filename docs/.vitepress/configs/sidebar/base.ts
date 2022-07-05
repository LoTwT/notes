import { type DefaultTheme } from "vitepress"

export const base: DefaultTheme.SidebarMulti = {
  "/base/": [
    {
      text: "计算机基础",
      collapsible: true,
      items: [
        { text: "位运算", link: "/base/bitwiseOperation" },
        { text: "链表", link: "/base/linkedList" },
      ],
    },
  ],
}
