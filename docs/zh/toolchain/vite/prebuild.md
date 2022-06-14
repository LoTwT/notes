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
