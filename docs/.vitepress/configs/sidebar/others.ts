import { type DefaultTheme } from "vitepress"

export const others: DefaultTheme.SidebarMulti = {
  "/others/": [
    {
      text: "其他",
      collapsible: true,
      items: [
        { text: "命令行", link: "/others/cmd" },
        { text: "Nuxt3", link: "/others/nuxt3" },
      ],
    },
  ],
}
