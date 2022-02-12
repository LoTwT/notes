import type { SidebarConfig } from "@vuepress/theme-default"

export const zh: SidebarConfig = {
  "/zh/algorithm": [
    {
      text: "算法",
      children: ["/zh/algorithm/README.md", "/zh/algorithm/1-twoSum.md"],
    },
  ],

  "/zh/tools": [
    {
      text: "构建工具",
      link: "/zh/tools/README.md",
    },
    {
      text: "Vite",
      children: ["/zh/tools/vite/README.md"],
    },
    {
      text: "Rollup",
      children: ["/zh/tools/rollup/README.md"],
    },
  ],
}
