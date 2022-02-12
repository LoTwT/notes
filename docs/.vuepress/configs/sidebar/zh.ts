import type { SidebarConfig } from "@vuepress/theme-default"

export const zh: SidebarConfig = {
  "/zh/algorithm": [
    {
      text: "算法",
      children: ["/zh/algorithm/README.md", "/zh/algorithm/1-twoSum.md"],
    },
  ],
}
