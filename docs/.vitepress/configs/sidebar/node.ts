import { type DefaultTheme } from "vitepress"

export const node: DefaultTheme.SidebarMulti = {
  "/node/": [
    {
      text: "Node",
      collapsed: true,
      items: [{ text: "简介", link: "/node/intro" }],
    },
  ],
}
