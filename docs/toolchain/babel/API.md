# API

版本：Babel 7.x

## preview

- @babel/parser 对源码进行 parse，可以通过 plugins、sourceType 等来指定 parse 语法
- @babel/traverse 通过 visitor 函数对遍历到的 ast 进行处理，分为 enter 和 exit 两个阶段，具体操作 AST 使用 path 的 api，还可以通过 state 来在遍历过程中传递一些数据
- @babel/types 用于创建、判断 AST 节点，提供了 xxx、isXxx、assertXxx 的 api
- @babel/template 用于批量创建节点
- @babel/code-frame 可以创建友好的报错信息
- @babel/generator 打印 AST 成目标代码字符串，支持 comments、minified、sourceMaps 等选项。
- @babel/core 基于上面的包来完成 babel 的编译流程，可以从源码字符串、源码文件、AST 开始。

---

- parse 阶段有 @babel/parser，功能是把源码转成 AST
- transform 阶段有 @babel/traverse，可以遍历 AST，并调用 visitor 函数修改 AST，修改 AST 自然涉及到 AST 的判断、创建、修改等，这时候就需要 @babel/types 了，当需要批量创建 AST 的时候可以使用 @babel/template 来简化 AST 创建逻辑。
- generate 阶段会把 AST 打印为目标代码字符串，同时生成 sourcemap，需要 @babel/generator 包
- 中途遇到错误想打印代码位置的时候，使用 @babel/code-frame 包
- babel 的整体功能通过 @babel/core 提供，基于上面的包完成 babel 整体的编译流程，并实现插件功能。

## @bable/parser

Babel parser 叫 babylon，基于 acorn 实现，扩展了很多语法，可以支持 es next、jsx、flow、typescript 等语法的解析，其中 jsx、flow、typescript 这些非标准的语法的解析需要指定语法插件。

它提供了有两个 api：parse 和 parseExpression。两者都是把源码转成 AST，不过 parse 返回的 AST 根节点是 File（整个 AST），parseExpression 返回的 AST 根节点是是 Expression（表达式的 AST），粒度不同。

```ts
function parse(input: string, options?: ParserOptions): File
function parseExpression(input: string, options?: ParserOptions): Expression
```

options 主要分为两类

1. parse 的内容

   - plugins： 指定 jsx、typescript、flow 等插件来解析对应的语法
   - allowXxx： 指定一些语法是否允许，比如函数外的 await、没声明的 export 等
   - sourceType： 指定是否支持解析模块语法，有 module、script、unambiguous 3 个值
     - module 是解析 es module 语法
     - script 则不解析 es module 语法，当作脚本执行
     - unambiguous 则是根据内容是否有 import 和 export 来确定是否解析 es module 语法。

1. parse 的方式

   - strictMode：是否是严格模式
   - startLine：从源码哪一行开始 parse
   - errorRecovery：出错时是否记录错误并继续往下 parse
   - tokens：parse 的时候是否保留 token 信息
   - ranges：是否在 ast 节点中添加 ranges 属性

最常用的 option 就是 plugins、sourceType

```js
// parse tsx
require("@babel/parser").parse("code", {
  sourceType: "module",
  plugins: ["jsx", "typescript"],
})
```

## @babel/traverse

遍历和修改 parse 出的 AST，提供了 traverse 方法。

```ts
function traverse(parent, opts, ...args): void
```

常用的就前面两个参数，parent 指定要遍历的 AST 节点，opts 指定 visitor 函数。

Babel 会在遍历 parent 对应的 AST 时调用相应的 visitor 函数。

### 遍历过程

visitor 对象的 value 是对象或者函数：

- 如果 value 为函数，那么就相当于是 enter 时调用的函数。
- 如果 value 为对象，则可以明确指定 enter 或者 exit 时的处理函数。

函数会接收两个参数 path 和 state。

```js
visitor: {
    Identifier (path, state) {},
    StringLiteral: {
        enter (path, state) {},
        exit (path, state) {}
    }
}
```

enter 时调用是在遍历当前节点的子节点前调用，exit 时调用是遍历完当前节点的子节点后调用。

可以为单个节点的类型，也可以是多个节点类型通过 `|` 连接，还可以通过别名指定一系列节点类型。

```js
// 进入 FunctionDeclaration 节点时调用
traverse(ast, {
  FunctionDeclaration: {
    enter(path, state) {},
  },
})

// 默认是进入节点时调用，和上面等价
traverse(ast, {
  FunctionDeclaration(path, state) {},
})

// 进入 FunctionDeclaration 和 VariableDeclaration 节点时调用
traverse(ast, {
  "FunctionDeclaration|VariableDeclaration": function(path, state) {},
})

// 通过别名指定离开各种 Declaration 节点时调用
traverse(ast, {
  Declaration: {
    exit(path, state) {},
  },
})
```

[别名查询](https://github.com/babel/babel/blob/main/packages/babel-types/src/ast-types/generated/index.ts#L2489-L2535)

### path

path 是遍历过程中的路径，保留上下文信息，有很多属性和方法

- path.node：指向当前 AST 节点
- path.get、path.set：获取和设置当前节点属性的 path
- path.parent：指向父级 AST 节点
- path.getSibling、path.getNextSibling、path.getPrevSibling：获取兄弟节点
- path.find：从当前节点向上查找节点

以上属性和方法用于获取当前节点以及它的关联节点

- path.scope：获取当前节点的作用域信息

这个属性用于获取作用域的信息

- path.isXxx：判断当前节点是不是 xx 类型
- path.assertXxx：判断当前节点是不是 xx 类型，不是则抛出异常

isXxx、assertXxx 系列方法用于判断 AST 类型

- path.insertBefore、path.insertAfter：插入节点
- path.replaceWith、path.replaceWithMultiple、replaceWithSourceString：替换节点
- path.remove：删除节点

以上方法用于对 AST 进行增删改

- path.skip：跳过当前节点的子节点的遍历
- path.stop：结束后续遍历

以上方法用于跳过一些遍历

...

### state

遍历过程中在不同节点之间传递数据的机制。

插件会通过 state 传递 options 和 file 信息，也可以通过 state 存储一些遍历过程中的共享数据 ( 类似 context )。

## @babel/types

用于遍历 AST 过程中创建一些 AST 和判断 AST 的类型。

[查询 @babel/types API](https://babeljs.io/docs/en/babel-types#api)

## @babel/template

用于批量创建 AST 。

```ts
export interface TemplateBuilder<T> {
  /**
   * Build a new builder, merging the given options with the previous ones.
   */
  (opts: TemplateBuilderOptions): TemplateBuilder<T>

  /**
   * Building from a string produces an AST builder function by default.
   */
  (code: string, opts?: TemplateBuilderOptions): (arg?: PublicReplacements) => T

  /**
   * Building from a template literal produces an AST builder function by default.
   */
  (
    tpl: TemplateStringsArray,
    ...args: unknown[]
  ): (arg?: PublicReplacements) => T

  /**
   * Allow users to explicitly create templates that produce ASTs,
   * skipping the need for an intermediate function.
   *
   * Does not allow `%%foo%%` style placeholders.
   */
  ast: {
    (tpl: string, opts?: TemplateBuilderOptions): T
    (tpl: TemplateStringsArray, ...args: unknown[]): T
  }
}

export type PublicReplacements = { [index: string]: unknown } | unknown[]

export const smart: TemplateBuilder<Statement | Statement[]>
export const statement: TemplateBuilder<Statement>
export const statements: TemplateBuilder<Statement[]>
export const expression: TemplateBuilder<Expression>
export const program: TemplateBuilder<Program>

type DefaultTemplateBuilder = typeof smart & {
  smart: typeof smart
  statement: typeof statement
  statements: typeof statements
  expression: typeof expression
  program: typeof program
  ast: typeof smart.ast
}

declare const templateBuilder: DefaultTemplateBuilder

export default templateBuilder
```

- 根据模版创建整个 AST ，可选用 `template.ast` 或 `template.program` ，它们都直接返回 AST 。`template.ast` 返回的 AST 的根节点是 Program 。
- 创建具体的 AST ，可选用 `template.expression`、`template.statement`、`template.statements` 等方法。
- 使用 `template.ast` 创建的 Expression 默认被包裹一层 `ExpressionStatement` 节点 ( 被当作表达式语句 parse )，但使用 `template.expression` 方法创建的 AST 则不会。
- 模板内可以添加占位符

  ```js
  const fn = template("console.log(NAME)")
  const ast = fn({
    NAME: t.stringLiteral("guang"),
  })
  ```

  或

  ```js
  const fn = template("console.log(%%NAME%%)")

  const ast = fn({
    NAME: t.stringLiteral("guang"),
  })
  ```

  第二种主要用于占位符和其他变量名冲突时。

## @babel/generator

用于 AST 转换完后，打印成目标代码字符串。

```ts
/**
 * Turns an AST into code, maintaining sourcemaps, user preferences, and valid output.
 * @param ast - the abstract syntax tree from which to generate output code.
 * @param opts - used for specifying options for code generation.
 * @param code - the original source code, used for source maps.
 * @returns - an object containing the output code and source map.
 */
function generate(
  ast: t.Node,
  opts?: GeneratorOptions,
  code?: string | { [filename: string]: string },
): GeneratorResult

interface GeneratorResult {
  code: string
  map: {
    version: number
    sources: string[]
    names: string[]
    sourceRoot?: string | undefined
    sourcesContent?: string[] | undefined
    mappings: string
    file: string
  } | null
}
```

第一个参数是要打印的 AST

第二个参数是 options，指定打印的一些细节，比如通过 comments 指定是否包含注释，通过 minified 指定是否包含空白字符

第三个参数当多个文件合并打印的时候需要用到

options 中常用的是 sourceMaps，开启了这个选项才会生成 sourcemap

```js
const { code, map } = generate(ast, { sourceMaps: true })
```

## @babel/code-frame

用于打印打印错误位置的代码

```js
const result = codeFrameColumns(rawLines, location, {
  /* options */
})
```

```js
// options 可以设置 highlighted （是否高亮）、message（展示的错误信息）。
const { codeFrameColumns } = require("@babel/code-frame")

try {
  throw new Error("xxx 错误")
} catch (err) {
  console.error(
    codeFrameColumns(
      "const name = guang",
      {
        start: { line: 1, column: 14 },
      },
      {
        highlightCode: true,
        message: err.message,
      },
    ),
  )
}
```

## @babel/core

基于以上的包完成整个编译流程，从源码到目标代码，并生成 sourcemap 。

```js
transformSync(code, options) // => { code, map, ast }
transformFileSync(filename, options) // => { code, map, ast }
transformFromAstSync(parsedAst, sourceCode, options) // => { code, map, ast }
```

前三个 transformXxx 的 api 分别是从源代码、源代码文件、源代码 AST 开始处理，最终生成目标代码和 sourcemap。

options 主要配置 plugins 和 presets，指定具体要做什么转换。

这些 api 也同样提供了异步的版本，异步地进行编译，返回一个 promise

```js
transformAsync("code();", options).then((result) => {})
transformFileAsync("filename.js", options).then((result) => {})
transformFromAstAsync(parsedAst, sourceCode, options).then((result) => {})
```

注意：transformXxx 的 api，已经被标记为过时了，后续会删掉，不建议用，直接用 transformXxxSync 和 transformXxxAsync。

@babel/core 包还有一个 createConfigItem 的 api，用于 plugin 和 preset 的封装，后面章节会涉及到。

```js
createConfigItem(value, options) // configItem
```
