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

## 加载配置文件

加载配置文件通过 `loadConfigFromFile` 实现。

```ts
const loadResult = await loadConfigFromFile(/*省略传参*/)
```

配置文件类型根据文加后缀和模块格式可以分为：

- TS + ESM
- TS + CJS
- JS + ESM
- JS + CJS

Vite 加载配置文件共有两个步骤：

1. 识别出配置文件的类型
1. 根据不同的分类，分别解析出配置内容

### 识别配置文件类型

首先，Vite 会检查项目的 package.json ，如果有 `type: "module"` ，则打上 `isESM` 标识：

```ts
try {
  const pkg = lookupFile(configRoot, ["package.json"])
  if (pkg && JSON.parse(pkg).type === "module") {
    isMjs = true
  }
} catch (e) {}
```

然后，Vite 会寻找配置文件路径，简化代码如下：

```ts
let isTS = false
let isESM = false
let dependencies: string[] = []
// 如果命令行有指定配置文件路径
if (configFile) {
  resolvedPath = path.resolve(configFile)
  // 根据后缀判断是否为 ts 或者 esm，打上 flag
  isTS = configFile.endsWith(".ts")
  if (configFile.endsWith(".mjs")) {
    isESM = true
  }
} else {
  // 从项目根目录寻找配置文件路径，寻找顺序:
  // - vite.config.js
  // - vite.config.mjs
  // - vite.config.ts
  // - vite.config.cjs
  const jsconfigFile = path.resolve(configRoot, "vite.config.js")
  if (fs.existsSync(jsconfigFile)) {
    resolvedPath = jsconfigFile
  }

  if (!resolvedPath) {
    const mjsconfigFile = path.resolve(configRoot, "vite.config.mjs")
    if (fs.existsSync(mjsconfigFile)) {
      resolvedPath = mjsconfigFile
      isESM = true
    }
  }

  if (!resolvedPath) {
    const tsconfigFile = path.resolve(configRoot, "vite.config.ts")
    if (fs.existsSync(tsconfigFile)) {
      resolvedPath = tsconfigFile
      isTS = true
    }
  }

  if (!resolvedPath) {
    const cjsConfigFile = path.resolve(configRoot, "vite.config.cjs")
    if (fs.existsSync(cjsConfigFile)) {
      resolvedPath = cjsConfigFile
      isESM = false
    }
  }
}
```

在寻找路径的同时，Vite 也会给当前配置文件打上 `isESM` 和 `isTS` 的标识，方便后续解析。

### 根据类型解析配置

#### ESM

对 ESM 格式配置的处理代码如下：

```ts
let userConfig: UserConfigExport | undefined

if (isESM) {
  const fileUrl = require("url").pathToFileURL(resolvedPath)
  // 首先对代码进行打包
  const bundled = await bundleConfigFile(resolvedPath, true)
  dependencies = bundled.dependencies
  // TS + ESM
  if (isTS) {
    fs.writeFileSync(resolvedPath + ".js", bundled.code)
    userConfig = (await dynamicImport(`${fileUrl}.js?t=${Date.now()}`)).default
    fs.unlinkSync(resolvedPath + ".js")
    debug(`TS + native esm config loaded in ${getTime()}`, fileUrl)
  }
  //  JS + ESM
  else {
    userConfig = (await dynamicImport(`${fileUrl}?t=${Date.now()}`)).default
    debug(`native esm config loaded in ${getTime()}`, fileUrl)
  }
}
```

首先通过 Esbuild 将配置文件编译打包成 JS 代码：

```ts
const bundled = await bundleConfigFile(resolvedPath, true)
// 记录依赖
dependencies = bundled.dependencies
```

对于 TS 配置文件，Vite 会将编译后的 JS 代码写入临时文件，通过 Node.js 原生 ESM import 来读取这个临时内容，以获取到配置内容，再直接删掉临时文件：

```ts
fs.writeFileSync(resolvedPath + ".js", bundled.code)
userConfig = (await dynamicImport(`${fileUrl}.js?t=${Date.now()}`)).default
fs.unlinkSync(resolvedPath + ".js")
```

> 这种先编译配置文件，再将产物写入临时目录，最后加载临时目录产物的做法，是 AOT ( Ahead Of Time ) 编译技术的一种具体实现。。

而对于 JS 配置文件，Vite 会直接通过 Node.js 原生 ESM Import 读取，同样使用 `dynamicImport` 函数逻辑：

```ts
export const dynamicImport = new Function("file", "return import(file)")
```

使用 `new Function` 包裹的原因是，避免打包工具处理这段代码，比如 Rollup 和 TSC ，类似的手段还有 `eval` 。

#### CJS

对 CJS 格式的配置文件，Vite 集中进行了解析：

```ts
// 对于 js/ts 均生效
// 使用 esbuild 将配置文件编译成 commonjs 格式的 bundle 文件
const bundled = await bundleConfigFile(resolvedPath)
dependencies = bundled.dependencies
// 加载编译后的 bundle 代码
userConfig = await loadConfigFromBundledFile(resolvedPath, bundled.code)
```

`bundleConfigFile` 是通过 Esbuild 将配置文件打包，拿到打包后的 bundle 代码以及配置文件的依赖 ( dependencies ) 。

接下来，使用 `loadConfigFromBundledFile` 加载 bundle 代码：

```ts
async function loadConfigFromBundledFile(
  fileName: string,
  bundledCode: string,
): Promise<UserConfig> {
  const extension = path.extname(fileName)
  const defaultLoader = require.extensions[extension]!
  require.extensions[extension] = (module: NodeModule, filename: string) => {
    if (filename === fileName) {
      ;(module as NodeModuleWithCompile)._compile(bundledCode, filename)
    } else {
      defaultLoader(module, filename)
    }
  }
  // 清除 require 缓存
  delete require.cache[require.resolve(fileName)]
  const raw = require(fileName)
  const config = raw.__esModule ? raw.default : raw
  require.extensions[extension] = defaultLoader
  return config
}
```

思路是通过拦截原生 `require.extensions` 的加载函数来实现对 bundle 后配置代码的加载：

```ts
// 默认加载器
const defaultLoader = require.extensions[extension]!
// 拦截原生 require 对于`.js`或者`.ts`的加载
require.extensions[extension] = (module: NodeModule, filename: string) => {
  // 针对 vite 配置文件的加载特殊处理
  if (filename === fileName) {
    ;(module as NodeModuleWithCompile)._compile(bundledCode, filename)
  } else {
    defaultLoader(module, filename)
  }
}
```

而原生 require 对于 JS 文件的加载代码是这样的：

```ts
Module._extensions[".js"] = function (module, filename) {
  var content = fs.readFileSync(filename, "utf8")
  module._compile(stripBOM(content), filename)
}
```

等同于：

```ts
;(function (exports, require, module, __filename, __dirname) {
  // 执行 module._compile 方法中传入的代码
  // 返回 exports 对象
})
```

在调用完 `module._compile` 编译完配置代码后，进行一次手动的 require ，即可拿到配置对象：

```ts
const raw = require(fileName)
const config = raw.__esModule ? raw.default : raw
// 恢复原生的加载方法
require.extensions[extension] = defaultLoader
// 返回配置
return config
```

> 这种运行时加载 TS 配置的方式，叫做 JIT ( 即时编译 ) ，这种方式和 AOT 最大的区别在于不会将内存中计算出的 JS 代码写入磁盘再加载，而是通过拦截 Node.js 原生 require.extension 方法实现即时加载。

### 处理完成

配置文件内容读取完成，等处理完成后返回即可：

```ts
// 处理是函数的情况
const config = await(
  typeof userConfig === "function" ? userConfig(configEnv) : userConfig,
)

if (!isObject(config)) {
  throw new Error(`config must export or return an object.`)
}
// 接下来返回最终的配置信息
return {
  path: normalizePath(resolvedPath),
  config,
  // esbuild 打包过程中搜集的依赖
  dependencies,
}
```
