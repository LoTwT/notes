import { readdir } from "node:fs/promises"
import { resolve } from "node:path"

const sum = async () => {
  const targetPath = resolve(__dirname, "../docs/algorithm")
  const files = await readdir(targetPath)

  const reg = /^\d{0,}-.*.md$/

  const len = files.filter((f) => reg.test(f)).length

  console.log(`已经刷了 ${len} 题。`)
}

sum()
