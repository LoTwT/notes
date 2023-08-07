# AST

AST ( Abstract Syntax Tree ) ，简称 AST ，它是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

## 常见节点类型

- literal -- 字面量：本身语义代表了一个值
- identifier -- 标识符：变量名、属性名、参数名等一系列声明和引用的名字
- statement -- 语句：代码执行的最小单位
- declaration -- 声明：声明语句是一种特殊的 statement
- expression -- 表达式：执行完成后有返回值，这是和语句的区别
- import -- 导入模块：特殊的声明语句，有三种类型 `ImportSpecifier` | `ImportDefaultSpecifier` | `ImportNamespaceSpecifier`
- export -- 到处模块：特殊的声明语句，有三种类型 `ExportAllDeclaration` | `ExportDefaultDeclaration` | `ExportNamedDeclaration`

每个 AST 节点都有一些公共属性：

- `pos`，AST 节点在代码字符串中索引的起始位置，配合 `end` 确定节点在代码字符串中的位置 ( 用于唯一性判定 )
- `end`，AST 节点在代码字符串中索引的结束位置，配合 `pos` 确定节点在代码字符串中的位置 ( 用于唯一性判定 )
- `kind`，标记当前 AST 节点的类型

## 可视化工具

- [AST Explorer](https://astexplorer.net/)
- [TypeScript AST Viewer](https://ts-ast-viewer.com/)

## AST 作用

### 代码编译

- `Babel`，将 ES6 JavaScript 转化为 ES5 JavaScript
- `TypeScript`，将 TypeScript 转化为 JavaScript
- `Sass`，将 Sass 转化为 CSS

### 代码加工

- `Prettier`，代码美化，风格格式化
- `ESLint`，修复语法错误
- `uglifyJS`，代码压缩、混淆
- `@vue/compiler-dom`，将 Vue 文件拆分成 `template`、`script`、`style` 三种代码类型片段

### 代码分析

- `ESLint`，代码语法检查
- `Webpack`，代码模块打包分析

基于 AST 的代码处理工具工作流程一般可以概括为以下 4 个阶段：

1. Parsing，解析，这个过程由编译器实现，会经过**词法分析**和**语法分析**两个过程，生成 `AST`
1. Traversing，遍历，深度优先遍历 `AST`，访问树上各个节点的信息
1. Transforming，修改，在遍历的过程中可对节点信息进行修改 / 转化，生成新的 `AST`
1. Printing，输出，将转化后新的 `AST` 输出成新的代码块

代码编译，代码加工一般经历以上四个阶段，而代码分析因为不需要去改变源码，所以一般只经历 1、2 两个阶段。

## AST 生成

生成 AST 包含两个步骤：

- 词法分析：将整个代码字符串分割成最小语法单元数组
- 语法分析：在分词基础上建立分析语法单元之间的关系

### 词法分析

:::info
将输入的源代码字符串，生成一系列词法单元 ( Tokens )。这些词法单元包括数字、标点符号、运算符等，它们之间是独立的。
:::

### 语法分析

:::info
将词法分析出的 Tokens 按照不同的语法结构如声明语句、赋值表达式等转化成有语法含义的抽象语法树结构。
:::

## 编译器 Parser

AST Explorer 的实现原理是通过调用对应开发语言 Parser 的 Compiler API，将代码解析为 AST 对象再进而遍历展示。Parser API 可以帮助完成代码的词法分析和语法分析，并返回对应的 AST 对象，以下是一些常用的 JS Parser 与 TS Parser：

- JS Parser：esprima、acorn、espree、@babel/parser
- TS Parser: typescript

## TS Parser

TS parser 可以同时解析 `JS(X)` 和 `TS(X)` 代码文件。

以下是 TS Parser 几个生成 AST 的 API：

1. `createSourceFile`：根据 TypeScript 代码字符串生成 AST 对象

   ```ts
   // TS编译器
   const tsCompiler = require("typescript")

   // 待分析代码片段字符串
   const tsCode = `import { app } from 'framework';                                
   
   const dataLen = 3;
   let name = 'iceman';
   
   if(app){
       console.log(name);
   }
   
   function getInfos (info: string) {
       const result = app.get(info);
       return result;
   }`

   // 第一个参数为命名，可以随意填，
   // 第二个参数是需要生成AST的源代码字符串
   // 第三个参数表示TS编译器版本
   // 第四个参数表示是否添加parent节点信息
   const ast = tsCompiler.createSourceFile(
     "xxx",
     tsCode,
     tsCompiler.ScriptTarget.Latest,
     true,
   )
   console.log(ast)
   ```

1. `createProgram`，`getSourceFile`：先创建 program 编译上下文，然后获取指定代码文件的 AST 对象，program 可以抽象成一次完整的 TS 编译过程，通过它可以获取编译过程的上下文信息

   ```ts
   // TS编译器
   const tsCompiler = require("typescript")

   // 创建Program
   // fileNames参数表示文件路径列表，是一个数组
   // options参数是编译选项，可以理解成tsconfig
   const program = tsCompiler.createProgram(fileNames, options)

   // 从 Program 中获取某个文件的 SourceFile
   // fileName表示某一个文件路径
   const ast = program.getSourceFile(fileName)
   console.log(ast)
   ```

上面两种方式都可以生成 AST，区别在于前者仅仅将一段 TS 代码字符串解析成 AST，因为不存在 program，所以无法获取编译上下文信息，只能通过遍历 AST 实现一些简单的分析场景。而后者通过 program 获取更多编译上下文信息，可以实现更细致的分析场景，代码分析工具采用后者来获取 AST。
