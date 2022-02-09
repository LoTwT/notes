import { defineUserConfig } from "vuepress"
import type { DefaultThemeOptions } from "vuepress"

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: "zh",
  title: "Ayingott's notes...",
  description: "useless and naive...",

  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/mea.jpg",
  },
})
