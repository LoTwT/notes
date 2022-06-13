# 配置解析

Vite 构建环境分为开发环境和生产环境，不同环境有不同的构建策略，但 Vite 都会首先解析用户配置。

## 流程梳理

Vite 中的配置解析由 resolveConfig 函数实现。

### 加载配置文件

第一步是解析配置文件的内容，然后与命令行配置合并。

值得注意的是，后面有一个记录 `configFileDependencies` 的操作。因为配置文件代码可能会有第三方库的依赖，所以当第三方库依赖的代码更改时，Vite 可以通过 HMR 处理逻辑中记录的 `configFileDependencies` 检测到修改，再重启 Dev Server ，来保证当前生效的配置永远是最新的。

### 解析用户插件

第二个重点环节是解析用户插件。

首先，通过 apply 参数过滤出需要生效的用户插件。因为有些插件只在开发阶段生效，或者只在生产环境生效，通过 `apply: "serve" 或 "build"` 或将 apply 配置为一个函数，来自定义插件生效的条件。

接着，Vite 会拿到过滤且排序完成的插件，依次调用插件 config 钩子，进行配置合并。

然后，解析项目的根目录即 root 参数，默认 `process.cwd()`

最后，处理 alias ，这里需要加上一些内置的 alias 规则，如 `@vite/env` ，`@vite/client` 这种直接重定向到 Vite 内部的模块。

### 加载环境变量

```ts
// load .env files
const envDir = config.envDir
  ? normalizePath(path.resolve(resolvedRoot, config.envDir))
  : resolvedRoot
const userEnv =
  inlineConfig.envFile !== false &&
  loadEnv(mode, envDir, resolveEnvPrefix(config))
```

loadEnv 就是扫描 process.env 与 .env 文件，解析出 env 对象，值得注意的是，这个对象的属性最终会被挂载到 `import.meta.env` 这个全局对象上。

解析 env 对象的思路如下：

- 遍历 process.env 的属性，拿到指定前缀开头的属性 ( 默认指定为 `VITE_` ) ，并挂载到 env 对象上。
- 遍历 `.env` 文件，解析文件，然后往 env 对象挂载那些以指定前缀开头的属性。遍历文件的先后顺序如下 ( mode 开发阶段为 development ，生产环境为 production ) ：

  - `.env.${mode}.local`
  - `.env.${mode}`
  - `.env.local`
  - `.env`

> 特殊情况，如果 中途遇到 `NODE_ENV` 属性，则挂到 `process.env.VITE_USER_NODE_ENV` ，Vite 会优先通过这个属性来决定是否走生产环境构建。

然后，是对资源公共路径即 `base URL` 的处理，逻辑集中在 `resolveBaseUrl` 函数中：

```ts
// 解析 base url
const BASE_URL = resolveBaseUrl(config.base, command === "build", logger)
// 解析生产环境构建配置
const resolvedBuildOptions = resolveBuildOptions(config.build)
```

`resolveBaseUrl` 中需要注意这些处理规则：

- 空字符或 `./` 在开发阶段特殊处理，全部重写为 `/`
- `.` 开头的路径，自动重写为 `/`
- 以 `http(s)://` 开头的路径，在开发环境下重写为对应的 pathname
- 确保路径开头和结尾都是 `/

然后，是对 `cacheDir` 的解析，这个路径相对于在 Vite 预编译时写入依赖产物的路径：

```ts
// resolve cache directory
const pkgPath = lookupFile(resolvedRoot, [`package.json`], true /* pathOnly */)
// 默认为 node_module/.vite
const cacheDir = config.cacheDir
  ? path.resolve(resolvedRoot, config.cacheDir)
  : pkgPath && path.join(path.dirname(pkgPath), `node_modules/.vite`)
```

接着，处理用户配置的 `assetsInclude` ，将其转换为一个过滤器函数：

```ts
const assetsFilter = config.assetsInclude
  ? createFilter(config.assetsInclude)
  : () => false
```

Vite 后面会将用户传入的 assetsInclude 和内置规则合并：

```ts
assetsInclude(file: string) {
  return DEFAULT_ASSETS_RE.test(file) || assetsFilter(file)
}
```

这个配置决定是否让 Vite 将对应的后缀名视为静态资源文件 ( asset ) 来处理。

### 路径解析器工厂

第四个核心环节：定义路径解析器工厂。

路径解析器是指调用插件容器进行路径解析的函数：

```ts
const createResolver: ResolvedConfig['createResolver'] = (options) => {
  let aliasContainer: PluginContainer | undefined
  let resolverContainer: PluginContainer | undefined
  // 返回的函数可以理解为一个解析器
  return async (id, importer, aliasOnly, ssr) => {
    let container: PluginContainer
    if (aliasOnly) {
      container =
        aliasContainer ||
        // 新建 aliasContainer
    } else {
      container =
        resolverContainer ||
        // 新建 resolveContainer
    }
    return (await container.resolveId(id, importer, undefined, ssr))?.id
  }
}
```

在这个解析器会用在依赖于构建时：

```ts
const resolve = config.createResolver()
// 调用以拿到 react 路径
rseolve("react", undefined, undefined, false)
```

这里有 `aliasContainer` 和 `resolverContainer` 两个工具对象，它们都含有 `resolveId` 这个专门解析路径的方法，可以被 Vite 调用来获取解析结果。

> 两个工具对象的本质是 `PluginContainer` 。

接着处理一个 public 目录，也就是 Vite 作为静态资源服务的目录：

```ts
const { publicDir } = config
const resolvedPublicDir =
  publicDir !== false && publicDir !== ""
    ? path.resolve(
        resolvedRoot,
        typeof publicDir === "string" ? publicDir : "public",
      )
    : ""
```

至此，配置基本上解析完成，最后通过 resolved 对象整理一下：

```ts
const resolved: ResolvedConfig = {
  ...config,
  configFile: configFile ? normalizePath(configFile) : undefined,
  configFileDependencies,
  inlineConfig,
  root: resolvedRoot,
  base: BASE_URL,
  // 其余配置不再一一列举
}
```

### 插件流水线

第五个环节：生成插件流水线：

```ts
;(resolved.plugins as Plugin[]) = await resolvePlugins(
  resolved,
  prePlugins,
  normalPlugins,
  postPlugins,
)

// call configResolved hooks
await Promise.all(userPlugins.map((p) => p.configResolved?.(resolved)))
```

先生成完整插件列表传给 `resolve.plugins` ，而后调用每个插件的 `configResolved` 钩子。
