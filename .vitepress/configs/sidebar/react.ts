import { type DefaultTheme } from "vitepress"

export const react: DefaultTheme.SidebarMulti = {
  "/react/": [
    {
      text: "从 0 实现 React18",
      collapsed: true,
      items: [{ text: "搭架子", link: "/react/write/setup" }],
    },
  ],
}
