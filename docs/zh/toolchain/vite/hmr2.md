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
