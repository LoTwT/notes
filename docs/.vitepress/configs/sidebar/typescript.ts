import { type DefaultTheme } from "vitepress"

export const typescript: DefaultTheme.SidebarMulti = {
  "/typescript/": [
    {
      text: "Typescript",
      collapsible: true,
      items: [
        { text: "基础", link: "/typescript/fun/basic" },
        { text: "模式匹配", link: "/typescript/fun/patternMatching" },
        { text: "重新构造", link: "/typescript/fun/rebuild" },
        { text: "递归复用", link: "/typescript/fun/recursion" },
        { text: "数值运算", link: "/typescript/fun/calculate" },
        { text: "联合类型", link: "/typescript/fun/union" },
        { text: "特殊特性", link: "/typescript/fun/special" },
        { text: "内置类型", link: "/typescript/fun/builtin" },
        { text: "综合实战", link: "/typescript/fun/practice" },
        { text: "原理", link: "/typescript/fun/principle" },
      ],
    },
    {
      text: "类型体操",
      collapsible: true,
      items: [{ text: "twoSum", link: "/typescript/challenges/two-sum" }],
    },
    {
      text: "其他",
      collapsible: true,
      items: [
        { text: "分布式类型声明？", link: "/typescript/others/distributedDts" },
      ],
    },
  ],
}
