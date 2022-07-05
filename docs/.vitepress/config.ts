import { defineConfig } from "vitepress"
import { nav, sidebar } from "./configs"

export default defineConfig({
  base: process.env.CUS_NODE_ENV === "deploy" ? "/" : "/notes/",

  lang: "zh-CN",
  title: "Ayingotts's notes",
  description: "useless and naive notes",

  lastUpdated: true,

  themeConfig: {
    logo: "/mea.jpg",

    socialLinks: [{ icon: "github", link: "https://github.com/lotwt/notes" }],

    nav,
    sidebar,
  },
})
