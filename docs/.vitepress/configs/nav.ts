import { type DefaultTheme } from "vitepress"

export const nav: DefaultTheme.NavItem[] = [
  { text: "计算机基础", link: "/base/bitwiseOperation", activeMatch: "/base/" },
  {
    text: "算法",
    link: "/algorithm/index",
    activeMatch: "/algorithm/",
  },
  { text: "DevOps", link: "/devops/aws-ubuntu", activeMatch: "/devops/" },
  { text: "Node", link: "/node/intro", activeMatch: "/node/" },
  {
    text: "TypeScript",
    link: "/typescript/fun/basic",
    activeMatch: "/typescript/",
  },
  { text: "工具链", link: "/toolchain/index", activeMatch: "/toolchains/" },
  // { text: "Rust", link: "/rust/index", activeMatch: "/rust/" },
  { text: "翻译", link: "/translate/index", activeMatch: "/translate/" },
  { text: "其他", link: "/others/cmd", activeMatch: "/others/" },
]
