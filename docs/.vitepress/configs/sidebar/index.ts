import { type DefaultTheme } from "vitepress"
import { base } from "./base"
import { devops } from "./devops"
import { others } from "./others"
import { rust } from "./rust"
import { toolchain } from "./toolchain"
import { translate } from "./translate"
import { typescript } from "./typescript"
import { algorithm } from "./algorithm"

export const sidebar: DefaultTheme.Sidebar = {
  ...base,
  ...devops,
  ...others,
  ...rust,
  ...toolchain,
  ...translate,
  ...typescript,
  ...algorithm,
}
