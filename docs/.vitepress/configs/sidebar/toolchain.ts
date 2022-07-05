import { type DefaultTheme } from "vitepress"

export const toolchain: DefaultTheme.SidebarMulti = {
  "/toolchain/": [
    {
      items: [{ text: "目录", link: "/toolchain/index" }],
    },
    {
      text: "Vite",
      collapsible: true,
      items: [
        { text: "概览", link: "/toolchain/vite/overview" },
        { text: "模块规范", link: "/toolchain/vite/module" },
        { text: "样式方案", link: "/toolchain/vite/style" },
        { text: "esbuild", link: "/toolchain/vite/esbuild" },
        { text: "插件", link: "/toolchain/vite/plugin" },
        { text: "热更新", link: "/toolchain/vite/hmr" },
        { text: "语法降级与 polyfill", link: "/toolchain/vite/polyfill" },
        { text: "SSR", link: "/toolchain/vite/ssr" },
        { text: "模块联邦", link: "/toolchain/vite/federation" },
        { text: "再谈 ESM", link: "/toolchain/vite/esm" },
        { text: "性能优化", link: "/toolchain/vite/optimize" },
        { text: "配置解析", link: "/toolchain/vite/config" },
        { text: "依赖预构建", link: "/toolchain/vite/prebuild" },
        { text: "插件流水线", link: "/toolchain/vite/pluginPipeline" },
        { text: "毫秒级 HMR 实现揭秘", link: "/toolchain/vite/hmr2" },
      ],
    },
    {
      text: "工程化",
      collapsible: true,
      items: [
        { text: "前端工程化", link: "/toolchain/engineering/engineering" },
        { text: "规范", link: "/toolchain/engineering/standard" },
        { text: "服务", link: "/toolchain/engineering/services" },
        { text: "管理", link: "/toolchain/engineering/management" },
        { text: "构建", link: "/toolchain/engineering/build" },
        { text: "组织", link: "/toolchain/engineering/structure" },
        { text: "部署", link: "/toolchain/engineering/deploy" },
        { text: "文档站点", link: "/toolchain/engineering/docsite" },
        { text: "开发运维", link: "/toolchain/engineering/devops" },
      ],
    },
    {
      text: "Rollup",
      collapsible: true,
      items: [{ text: "构建 ts package", link: "/toolchain/rollup/tspackage" }],
    },
    {
      text: "Babel",
      collapsible: true,
      items: [
        { text: "Babel", link: "/toolchain/babel/babel" },
        { text: "AST", link: "/toolchain/babel/AST" },
        { text: "API", link: "/toolchain/babel/API" },
        { text: "Parser", link: "/toolchain/babel/parser" },
        { text: "Traverse", link: "/toolchain/babel/traverse" },
      ],
    },
  ],
}
