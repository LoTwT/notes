# 构建 ts package

源于工作中写的一个 typescript package...

参考 [Pinia](https://github.com/vuejs/pinia) 的 `rollup.config.js` 和 `package.json`...

## package.json

并不完全的 package.json 配置...

```json
{
  "scripts": {
    "build": "npm run build:js && npm run build:dts",
    "build:js": "rimraf dist && rollup -c ./rollup.config.js", // 构建 js
    "build:dts": "api-extractor run --local --verbose" // 构建 ts 类型声明文件 d.ts
  }
}
```

- rimraf: 删除文件夹
- api-extractor: 实际包名 [@microsoft/api-extractor](https://www.npmjs.com/package/@microsoft/api-extractor)， 微软出品， 为构建更好的 typescript 包而生。

## rollup.config.js

```js
import path from "node:path"
import typescript from "rollup-plugin-typescript2"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"

// 读 package.json
const pkg = require(path.resolve(__dirname, "package.json"))

// 生成基础 d.ts 文件, 用于 @microsoft/api-extractor 构建
const tsPlugin = typescript({
  check: true,
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  cacheRoot: path.resolve(__dirname, "./node_modules/.rts2_cache"),
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
    },
    exclude: ["__tests__"],
  },
})

export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.module,
      format: "es",
    },
    {
      file: pkg.module.replace("mjs", "cjs"),
      format: "cjs",
    },
  ],
  plugins: [json(), tsPlugin, commonjs(), nodeResolve(), terser()],
  // 防止项目依赖构建到最终的文件中
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
}
```

- @rollup/plugin-node-resolve: 使用 [Node resolution algorithm](https://nodejs.org/api/modules.html#modules_all_together) 识别第三方模块的引入路径。(可以省略写 index.js )
- @rollup/plugin-commonjs: 转换 commonjs 成 esm，让 rollup 能够使用只支持 commonjs 的包
- rollup-plugin-terser: 代码压缩

## api-extractor

需要配置 api-extractor.json

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",

  "mainEntryPointFilePath": "rollup 构建的 d.ts 文件路径，作为 api-extractor 的入口 d.ts 文件",

  "apiReport": {
    "enabled": true,
    "reportFolder": "<projectFolder>/temp/"
  },

  "docModel": {
    "enabled": true
  },

  "dtsRollup": {
    "enabled": true,
    "untrimmedFilePath": "./dist/<unscopedPackageName>.d.ts"
  },

  "tsdocMetadata": {
    "enabled": false
  },

  "messages": {
    "compilerMessageReporting": {
      "default": {
        "logLevel": "warning"
      }
    },

    "extractorMessageReporting": {
      "default": {
        "logLevel": "warning",
        "addToApiReportFile": true
      },

      "ae-missing-release-tag": {
        "logLevel": "none"
      },

      "ae-incompatible-release-tags": {
        "logLevel": "none"
      }
    },

    "tsdocMessageReporting": {
      "default": {
        "logLevel": "warning"
      },
      "tsdoc-code-span-missing-delimiter": {
        "logLevel": "none"
      }
    }
  }
}
```
