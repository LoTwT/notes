import { defineUserConfig, defaultTheme } from "vuepress"
import { navbar, sidebar } from "./configs"

export default defineUserConfig({
  base: "/notes/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Ayingott's notes...",
      description: "useless and naive...",
    },
  },

  theme: defaultTheme({
    logo: "/mea.jpg",

    repo: "LoTwT/notes",

    locales: {
      "/": {
        navbar: navbar.zh,
        sidebar: sidebar.zh,
      },
    },
  }),

  // theme: "@vuepress/theme-default",

  // themeConfig: {
  //   logo: "/mea.jpg",

  //   repo: "LoTwT/notes",

  //   locales: {
  //     "/": {
  //       navbar: navbar.zh,
  //       sidebar: sidebar.zh,
  //     },
  //   },
  // },
})
