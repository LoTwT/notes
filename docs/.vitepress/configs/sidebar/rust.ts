import { type DefaultTheme } from "vitepress"

export const rust: DefaultTheme.SidebarMulti = {
  "/rust/": [
    {
      text: "前置",
      collapsible: true,
      items: [
        { text: "内存：值放堆上还是放栈上", link: "/rust/pre/1" },
        { text: "编程开发中，需要掌握的基本概念", link: "/rust/pre/2" },
        { text: "代码缺陷", link: "/rust/pre/3" },
      ],
    },
    {
      text: "基础",
      collapsible: true,
      items: [{ text: "初窥门径：第一个 Rust 程序！", link: "/rust/basic/1" }],
    },
  ],
}
