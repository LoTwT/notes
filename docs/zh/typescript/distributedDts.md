# 分布式类型声明？

这是一个有趣的特性

首先安装一下 `vitest` 吧

```bash
pnpm i vitest -D
```

```ts
// vitest.config.ts
// 注意引入的位置
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {},
  build: {},
})
```

## 操作

使用 `VS Code` 在 `vitest.config.ts` 中，`ctrl + 鼠标左键` 点击字段

- `test`：进入 `node_modules\.pnpm\vitest@0.9.3\node_modules\vitest\dist\config.d.ts`
- `build`：进入 `node_modules\.pnpm\vite@2.9.4\node_modules\vite\dist\node\index.d.ts`

## 分析

在同一个 `defineConfig` 函数中，不同的字段链接了不同的声明文件？哇塞，好神奇！

```ts
// https://github.com/vitest-dev/vitest/blob/main/packages/vitest/src/config.ts
import type { UserConfig as ViteUserConfig } from "vite"

export interface UserConfig extends ViteUserConfig {
  test?: ViteUserConfig["test"]
}

// will import vitest declare test in module 'vite'
export { configDefaults } from "./defaults"

export function defineConfig(config: UserConfig) {
  return config
}
```

这里清楚的发现，`vitest` 扩展了 `vite` 的 `UserConfig`。

众所周知，TypeScript 的 `interface` 是可以自动合并的。只是没想到，跨 npm 包的声明也能正确链接。

下面是同一个 repo 下 `interface` 合并的 demo

```ts
// a.d.ts
interface A {
  name: string
}

// b.d.ts
interface A {
  age: number
}

// index.ts
const a: A = {
  name: "123", // 链接 a.d.ts
  age: 24, // 链接 b.d.ts
}
```

## 补充

不管使用什么包管理器，都可以正确链接，但因为 `node_modules` 结构不同，所以链接的文件位置不同，但都能正确链接。

```bash
# pnpm，半严格 node_modules
pnpm i vitest -D

# pnpm 依赖项提升
# https://pnpm.io/zh/6.x/npmrc#shamefully-hoist
pnpm i vitest -D --shamefully-hoist

# npm
npm i vitest -D
```

使用 pnpm 时，链接到 `.pnpm` 中对应版本的依赖名 ( xxx@a.b.c) 的目录下。

使用 npm 时，链接到对应依赖名的目录下。
