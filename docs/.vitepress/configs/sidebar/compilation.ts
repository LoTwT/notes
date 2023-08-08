import { type DefaultTheme } from "vitepress"

export const compilation: DefaultTheme.SidebarMulti = {
  "/compilation/": [
    {
      text: "编译",
      collapsed: true,
      items: [{ text: "介绍", link: "/compilation/intro" }],
    },
    {
      text: "编译原理之美",
      collapsed: true,
      items: [
        { text: "介绍", link: "/compilation/beauty/intro" },
        {
          text: "理解代码: 编译器的前端技术",
          link: "/compilation/beauty/code-understand",
        },
      ],
    },
    {
      text: "前端依赖治理：代码分析工具",
      collapsed: true,
      items: [
        {
          text: "AST 抽象语法树",
          link: "/compilation/code-analyze/ast",
        },
        {
          text: "从分析一段 TS 代码开始",
          link: "/compilation/code-analyze/start",
        },
      ],
    },
  ],
}
