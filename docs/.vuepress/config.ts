import { defineUserConfig } from "vuepress"
import type { DefaultThemeOptions } from "vuepress"
import { navbar, sidebar } from "./configs"

export default defineUserConfig<DefaultThemeOptions>({
  base: "/notes/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Ayingott's notes...",
      description: "useless and naive...",
    },
  },

  theme: "@vuepress/theme-default",

  themeConfig: {
    logo: "/mea.jpg",

    repo: "LoTwT/notes",

    locales: {
      "/": {
        navbar: navbar.zh,
        sidebar: sidebar.zh,
      },
    },
  },
})
