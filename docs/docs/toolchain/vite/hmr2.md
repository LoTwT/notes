# 毫秒级 HMR 实现揭秘

HMR Boundary ( HMR 边界 ) 的更新模式是，当一个模块发生改动时，Vite 会自动寻找更新边界，然后更新边界模块。

## 创建模块依赖图

为了方便管理各个模块之间的依赖关系，Vite 在 Dev Server 中创建了模块依赖图的数据结构，即 `ModuleGraph` 类，Vite 中 HMR 边界模块的判定会依靠这个类来实现。

创建依赖图有三步：

1. 初始化依赖图实例
1. 创建依赖图节点
1. 绑定各个模块节点的依赖关系

首先，Vite 在 Dev Server 启动时初始化 ModuleGraph 实例。

`ModuleNode` 对象代表模块节点的具体信息：

```ts
class ModuleNode {
  // 原始请求 url
  url: string
  // 文件绝对路径 + query
  id: string | null = null
  // 文件绝对路径
  file: string | null = null
  type: "js" | "css"
  info?: ModuleInfo
  // resolveId 钩子返回结果中的元数据
  meta?: Record<string, any>
  // 该模块的引用方
  importers = new Set<ModuleNode>()
  // 该模块所依赖的模块
  importedModules = new Set<ModuleNode>()
  // 接受更新的模块
  acceptedHmrDeps = new Set<ModuleNode>()
  // 是否为`接受自身模块`的更新
  isSelfAccepting = false
  // 经过 transform 钩子后的编译结果
  transformResult: TransformResult | null = null
  // SSR 过程中经过 transform 钩子后的编译结果
  ssrTransformResult: TransformResult | null = null
  // SSR 过程中的模块信息
  ssrModule: Record<string, any> | null = null
  // 上一次热更新的时间戳
  lastHMRTimestamp = 0

  constructor(url: string) {
    this.url = url
    this.type = isDirectCSSRequest(url) ? "css" : "js"
  }
}
```

需要重点关注 `ModuleNode` 中的 `importers` 和 `importedModules` ，这两条信息分别代表了当前模块被哪些模块引用以及它依赖了哪些模块，是构建整个模块依赖图的根基所在。

### ModuleNode 创建

Vite 会在 Vite Dev Server 的 transform 中间件的 `transformRequest` 中使用 `ensureEntryFromUrl` 方法创建新的 `ModuleNode` 节点：

```ts
async ensureEntryFromUrl(rawUrl: string): Promise<ModuleNode> {
  // 实质是调用各个插件的 resolveId 钩子得到路径信息
  const [url, resolvedId, meta] = await this.resolveUrl(rawUrl)
  let mod = this.urlToModuleMap.get(url)
  if (!mod) {
    // 如果没有缓存，就创建新的 ModuleNode 对象
    // 并记录到 urlToModuleMap、idToModuleMap、fileToModulesMap 这三张表中
    mod = new ModuleNode(url)
    if (meta) mod.meta = meta
    this.urlToModuleMap.set(url, mod)
    mod.id = resolvedId
    this.idToModuleMap.set(resolvedId, mod)
    const file = (mod.file = cleanUrl(resolvedId))
    let fileMappedModules = this.fileToModulesMap.get(file)
    if (!fileMappedModules) {
      fileMappedModules = new Set()
      this.fileToModulesMap.set(file, fileMappedModules)
    }
    fileMappedModules.add(mod)
  }
  return mod
}
```

### ModuleNode 绑定依赖关系

在 `vite:import-analysis` 插件中，transform 钩子会对模块代码中的 import 语句进行分析，得到以下信息：

1. `importedUrls` ：当前模块的依赖模块 url 集合
1. `acceptedUrls` ：当前模块中通过 `import.meta.hot.accept` 声明的依赖模块 url 集合
1. `isSelfAccepting` ：分析 `import.meta.hot.accept` 的用法，标记是否为`接受自身更新`的类型

接下来，进入核心的`模块依赖关系绑定`环节：

```ts
// 引用方模块
const importerModule = moduleGraph.getModuleById(importer)
await moduleGraph.updateModuleInfo(
  importerModule,
  importedUrls,
  normalizedAcceptedUrls,
  isSelfAccepting,
)
```

绑定依赖关系的逻辑主要由 `ModuleGraph` 对象的 `updateModuleInfo` 方法实现：

```ts
async updateModuleInfo(
  mod: ModuleNode,
  importedModules: Set<string | ModuleNode>,
  acceptedModules: Set<string | ModuleNode>,
  isSelfAccepting: boolean
) {
  mod.isSelfAccepting = isSelfAccepting
  mod.importedModules = new Set()
  // 绑定节点依赖关系
  for (const imported of importedModules) {
    const dep =
      typeof imported === 'string'
        ? await this.ensureEntryFromUrl(imported)
        : imported
    dep.importers.add(mod)
    mod.importedModules.add(dep)
  }

  // 更新 acceptHmrDeps 信息
  const deps = (mod.acceptedHmrDeps = new Set())
  for (const accepted of acceptedModules) {
    const dep =
      typeof accepted === 'string'
        ? await this.ensureEntryFromUrl(accepted)
        : accepted
    deps.add(dep)
  }
}
```

至此，模块间的依赖关系就成功进行绑定了。随着越来越多模块经过 `vite:import-analysis` 的 transform 钩子处理，所有模块之间的依赖关系会被记录下来，整个依赖图的信息也就被补充完整了。

## 服务端收集更新模块

首先，Vite 在服务启动时会通过 `chokidar` 新建文件监听器：

```ts
// packages/vite/src/node/server/index.ts
import chokidar from "chokidar" // packages/vite/src/node/server/index.ts
import chokidar from "chokidar"

// 监听根目录下的文件
const watcher = chokidar.watch(path.resolve(root))
// 修改文件
watcher.on("change", async (file) => {
  file = normalizePath(file)
  moduleGraph.onFileChange(file)
  await handleHMRUpdate(file, server)
})
// 新增文件
watcher.on("add", (file) => {
  handleFileAddUnlink(normalizePath(file), server)
})
// 删除文件
watcher.on("unlink", (file) => {
  handleFileAddUnlink(normalizePath(file), server, true)
})

// 监听根目录下的文件
const watcher = chokidar.watch(path.resolve(root))
// 修改文件
watcher.on("change", async (file) => {
  file = normalizePath(file)
  moduleGraph.onFileChange(file)
  await handleHMRUpdate(file, server)
})
// 新增文件
watcher.on("add", (file) => {
  handleFileAddUnlink(normalizePath(file), server)
})
// 删除文件
watcher.on("unlink", (file) => {
  handleFileAddUnlink(normalizePath(file), server, true)
})
```

### 修改文件

当业务代码中某个文件被修改时，Vite 首先会调用 `ModuleGraph` 的 `onFileChange` 对模块图中的对应节点进行`清除缓存`的操作。

然后正式进入 HMR 收集更新的阶段，主要逻辑在 `handleHMRUpdate` 函数中。

Vite 对于不同类型的文件，热更新策略有所不同：

1. 对于配置文件和环境变量声明文件的改动，Vite 会直接重启服务器
1. 对于客户端注入的文件 ( vite / dist / client / client.mjs ) 的改动，Vite 会给客户端发送 `full-reload` 信息，让客户端刷新页面
1. 对于普通文件的改动，Vite 首先会获取需要热更新的模块，然后对这些模块一次查找热更新边界，然后将模块更新的信息传给客户端

其中，对于普通文件的热更新边界查找的逻辑，主要集中在 `upadteModules` 函数中。

当热更新边界的信息收集完成后，服务端会将这些信息推送给客户端，从而完成局部的模块更新。

### 新增和删除文件

对于新增和删除文件，Vite 也通过 `chokidar` 监听了相应事件：

```ts
watcher.on("add", (file) => {
  handleFileAddUnlink(normalizePath(file), server)
})

watcher.on("unlink", (file) => {
  handleFileAddUnlink(normalizePath(file), server, true)
})
```

`handleFileAddUnlink` 同样调用 `upadteModules` 完成模块热更新边界的查找和更新信息的推送。

### 客户端派发更新

服务端会监听文件的改动，然后计算出对应的热更新信息，通过 WebSocket 将更新信息传递给客户端，具体来说，会给客户端发送如下的数据：

```json
{
  type: "update",
  update: [
    {
      // 更新类型，也可能是 `css-update`
      type: "js-update",
      // 更新时间戳
      timestamp: 1650702020986,
      // 热更模块路径
      path: "/src/main.ts",
      // 接受的子模块路径
      acceptedPath: "/src/render.ts"
    }
  ]
}
// 或者 full-reload 信号
{
  type: "full-reload"
}
```

那么客户端是如何接受这些信息并进行模块更新的呢？

Vite 在开发阶段会默认在 HTML 中注入一段客户端的脚本，即：

```html
<script type="module" src="/@vite/client"></script>
```

在这个脚本中，创建了 WebSocket 客户端，并与 Vite Dev Server 中的 WebSocket 服务端建立双向连接：

```ts
const socketProtocol = null || (location.protocol === "https:" ? "wss" : "ws")
const socketHost = `${null || location.hostname}:${"3000"}`
const socket = new WebSocket(`${socketProtocol}://${socketHost}`, "vite-hmr")
```

随后会监听 socket 实例的 message 事件，接收到服务端传来的更新信息：

```ts
socket.addEventListener("message", async ({ data }) => {
  handleMessage(JSON.parse(data))
})
```

`handleMessage` 函数：

```ts
async function handleMessage(payload: HMRPayload) {
  switch (payload.type) {
    case "connected":
      console.log("[vite] connected.")
      // 心跳检测
      setInterval(() => socket.send("ping"), __HMR_TIMEOUT__)
      break
    case "update":
      payload.updates.forEach((update) => {
        if (update.type === "js-update") {
          queueUpdate(fetchUpdate(update))
        } else {
          // css-update
          // 省略实现
          console.log(`[vite] css hot updated: ${path}`)
        }
      })
      break
    case "full-reload":
      // 刷新页面
      location.reload()
    // 省略其它消息类型
  }
}
```

其中，重点关注 JS 的更新逻辑：

```ts
queueUpdate(fetchUpdate(update))
```

`queueUpdate` 和 `fetchUpdate` 的实现：

```ts
let pending = false
let queued: Promise<(() => void) | undefined>[] = []

// 批量任务处理，不与具体的热更新行为挂钩，主要起任务调度作用
async function queueUpdate(p: Promise<(() => void) | undefined>) {
  queued.push(p)
  if (!pending) {
    pending = true
    await Promise.resolve()
    pending = false
    const loading = [...queued]
    queued = []
    ;(await Promise.all(loading)).forEach((fn) => fn && fn())
  }
}

// 派发热更新的主要逻辑
async function fetchUpdate({ path, acceptedPath, timestamp }: Update) {
  // 后文会介绍 hotModuleMap 的作用，你暂且不用纠结实现，可以理解为 HMR 边界模块相关的信息
  const mod = hotModulesMap.get(path)
  const moduleMap = new Map()
  const isSelfUpdate = path === acceptedPath

  // 1. 整理需要更新的模块集合
  const modulesToUpdate = new Set<string>()
  if (isSelfUpdate) {
    // 接受自身更新
    modulesToUpdate.add(path)
  } else {
    // 接受子模块更新
    for (const { deps } of mod.callbacks) {
      deps.forEach((dep) => {
        if (acceptedPath === dep) {
          modulesToUpdate.add(dep)
        }
      })
    }
  }
  // 2. 整理需要执行的更新回调函数
  // 注： mod.callbacks 为 import.meta.hot.accept 中绑定的更新回调函数，后文会介绍
  const qualifiedCallbacks = mod.callbacks.filter(({ deps }) => {
    return deps.some((dep) => modulesToUpdate.has(dep))
  })
  // 3. 对将要更新的模块进行失活操作，并通过动态 import 拉取最新的模块信息
  await Promise.all(
    Array.from(modulesToUpdate).map(async (dep) => {
      const disposer = disposeMap.get(dep)
      if (disposer) await disposer(dataMap.get(dep))
      const [path, query] = dep.split("?")
      try {
        const newMod = await import(
          /* @vite-ignore */
          `${base +
            path.slice(1) 
            }?import&t=${timestamp}${query ? `&${query}` : ""}`
        )
        moduleMap.set(dep, newMod)
      } catch (e) {
        warnFailedFetch(e, dep)
      }
    }),
  )
  // 4. 返回一个函数，用来执行所有的更新回调
  return () => {
    for (const { deps, fn } of qualifiedCallbacks) {
      fn(deps.map((dep) => moduleMap.get(dep)))
    }
    const loggedPath = isSelfUpdate ? path : `${acceptedPath} via ${path}`
    console.log(`[vite] hot updated: ${loggedPath}`)
  }
}
```

对热更新的边界模块来说，需要在客户端获取这些信息：

- 边界模块所接受 ( accept ) 的模块
- accept 的模块触发更新后的回调

在 `vite:import-analysis` 插件中，会给包含热更新逻辑的模块注入一些工具代码，`createHotContext` 就是客户端脚本中的一个工具函数：

```ts
const hotModulesMap = new Map<string, HotModule>()

export const createHotContext = (ownerPath: string) => {
  // 将当前模块的接收模块信息和更新回调注册到 hotModulesMap
  function acceptDeps(deps: string[], callback: HotCallback["fn"] = () => {}) {
    const mod: HotModule = hotModulesMap.get(ownerPath) || {
      id: ownerPath,
      callbacks: [],
    }
    mod.callbacks.push({
      deps,
      fn: callback,
    })
    hotModulesMap.set(ownerPath, mod)
  }
  return {
    // import.meta.hot.accept
    accept(deps: any, callback?: any) {
      if (typeof deps === "function" || !deps) {
        acceptDeps([ownerPath], ([mod]) => deps && deps(mod))
      } else if (typeof deps === "string") {
        acceptDeps([deps], ([mod]) => callback && callback(mod))
      } else if (Array.isArray(deps)) {
        acceptDeps(deps, callback)
      } else {
        throw new TypeError("invalid hot.accept() usage.")
      }
    },
    // import.meta.hot.dispose
    // import.meta.hot.invalidate
    // 省略更多方法的实现
  }
}
```

因此，Vite 给每个热更新边界模块注入的工具代码主要有两个作用：

- 注入 `import.meta.hot` 对象的实现
- 将当前模块 accept 过的模块和更新回调函数记录到 hotModulesMap 表中

而前面所说的 `fetchUpdate` 函数则是通过 `hotModuleMap` 来获取边界模块的相关信息，在 accept 的模块发生变动后，通过动态 import 拉取最新的模块内容，然后返回更新回调，让 `queueUpdate` 这个调度函数执行更新回调，从而完成派发更新的过程。

至此，HMR 的过程就结束了。
