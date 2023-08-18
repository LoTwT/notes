import { type DefaultTheme } from "vitepress"

export const others: DefaultTheme.SidebarMulti = {
  "/others/": [
    {
      text: "其他",
      items: [
        { text: "命令行", link: "/others/cmd" },
        { text: "Nuxt3", link: "/others/nuxt3" },
        { text: "Cors", link: "/others/cors" },
        { text: "Bff Log", link: "/others/bff-log" },
      ],
    },
  ],
}
