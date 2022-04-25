import { readdir } from "fs/promises"
import { resolve } from "path"

import { createCommonJS } from "mlly"

const { __dirname } = createCommonJS(import.meta.url)

const targetPath = resolve(__dirname, "../docs/zh/dataAndAlgorithm/algorithm")
const files = await readdir(targetPath)

const reg = /^\d{0,}-.*.md$/

const len = files.filter((f) => reg.test(f)).length

console.log(`已经刷了 ${len} 题。`)
