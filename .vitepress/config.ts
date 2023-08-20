// import process from "node:process"
import { defineConfig } from "vitepress"
import { nav, sidebar } from "./configs"

// const target = process.env.TARGET as "dev" | "prod"
// const isDev = target === "dev"

export default defineConfig({
  lang: "zh-CN",
  title: "Ayingotts's notes",
  description: "useless and naive notes",

  srcDir: "./docs",

  lastUpdated: true,

  head: [["link", { rel: "icon", href: "/mea.jpg" }]],

  themeConfig: {
    logo: "/mea.jpg",

    socialLinks: [{ icon: "github", link: "https://github.com/lotwt/notes" }],

    nav,
    sidebar,
  },

  cleanUrls: true,
})
