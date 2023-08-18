# 架构设计 & 分析范式

## 依赖调用分析模型

依赖调用分析这个概念中有两种角色，`依赖调用方`和`依赖提供方`。

将依赖调用方比作 A，依赖提供方比作 B，应用中的依赖关系都可以用 A 和 B 来描述，依赖与被依赖。

在微前端架构中，B 代表的就是基础项目 ( 主应用、基础框架、组件库、工具库 )，A 代表的是子应用项目。

依赖调用方是要分析的代码源，依赖提供方是提供 API 的代码源。针对依赖调用方仓库中每个 TS ( JS ) 代码文件，首先分析其所有 `import` 节点获取 API 导入情况，然后在代码中判定这些导入的 API 是否被调用，根据分析指标分析并记录相关信息，然后汇总统计 A 中所有 TS 文件的 API 调用信息并加以整理，生成依赖调用分析报告，分析 A 和 B 真实的依赖调用关系。

基于微前端架构的大型 Web 应用中依赖调用方肯定不止有一个，依次分析所有依赖调用方的代码便可以了解依赖提供方导出的 API 在所有项目中真实的调用情况，进而生成代码分析报告，了解并管控依赖关系。

## 面向对象编程

:::info
面向对象编程 ( Object Oriented Programming ) ，简称 OOP，与面向过程编程一样，也是一种编程思想。它旨在将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。面向对象是过程式代码的一种高度封装，目的在于提高代码的开发效率和可维护性。
:::

### 基础类设计

基于面向对象，将依赖调用分析中涉及的方法、属性都封装在一个名为 `CodeAnalysis` 的基础类中，它是依赖调用分析流程的抽象，是代码分析工具的核心，通过 new 生成实例驱动整个分析流程。

`CodeAnalysis` 类的部分属性和方法如下：

```ts
const { parseTs } = require(path.join(__dirname, "./parse")) // 解析模块

class CodeAnalysis {
  constructor(options) {
    // 私有属性
    this._scanSource = options.scanSource // 扫描源配置信息
    this._analysisTarget = options.analysisTarget // 要分析的目标依赖配置
    this._blackList = options.blackList || [] // 需要标记的黑名单API配置
    this._scorePlugin = options.scorePlugin || null // 代码评分插件配置
    this._analysisPlugins = options.analysisPlugins || [] // 代码分析插件配置
    // 公共属性
    this.pluginsQueue = [] // Targer分析插件队列
    this.browserQueue = [] // Browser分析插件队列
    this.importItemMap = {} // importItem统计Map
    // this.apiMap = {};                                       // 未分类API统计Map（插件挂载）
    // this.typeMap = {};                                      // 类型API统计Map（插件挂载）
    // this.methodMap = {};                                    // 方法API统计Map（插件挂载）
    // this.browserMap = {};                                   // BrowserAPI统计Map（插件挂载）
    this.parseErrorInfos = [] // 解析异常信息数组
    this.diagnosisInfos = [] // 诊断日志信息数组
    this.scoreMap = {} // 代码评分及建议Map
  }

  // API黑名单标记
  _blackTag() {}

  // 注册插件
  _installPlugins() {}

  // 链式调用检查，找出链路顶点node
  _checkPropertyAccess() {}

  // 执行分析插件队列中的checkFun函数
  _runAnalysisPlugins() {}

  // 执行分析插件队列中的afterHook函数
  _runAnalysisPluginsHook() {}

  // 分析import节点
  _findImportItems(ast) {}

  // API调用分析
  _dealAST(importItems, ast) {}

  // 扫描代码文件
  _scanFiles() {}

  // 扫描代码文件 & 分析代码
  _scanCode() {}

  // 记录诊断日志
  addDiagnosisInfo() {}

  // 入口函数
  analysis() {}
}
```

`CodeAnalysis` 中包括`扫描代码文件`、`解析 AST`、`遍历 AST`、`统计信息`、`安装插件`、`执行插件`、`链式检查`、`黑名单标记`、`代码评分`等一系列方法和属性。

## 分析范式

![analyze paradigm](/public/compilation/code-analyze/analyze-paradigm.png)

分析工具的执行生命周期 ( 分析范式 ) 可以归纳为七步。`CodeAnalysis` 的实例会贯穿第二步到第七步，即整个代码分析流程，其中第四步到第六步带有循环标志，表示这些步骤会遍历每个代码文件，第一步是分析工具入口，负责校验配置文件参数，预处理分析环境，相关逻辑在 `CLI` / `API` 两个入口文件中。

分析范式非常重要，后续内容顺序如下：

1. 扫描 & 解析 TS 文件：第三步和第四步实现原理，相关方法 `_scanCode`、`_scanFiles`、`parseTs`
1. 分析 import 节点：第五步实现原理，相关方法 `_scanCode`、`_findImportItems`
1. 判定 API 调用：第五步实现原理，相关方法 `_scanCode`、`_dealAST`
1. API 用途分析：第五步实现原理，相关方法 `_scanCode`、`_dealAST`
1. 分析插件方案设计：第二步、第五步、第六步实现原理，相关方法 `_installPlugins`、`_scanCode`、`_dealAST`、`_runAnalysisPlugins`、`_runAnalysisPluginsHook`
1. Browser API 调用分析：第五步实现原理，相关方法 `_scanCode`、`_dealAST`
1. 提取 Vue 文件中 TS 代码：第三步和第四步实现原理，相关方法 `_scanCode`、`_scanFiles`
1. 整理分析数据：第七步实现原理，相关方法 `_backTag`、`_scorePlugin`
1. 入口设计 & 发布 NPM 包：第一步实现原理，相关处理在 CLI / API 入口文件

## 架构设计

仅靠 `CodeAnalysis` 基础类无法完成依赖调用分析整个流程，它只是分析工具的核心。还需要其他模块来辅助它完成分析任务，代码分析工具的架构设计如下图：

![code analyze architecture](/public/compilation/code-analyze/code-analyze-architecture.png)

对照 [code-analysis-ts](https://github.com/liangxin199045/code-analysis-ts) 源码 `lib` 目录下的文件理解分析工具的代码组织模式：

1. 分析工具提供 `cli` 和 `api` 两种使用模式，`cli` 为命令行模式，依赖 `analysis.config.js` 配置文件
1. 配置文件 `analysis.config.js` 用于提供实例化 `CodeAnalysis` 的配置项，是使用者与工具交互的窗口
1. `index` 用于初始化 `CodeAnalysis` 实例执行代码分析，并且为两种不同入口返回统一格式的代码分析数据
1. `analysis` 是代码分析工具的核心，`parse`、`file`、`score`、`report`、`constant` 等模块提供了代码分析之外需要用到的辅助能力，由 `analysis` 通过组合模式按需引入
1. `plugins` 配合 `analysis` 用于拓展分析指标
1. `file` 提供了扫描代码文件、读写文件等基础能力
1. `parse` 提供了解析 TS 代码文件，解析 Vue 代码文件等基础能力
1. `score` 提供了代码评分默认处理逻辑
1. `report` 提供了生成代码分析报告等基础能力
1. `constant` 提供了工具的基础常亮配置

## 配置文件

分析工具的配置文件 `analysis.config.js` 是使用者和工具进行交流的窗口，合理的配置项设计可以提升工具的可用性、拓展性。具体配置项如下：

- `scanSource`：扫描源配置信息，即依赖调用方配置，它是一个数组，可以一次分析一个或多个项目。其中，`name` 属性表示项目名称，`path` 属性是一个数组，用于声明每个项目需要被扫描的文件目录
- `analysisTarget`：对应`依赖提供方`配置，是一个字符串类型
- `analysisPlugins`：配置代码分析插件，可按需配置、动态加载
- `blackList`：配置需要标记的黑名单 API
- `browserApis`：配置需要分析的 Browser API
- `reportDir`：配置生成代码分析报告的目录
- `reportTitle`：配置代码分析报告的标题
- `isScanVue`：配置是否扫描 Vue 文件中的 TS 代码
- `scorePlugin`：配置代码评分插件
- `alarmThreshold`：配置是否开启代码告警及告警阈值

```ts
const { execSync } = require("node:child_process")
// 子进程操作
const DefaultBranch = "master" // 默认分支常量
function getGitBranch() {
  // 获取当前分支
  try {
    const branchName = execSync("git symbolic-ref --short -q HEAD", {
      encoding: "utf8",
    }).trim()
    // console.log(branchName);
    return branchName
  } catch (e) {
    return DefaultBranch
  }
}

module.exports = {
  scanSource: [
    {
      // 必须，待扫描源码的配置信息
      name: "Market", // 必填，项目名称
      path: ["src"], // 必填，需要扫描的文件路径（基准路径为配置文件所在路径）
      packageFile: "package.json", // 可选，package.json 文件路径配置，用于收集依赖的版本信息
      format: null, // 可选, 文件路径格式化函数,默认为null,一般不需要配置
      httpRepo: `https://gitlab.xxx.com/xxx/-/blob/${getGitBranch()}/`, // 可选，项目gitlab/github url的访问前缀，用于点击行信息跳转，不填则不跳转
    },
  ],
  analysisTarget: "framework", // 必须，要分析的目标依赖名
  analysisPlugins: [], // 可选，自定义分析插件，默认为空数组，一般不需要配置
  blackList: ["app.localStorage.set"], // 可选，需要标记的黑名单api，默认为空数组
  browserApis: ["window", "document", "history", "location"], // 可选，要分析的BrowserApi，默认为空数组
  reportDir: "report", // 可选，生成代码分析报告的目录，默认为'report',不支持多级目录配置
  reportTitle: "Market依赖调用分析报告", // 可选，分析报告标题，默认为'依赖调用分析报告'
  isScanVue: true, // 可选，是否要扫描分析vue中的ts代码，默认为false
  scorePlugin: "default", // 可选，评分插件: Function|'default'|null, default表示运行默认插件，默认为null表示不评分
  alarmThreshold: 90, // 可选，开启代码告警的阈值分数(0-100)，默认为null表示关闭告警逻辑 (CLI模式生效)
}
```
