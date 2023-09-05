import { resolve } from "node:path"
import fse from "fs-extra"
import { getDirname } from "@ayingott/sucrose"

const __dirname = getDirname(import.meta.url)

const copy = () => {
  if (!fse.pathExistsSync(resolve(__dirname, "../.vitepress/dist"))) {
    throw new Error("dist not exists before copy")
  }

  fse.copySync(
    resolve(__dirname, "../docs"),
    resolve(__dirname, "../.vitepress/dist/raw-docs"),
    {
      overwrite: true,
      filter: (src) => !src.includes("/public"),
    },
  )
}

copy()
