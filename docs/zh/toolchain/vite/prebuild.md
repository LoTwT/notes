# 依赖预构建

Vite 依赖预构建的底层实现中，大量使用了 Esbuild ，实现了比较复杂的 Esbuild 插件，同时也应用了诸多 Esbuild 使用技巧。

## 核心流程

关于预构建的所有实现代码都在 `optimizeDeps` 函数中，这个函数在 `packages/vite/src/node/optimizer/index.ts` 中。

### 缓存判断

首先是预构建缓存的判断。

Vite 在每次预构建之后，都将一些关键信息写入到了 `_metadata.json` 文件中，第二次启动项目时，会通过这个文件中的 hash 值来进行缓存的判断，如果命中缓存则不会进行后续的与构建流程，代码如下：

```ts
// _metadata.json 文件所在的路径
const dataPath = path.join(cacheDir, "_metadata.json")
// 根据当前的配置计算出哈希值
const mainHash = getDepHash(root, config)
const data: DepOptimizationMetadata = {
  hash: mainHash,
  browserHash: mainHash,
  optimized: {},
}
// 默认走到里面的逻辑
if (!force) {
  let prevData: DepOptimizationMetadata | undefined
  try {
    // 读取元数据
    prevData = JSON.parse(fs.readFileSync(dataPath, "utf-8"))
  } catch (e) {}
  // 当前计算出的哈希值与 _metadata.json 中记录的哈希值一致，表示命中缓存，不用预构建
  if (prevData && prevData.hash === data.hash) {
    log("Hash is consistent. Skipping. Use --force to override.")
    return prevData
  }
}
```

哈希计算的策略，决定哪些配置和文件有可能影响预构建的结果，根据这些信息来生成哈希值。这部分逻辑集中在 `getDepHash` 函数中，如下：

```ts
const lockfileFormats = ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"]
function getDepHash(root: string, config: ResolvedConfig): string {
  // 获取 lock 文件内容
  let content = lookupFile(root, lockfileFormats) || ""
  // 除了 lock 文件外，还需要考虑下面的一些配置信息
  content += JSON.stringify(
    {
      // 开发/生产环境
      mode: config.mode,
      // 项目根路径
      root: config.root,
      // 路径解析配置
      resolve: config.resolve,
      // 自定义资源类型
      assetsInclude: config.assetsInclude,
      // 插件
      plugins: config.plugins.map((p) => p.name),
      // 预构建配置
      optimizeDeps: {
        include: config.optimizeDeps?.include,
        exclude: config.optimizeDeps?.exclude,
      },
    },
    // 特殊处理函数和正则类型
    (_, value) => {
      if (typeof value === "function" || value instanceof RegExp) {
        return value.toString()
      }
      return value
    },
  )
  // 最后调用 crypto 库中的 createHash 方法生成哈希
  return createHash("sha256").update(content).digest("hex").substring(0, 8)
}
```

### 依赖扫描

如果没有命中缓存，则会正式地进入依赖预构建阶段。

但在此之前，Vite 仍然需要探测项目中存在哪些依赖，并收集依赖列表，这就是依赖扫描的过程。这个过程是必须的，因为 Esbuild 需要知道到底要打包哪些第三方依赖，关键代码如下：

```ts
;({ deps, missing } = await scanImports(config))
```

在 `scanImports` 方法内部主要会调用 Esbuild 提供的 build 方法：

```ts
const deps: Record<string, string> = {}
// 扫描用到的 Esbuild 插件
const plugin = esbuildScanPlugin(config, container, deps, missing, entries)
await Promise.all(
  // 应用项目入口
  entries.map((entry) =>
    build({
      absWorkingDir: process.cwd(),
      // 注意这个参数
      write: false,
      entryPoints: [entry],
      bundle: true,
      format: "esm",
      logLevel: "error",
      plugins: [...plugins, plugin],
      ...esbuildOptions,
    }),
  ),
)
```

其中传入的 `write` 设定为 `false` ，表示产物不用写入磁盘，这样大大节省了磁盘 I / O 的时间，这也是依赖扫描往往比依赖打包快很多的原因之一。

接下来输出预打包信息：

```ts
if (!asCommand) {
  if (!newDeps) {
    logger.info(
      chalk.greenBright(`Pre-bundling dependencies:\n  ${depsString}`),
    )
    logger.info(
      `(this will be run only when your dependencies or config have changed)`,
    )
  }
} else {
  logger.info(chalk.greenBright(`Optimizing dependencies:\n  ${depsString}`))
}
```

第一次启动时，会输出预构建相关的 log 信息，这些信息都是通过依赖扫描阶段收集的，此时还并未开始真正的依赖打包过程。

为什么对项目入口打包一次就收集到所有依赖信息的原因：`esbuildScanPlugin` 这个函数创建 `scan 插件`时，接收了 `deps` 对象最为入参，这个对象的作用是在 `scan 插件`里解析各种 import 语句，最终通过它来记录依赖信息。

### 依赖打包

收集完依赖后，正式进入依赖打包阶段。

这里调用 Ebuild 进行打包并写入产物到磁盘中，关键代码如下：

```ts
const result = await build({
  absWorkingDir: process.cwd(),
  // 所有依赖的 id 数组，在插件中会转换为真实的路径
  entryPoints: Object.keys(flatIdDeps),
  bundle: true,
  format: "esm",
  target: config.build.target || undefined,
  external: config.optimizeDeps?.exclude,
  logLevel: "error",
  splitting: true,
  sourcemap: true,
  outdir: cacheDir,
  ignoreAnnotations: true,
  metafile: true,
  define,
  plugins: [
    ...plugins,
    // 预构建专用的插件
    esbuildDepPlugin(flatIdDeps, flatIdToExports, config, ssr),
  ],
  ...esbuildOptions,
})
// 打包元信息，后续会根据这份信息生成 _metadata.json
const meta = result.metafile!
```

### 元信息写入磁盘

在打包完成后，Vite 会拿到 Esbuild 构建的元信息，就是上面代码中的 `meta` 对象，然后将元信息保存到 `_metadata.json` 文件中：

```ts
const data: DepOptimizationMetadata = {
  hash: mainHash,
  browserHash: mainHash,
  optimized: {},
}
// 省略中间的代码
for (const id in deps) {
  const entry = deps[id]
  data.optimized[id] = {
    file: normalizePath(path.resolve(cacheDir, flattenId(id) + ".js")),
    src: entry,
    // 判断是否需要转换成 ESM 格式，后面会介绍
    needsInterop: needsInterop(
      id,
      idToExports[id],
      meta.outputs,
      cacheDirOutputPath,
    ),
  }
}
// 元信息写磁盘
writeFile(dataPath, JSON.stringify(data, null, 2))
```

## 依赖扫描

### 获取入口

首先关注 `scanImports` 的实现。

进行依赖扫描之前，需要找到入口文件，但入口文件可能存在于多个配置当中，比如 `optimizeDeps.entries` 和 `build.rollupOptions.input` ，同时需要考虑数组和对象的情况，但可能用户没有配置，需要自动探测入口文件：

```ts
const explicitEntryPatterns = config.optimizeDeps.entries
const buildInput = config.build.rollupOptions?.input
if (explicitEntryPatterns) {
  // 先从 optimizeDeps.entries 寻找入口，支持 glob 语法
  entries = await globEntries(explicitEntryPatterns, config)
} else if (buildInput) {
  // 其次从 build.rollupOptions.input 配置中寻找，注意需要考虑数组和对象的情况
  const resolvePath = (p: string) => path.resolve(config.root, p)
  if (typeof buildInput === "string") {
    entries = [resolvePath(buildInput)]
  } else if (Array.isArray(buildInput)) {
    entries = buildInput.map(resolvePath)
  } else if (isObject(buildInput)) {
    entries = Object.values(buildInput).map(resolvePath)
  } else {
    throw new Error("invalid rollupOptions.input value.")
  }
} else {
  // 兜底逻辑，如果用户没有进行上述配置，则自动从根目录开始寻找
  entries = await globEntries("**/*.html", config)
}
```

`globEntries` 方法通过 `fast-glob` 库从项目根目录扫描文件。

接下来，需要考虑入口文件类型，一般情况下入口需要是 JS 或 TS 文件，但实际上，像 HTML 、Vue 单文件组件等也需要支持，因为在这些文件中仍然可以包含 script 标签的内容，从而搜集到依赖信息。

在源码中，同时对 `html` 、`vue`、`svelte`、`astro` ( 一种新兴的类 HTML 语法 ) 四种后缀的入口文件进行解析，具体的解析过程在依赖扫描阶段的 Esbuild 插件中得以实现。

```ts
const htmlTypesRE = /.(html|vue|svelte|astro)$/
function esbuildScanPlugin(/* 一些入参 */): Plugin {
  // 初始化一些变量
  // 返回一个 Esbuild 插件
  return {
    name: "vite:dep-scan",
    setup(build) {
      // 标记「类 HTML」文件的 namespace
      build.onResolve({ filter: htmlTypesRE }, async ({ path, importer }) => {
        return {
          path: await resolve(path, importer),
          namespace: "html",
        }
      })

      build.onLoad(
        { filter: htmlTypesRE, namespace: "html" },
        async ({ path }) => {
          // 解析「类 HTML」文件
        },
      )
    },
  }
}
```

以 HTML 文件的解析为例，在插件中会扫描出所有带有 `type="module"` 的 script 标签，对于含有 src 的 script 标签改写为一个 import 语句，对于含有具体内容的 script ，则抽离出其中的脚本内容，最后将所有的 script 内容拼接成一段 JS 代码。

```ts
const scriptModuleRE =
  /(<script\b[^>]*type\s*=\s*(?: module |'module')[^>]*>)(.*?)</script>/gims
export const scriptRE = /(<script\b(?:\s[^>]*>|>))(.*?)</script>/gims
export const commentRE = /<!--(.|[\r\n])*?-->/
const srcRE = /\bsrc\s*=\s*(?: ([^ ]+) |'([^']+)'|([^\s' >]+))/im
const typeRE = /\btype\s*=\s*(?: ([^ ]+) |'([^']+)'|([^\s' >]+))/im
const langRE = /\blang\s*=\s*(?: ([^ ]+) |'([^']+)'|([^\s' >]+))/im
// scan 插件 setup 方法内部实现
build.onLoad(
  { filter: htmlTypesRE, namespace: 'html' },
  async ({ path }) => {
    let raw = fs.readFileSync(path, 'utf-8')
    // 去掉注释内容，防止干扰解析过程
    raw = raw.replace(commentRE, '<!---->')
    const isHtml = path.endsWith('.html')
    // HTML 情况下会寻找 type 为 module 的 script
    // 正则：/(<script\b[^>]*type\s*=\s*(?: module |'module')[^>]*>)(.*?)</script>/gims
    const regex = isHtml ? scriptModuleRE : scriptRE
    regex.lastIndex = 0
    let js = ''
    let loader: Loader = 'js'
    let match: RegExpExecArray | null
    // 正式开始解析
    while ((match = regex.exec(raw))) {
      // 第一次: openTag 为 <script type= module  src= /src/main.ts >, 无 content
      // 第二次: openTag 为 <script type= module >，有 content
      const [, openTag, content] = match
      const typeMatch = openTag.match(typeRE)
      const type =
        typeMatch && (typeMatch[1] || typeMatch[2] || typeMatch[3])
      const langMatch = openTag.match(langRE)
      const lang =
        langMatch && (langMatch[1] || langMatch[2] || langMatch[3])
      if (lang === 'ts' || lang === 'tsx' || lang === 'jsx') {
        // 指定 esbuild 的 loader
        loader = lang
      }
      const srcMatch = openTag.match(srcRE)
      // 根据有无 src 属性来进行不同的处理
      if (srcMatch) {
        const src = srcMatch[1] || srcMatch[2] || srcMatch[3]
        js += `import ${JSON.stringify(src)}\n`
      } else if (content.trim()) {
        js += content + '\n'
      }
  }
  return {
    loader,
    contents: js
  }
)
```

这里对源码做了一定的精简，省略了 `.vue` 、`.svelte` 和 `import.meta.glob` 语法的处理，但不影响整体的实现思路，这里说明的是即使是 HTML 或者类似类型的文件，也能作为 Esbuild 预构建入口来进行解析。

### 记录依赖

Vite 中会把 `bare import` 的路径当作依赖路径，`bare import` 就是直接引入一个包名：

```ts
import React from "react"
```

而 `.` 开头的相对路径或者以 `/` 开头的绝对路径都不能算 `bare import` ：

```ts
// 以下都不是 bare import
import React from "../node_modules/react/index.js"
import React from "/User/sanyuan/vite-project/node_modules/react/index.js"
```

解析 `bare import` ，记录依赖的逻辑依然在 scan 插件中：

```ts
build.onResolve(
  {
    // avoid matching windows volume
    filter: /^[\w@][^:]/,
  },
  async ({ path: id, importer }) => {
    // 如果在 optimizeDeps.exclude 列表或者已经记录过了，则将其 externalize (排除)，直接 return

    // 接下来解析路径，内部调用各个插件的 resolveId 方法进行解析
    const resolved = await resolve(id, importer)
    if (resolved) {
      // 判断是否应该 externalize，下个部分详细拆解
      if (shouldExternalizeDep(resolved, id)) {
        return externalUnlessEntry({ path: id })
      }

      if (resolved.includes("node_modules") || include?.includes(id)) {
        // 如果 resolved 为 js 或 ts 文件
        if (OPTIMIZABLE_ENTRY_RE.test(resolved)) {
          // 注意了! 现在将其正式地记录在依赖表中
          depImports[id] = resolved
        }
        // 进行 externalize，因为这里只用扫描出依赖即可，不需要进行打包，具体实现后面的部分会讲到
        return externalUnlessEntry({ path: id })
      } else {
        // resolved 为 「类 html」 文件，则标记上 'html' 的 namespace
        const namespace = htmlTypesRE.test(resolved) ? "html" : undefined
        // linked package, keep crawling
        return {
          path: path.resolve(resolved),
          namespace,
        }
      }
    } else {
      // 没有解析到路径，记录到 missing 表中，后续会检测这张表，显示相关路径未找到的报错
      missing[id] = normalizePath(importer)
    }
  },
)
```

其中调用到了 `resolve` ，也就是路径解析的逻辑，这里面实际上会调用各个插件的 `resolvedId` 方法进行路径解析：

```ts
const resolve = async (id: string, importer?: string) => {
  // 通过 seen 对象进行路径缓存
  const key = id + (importer && path.dirname(importer))
  if (seen.has(key)) {
    return seen.get(key)
  }
  // 调用插件容器的 resolveId
  // 关于插件容器下一节会详细介绍，这里你直接理解为调用各个插件的 resolveId 方法解析路径即可
  const resolved = await container.resolveId(
    id,
    importer && normalizePath(importer),
  )
  const res = resolved?.id
  seen.set(key, res)
  return res
}
```

### external 规则

上面分析了在 Esbuild 插件中如何针对 `bare import` 记录依赖，在记录过程中需要决定哪些路径应该被排除、不应该被记录或者不应该被 Esbuild 解析。这就是 external 规则的概念。

external 的路径分为两类：资源型和模块型。

对于资源型的路径，一般是直接排除，在插件中的处理方式如下：

```ts
// data url，直接标记 external: true，不让 esbuild 继续处理
build.onResolve({ filter: dataUrlRE }, ({ path }) => ({
  path,
  external: true,
}))
// 加了 ?worker 或者 ?raw 这种 query 的资源路径，直接 external
build.onResolve({ filter: SPECIAL_QUERY_RE }, ({ path }) => ({
  path,
  external: true,
}))
// css & json
build.onResolve(
  {
    filter: /.(css|less|sass|scss|styl|stylus|pcss|postcss|json)$/,
  },
  // 非 entry 则直接标记 external
  externalUnlessEntry,
)
// Vite 内置的一些资源类型，比如 .png、.wasm 等等
build.onResolve(
  {
    filter: new RegExp(`\.(${KNOWN_ASSET_TYPES.join("|")})$`),
  },
  // 非 entry 则直接标记 external
  externalUnlessEntry,
)

const externalUnlessEntry = ({ path }: { path: string }) => ({
  path,
  // 非 entry 则标记 external
  external: !entries.includes(path),
})
```

对于模块型的路径，也就是当通过 `resolve` 函数解析出一个 JS 模块的路径，在 `shouldExternalizeDep` 中实现：

```ts
export function shouldExternalizeDep(
  resolvedId: string,
  rawId: string,
): boolean {
  // 解析之后不是一个绝对路径，不在 esbuild 中进行加载
  if (!path.isAbsolute(resolvedId)) {
    return true
  }
  // 1. import 路径本身就是一个绝对路径
  // 2. 虚拟模块(Rollup 插件中约定虚拟模块以`\0`开头)
  // 都不在 esbuild 中进行加载
  if (resolvedId === rawId || resolvedId.includes("\0")) {
    return true
  }
  // 不是 JS 或者 类 HTML 文件，不在 esbuild 中进行加载
  if (!JS_TYPES_RE.test(resolvedId) && !htmlTypesRE.test(resolvedId)) {
    return true
  }
  return false
}
```
