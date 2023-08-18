# CJS in ESM

在 CJS 和 ESM 转换的阵痛期中，在 ESM 中使用仅支持 CJS 的工具。

场景描述：

写一个使用 [ts-morph](https://github.com/dsherret/ts-morph) 的 Vite 插件。

解决方法：使用 `node:module` 提供的 `createRequire` ，创建 `require` 方法

```ts
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const { Project } = require("ts-morph")
```

以上代码引入的 `Project` 类型被推断为 `any` ，可以通过类型断言为整个导入提供类型支持。

```ts
const { Project } = require("ts-morph") as typeof import("ts-morph")
```
