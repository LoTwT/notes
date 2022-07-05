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

## 依赖打包

### 扁平化产物文件结构

一般情况下，Esbuild 输出嵌套的产物目录结构，比如 Vue ，其产物在 `dist/vue.runtime.esm-bundler.js` 中，在经过 Esbuild 正常打包后，预构建产物目录如下：

```bash
node_modules/.vite
├── _metadata.json
├── vue
│   └── dist
│       └── vue.runtime.esm-bundler.js
```

由于各个第三方包的产物目录结构不一致，深层次的嵌套目录对于 Vite 的路径解析增加了麻烦和不可控因素。为了解决嵌套目录带来的问题，Vite 做了两件事达到扁平化预构建产物输出：

1. 嵌套路径扁平化：`/` 被换成下划线，如 `react/jsx-dev-runtime` ，被重写为 `react_jsx-dev-runtime` 。
1. 用虚拟模块代替真实模块，作为预打包的入口。

在 `optimizeDeps` 函数中，在进行完依赖扫描的步骤后，会执行路径扁平化操作：

```ts
const flatIdDeps: Record<string, string> = {}
const idToExports: Record<string, ExportsData> = {}
const flatIdToExports: Record<string, ExportsData> = {}
// deps 即为扫描后的依赖表
// 形如: {
//    react :  /Users/sanyuan/vite-project/react/index.js  }
//    react/jsx-dev-runtime :  /Users/sanyuan/vite-project/react/jsx-dev-runtime.js
// }
for (const id in deps) {
  // 扁平化路径，`react/jsx-dev-runtime`，被重写为`react_jsx-dev-runtime`；
  const flatId = flattenId(id)
  // 填入 flatIdDeps 表，记录 flatId -> 真实路径的映射关系
  const filePath = (flatIdDeps[flatId] = deps[id])
  const entryContent = fs.readFileSync(filePath, "utf-8")
  // 后续代码省略
}
```

对于虚拟模块的处理，关注 `esbuildDepPlugin` 函数：

```ts
export function esbuildDepPlugin(/* 一些传参 */) {
  // 定义路径解析的方法

  // 返回 Esbuild 插件
  return {
    name: 'vite:dep-pre-bundle',
    set(build) {
      // bare import 的路径
      build.onResolve(
        { filter: /^[\w@][^:]/ },
        async ({ path: id, importer, kind }) => {
          // 判断是否为入口模块，如果是，则标记上`dep`的 namespace，成为一个虚拟模块
        }
    }

    build.onLoad({ filter: /.*/, namespace: 'dep' }, ({ path: id }) => {
      // 加载虚拟模块
    }
  }
}
```

如此一来，Esbuild 会将虚拟模块作为入口进行打包，最后的产物目录会变成下面的扁平结构：

```bash
node_modules/.vite
├── _metadata.json
├── vue.js
├── react.js
├── react_jsx-dev-runtime.js
```

### 代理模块加载

虚拟模块代替了真实模块作为打包入口，所以也可以理解为代理模块。

以 `import React from "react"` 为例，Vite 会把 `react` 标记为 `namespace` 为 `dep` 的虚拟模块，然后控制 Esbuild 的加载流程，对于真实模块的内容进行重新导出。

首先是，确定真实模块的路径：

```ts
// 真实模块所在的路径，拿 react 来说，即`node_modules/react/index.js`
const entryFile = qualified[id]
// 确定相对路径
let relativePath = normalizePath(path.relative(root, entryFile))
if (
  !relativePath.startsWith("./") &&
  !relativePath.startsWith("../") &&
  relativePath !== "."
) {
  relativePath = `./${relativePath}`
}
```

确定路径后，对模块的内容进行重新导出：

1. CJS
1. ESM

在 `optimizeDeps` 中，实际上在进行真正的依赖打包之前，Vite 会读取各个依赖的入口文件，通过 `es-module-lexer` 解析入口文件的内容。

`es-module-lexer` 是一个在解析 ES 导入导出语法的库，大致用法如下：

```ts
import { init, parse } from "es-module-lexer"
// 等待`es-module-lexer`初始化完成
await init
const sourceStr = `
  import moduleA from './a';
  export * from 'b';
  export const count = 1;
  export default count;
`
// 开始解析
const exportsData = parse(sourceStr)
// 结果为一个数组，分别保存 import 和 export 的信息
const [imports, exports] = exportsData
// 返回 `import module from './a'`
sourceStr.substring(imports[0].ss, imports[0].se)
// 返回 ['count', 'default']
console.log(exports)
```

`export * from ` 导出的语法会被记录在 import 信息中。

`optimizeDeps` 利用 `es-module-lexer` 解析入口文件的实现：

```ts
import { init, parse } from "es-module-lexer"
// 省略中间的代码
await init
for (const id in deps) {
  // 省略前面的路径扁平化逻辑
  // 读取入口内容
  const entryContent = fs.readFileSync(filePath, "utf-8")
  try {
    exportsData = parse(entryContent) as ExportsData
  } catch {
    // 省略对 jsx 的处理
  }
  for (const { ss, se } of exportsData[0]) {
    const exp = entryContent.slice(ss, se)
    // 标记存在 `export * from` 语法
    if (/export\s+*\s+from/.test(exp)) {
      exportsData.hasReExports = true
    }
  }
  // 将 import 和 export 信息记录下来
  idToExports[id] = exportsData
  flatIdToExports[flatId] = exportsData
}
```

由于最后会有两张表记录下 ES 模块导入和导出的相关信息，而 flatIdToExports 表会作为入参传给 Esbuild 插件:

```ts
// 第二个入参
esbuildDepPlugin(flatIdDeps, flatIdToExports, config, ssr)
```

如此，就能根据真实模块的路径获取到导入和导出的信息，通过这份信息来甄别 CommonJS 和 ES 两种模块规范。现在可以回到 Esbuild 打包插件中加载代理模块的代码:

```ts
let contents = ""
// 下面的 exportsData 即外部传入的模块导入导出相关的信息表
// 根据模块 id 拿到对应的导入导出信息
const data = exportsData[id]
const [imports, exports] = data
if (!imports.length && !exports.length) {
  // 处理 CommonJS 模块
} else {
  // 处理 ES  模块
}
```

如果是 CommonJS 模块，则导出语句写成这种形式:

```ts
let contents = ""
contents += `export default require( ${relativePath} );`
```

如果是 ES 模块，则分默认导出和非默认导出这两种情况来处理:

```ts
// 默认导出，即存在 export default 语法
if (exports.includes("default")) {
  contents += `import d from  ${relativePath} ;export default d;`
}
// 非默认导出
if (
  // 1. 存在 `export * from` 语法，前文分析过
  data.hasReExports ||
  // 2. 多个导出内容
  exports.length > 1 ||
  // 3. 只有一个导出内容，但这个导出不是 export default
  exports[0] !== "default"
) {
  // 凡是命中上述三种情况中的一种，则添加下面的重导出语句
  contents += `\nexport * from  ${relativePath} `
}
```

现在，组装好了代理模块的内容，接下来就可以放心地交给 Esbuild 加载了:

```ts
let ext = path.extname(entryFile).slice(1)
if (ext === "mjs") ext = "js"
return {
  loader: ext as Loader,
  // 虚拟模块内容
  contents,
  resolveDir: root,
}
```

#### 代理模块为什么要和真实模块分离？

现在已经清楚了 Vite 是如何组装代理模块，以此作为 Esbuild 打包入口的，整体的思路就是先分析一遍模块真实入口文件的 import 和 export 语法，然后在代理模块中进行重导出。这里不妨回过头来思考一下: 为什么要对真实文件先做语法分析，然后重导出内容呢？

对此，大家不妨注意一下代码中的这段注释:

```ts
// It is necessary to do the re-exporting to separate the virtual proxy
// module from the actual module since the actual module may get
// referenced via relative imports - if we don't separate the proxy and
// the actual module, esbuild will create duplicated copies of the same
// module!
```

翻译过来即:

> 这种重导出的做法是必要的，它可以分离虚拟模块和真实模块，因为真实模块可以通过相对地址来引入。如果不这么做，Esbuild 将会对打包输出两个一样的模块。

如果代理模块通过文件系统直接读取真实模块的内容，而不是进行重导出，因此由于此时代理模块跟真实模块并没有任何的引用关系，这就导致最后的 react.js 和 @emotion/react.js 两份产物并不会引用同一份 Chunk，Esbuild 最后打包出了内容完全相同的两个 Chunk！

这也就能解释为什么 Vite 中要在代理模块中对真实模块的内容进行重导出了，主要是为了避免 Esbuild 产生重复的打包内容。
