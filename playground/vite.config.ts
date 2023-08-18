import { resolve } from "node:path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import VitePluginSirv from "vite-plugin-sirv"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginSirv({
      route: "starship",
      dir: resolve(__dirname, "../docs"),
      options: {
        extensions: ["md"],
      },
    }),
  ],
})
