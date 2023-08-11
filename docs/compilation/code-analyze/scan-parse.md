# 扫描 & 解析 TS 文件

## 扫描 TS 文件

扫描代码文件就是遍历指定目录，找出目录及其子目录下所有特定类型的文件，并返回这些文件的目录路径信息。

### glob

常用的文件目录扫描工具库 [glob](https://github.com/isaacs/node-glob)，它支持配置通配符规则的方式来扫描文件目录。

```ts
const tsFiles = glob.sync(path.join(process.cwd(), "src/**/*.ts"))
```

Node 环境中获取路径的两种方式：

- `__dirname`：表示当前被执行脚本文件所在的目录的绝对路径 —— 脚本文件所在目录
- `process.cwd()`：返回运行当前脚本的工作目录路径 —— 脚本文件执行目录

### file

扫描 TS 代码文件的函数：

```ts
// 扫描TS文件
exports.scanFileTs = function (scanPath) {
  const tsFiles = glob.sync(path.join(process.cwd(), `${scanPath}/**/*.ts`))
  const tsxFiles = glob.sync(path.join(process.cwd(), `${scanPath}/**/*.tsx`))
  // console.log(tsFiles);
  // console.log(tsxFiles);
  return tsFiles.concat(tsxFiles)
}
```

## 解析 TS 文件

### TypeScript 编译原理

TS 编译器相关源码位于 [src/compiler](https://github.com/Microsoft/TypeScript/tree/main/src/compiler)，主要包含 `scanner` 扫描器 ( scanner.ts )，`parser` 解析器 ( parser.ts )，`binder` 绑定器 ( binder.ts )，`checker` 检查器 ( checker.ts )，`emitter` 发射器 ( emitter.ts ) 。

编译流程如下：

![compile process](/compilation/code-analyze/compile-process.png)

相关概念：

1. `Program`：编译开始时创建一个名为 Program 的编译上下文对象，通过`编译选项`和`输入文件`，加载所有输入文件及输入文件中导入的文件 ( 编译过程中会进行类型检查，而类型信息可能需要结合多个文件得出 )
1. `tsconfig`：`tsconfig.json`
1. `Tokens`：`Scanner` 扫描源代码进行词法分析后生成的 `Token` 流
1. `AST`：`Parser` 将 `Token` 流进行语法分析的结果
1. `Symbol`：`Binder` 会创建一个用于存储每个 `AST` 节点和对应符号 `Symbol` 的映射表，当初次定义或者从 `import` 导入一个变量、函数或类时，会为其创建一个符号 ( 唯一标识符 )，当在其他地方使用相同名称时，就查表找出这个名称所代表的符号。通过 `Symbol` 可以判定 `AST` 节点的语义上下文。
1. `Checker`：`Checker` 用于检查代码中变量的类型信息，提供了一些 API 获取节点类型及关联信息
1. `Emitter`：处理 `Node` 节点，将 `AST` 转化为 `js`、`dts`、`map` 等编译产物，代码分析不会涉及此阶段

上面的流程可以概括为四个阶段：

```text
// 1.解析代码生成AST对象
SourceCode（源码）~~ 扫描器 ~~> Token 流 ~~ 解析器 ~~> AST

// 2.为AST节点绑定符号
AST ~~ 绑定器 ~~> Symbols

// 3.语义检查，类型检查
AST + Symbols ~~ 检查器 ~~> 类型验证，语义上下文判断

// 4.代码生成阶段（代码分析不需要关注这个阶段）
AST + 检查器 ~~ 发射器 ~~> JavaScript 代码 （无需关注）
```

### Symbol

同一个文件中，两个不同的函数里定义了名称相同的变量，它们属于不同的 `Symbol`，如果有两个文件，`a.ts` 导出的变量 `app` 在 `b.ts` 中使用，那这个 `app` 在两个文件中对应的是同一个 `Symbol` 。

用 `Symbol` 区别之前脚本里的 `app`：

```ts
// 待分析代码
import { app } from "framework" // import app 定义 (symbol1)

const dataLen = 3
const name = "aaa"

function doWell() {
  const app = 4 // 局部常量 app 定义 (symbol2)
  return app // 局部常量 app 调用(symbol2)
}

function getInfos(info: string) {
  const result = app.get(info) // import app 调用(symbol1)
  return result
}
```

在 `Symbol Tabel` 中，每个 `AST` 节点都有唯一对应的符号 `Symbol`，相同语义上下文的 `AST` 节点拥有相同的 `Symbol`，且该 `Symbol` 指向第一次声明该变量的 `AST` 节点。

通过 Compiler API 获取 `Symbol`，需要通过 `program` 获取 ` Checker` 对象，再由 `Checker` 获取 `Symbol`：

- `program.getTypeChecker`：获取 `Checker` 控制器，该控制器用于类型检查、语义检查等
- `typeChecker.getSymbolAtLocation`：用于查询 `Symbol Table`，获取指定 `AST` 节点相关联的 `Symbol` 信息

代码示例：

```ts
// TS编译器
const tsCompiler = require("typescript")
// 创建Program
// fileNames参数表示文件路径列表，是一个数组，可以只传1个文件
// options参数是编译选项，可以理解成tsconfig
const program = tsCompiler.createProgram(fileNames, options)
// 从 Program 中获取 SourceFile 即 AST对象
// fileName表示某一个文件路径
const ast = program.getSourceFile(fileName)
// 获取 TypeChecker控制器
const checker = program.getTypeChecker()
// 获取 AST node节点对应的symbol
const symbol = checker.getSymbolAtLocation(node)
```

### Parse

`parseTs` 用于解析指定 TS 文件并返回 `AST`、`Checker` 控制器的函数：

```ts
// 解析ts文件代码，获取ast，checker
exports.parseTs = function (fileName) {
  // 将ts代码转化为AST
  const program = tsCompiler.createProgram([fileName], {})
  const ast = program.getSourceFile(fileName)
  const checker = program.getTypeChecker()
  // console.log(ast);
  return { ast, checker }
}
```
