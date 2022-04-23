# AST

AST 是对源码的抽象，字面量、标识符、表达式、语句、模块语法、class 语法都有各自的 AST。

查看 AST parse 的结果：[AST explorer](https://astexplorer.net/)

全部的 AST：[babel parser AST 文档](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md)

AST 类型定义：[@bable/types](https://github.com/babel/babel/blob/main/packages/babel-types/src/ast-types/generated/index.ts)

## Literal

字面量

- StringLiteral - 字符串字面量
- TemplateLiteral - 模板字面量
- NumericLiteral - 数字字面量
- RegExpLiteral - 正则表达式字面量
- BooleanLiteral - 布尔字面量
- BigintLiteral
- NullLiteral

## Identifier

标识符

变量名、属性名、参数名等各种声明和引用的名字，都是标识符。

JS 中的标识符只能包含字母或数字或下划线 ( "\_" ) 或美元符号 ( "$" ) ，且不能以数字开头。这是标识符的词法特点。

## Statement

语句

语句是可以独立执行的单位，比如 break、continue、debugger、return 或者 if 语句、while 语句、for 语句，还有声明语句，表达式语句等。

我们写的每一条可以独立执行的代码都是语句。

语句末尾一般会加一个分号分隔，或者用换行分隔。

语句是代码执行的最小单位，可以说，代码是由语句 ( Statement ) 构成的。

- BreakStatement
- ContinueStatement
- ReturnStatement
- DebuggerStatement
- ThrowStatement
- BlockStatement
- TryStatement
- ForInStatement
- ForStatement
- WhileStatement
- DoWhileStatement
- SwitchStatement
- LabeledStatement
- WithStatement

## Declaration

声明

声明语句是一种特殊的语句，它执行的逻辑是在作用域内声明一个变量、函数、class、import、export 等。

声明语句用于定义变量，变量声明也是代码中一个基础的部分。

**声明是具名的**

- VariableDeclaration
- FunctionDeclaration - `function foo() {}`
- ClassDeclaration - `class A {}`
- ImportDecaration
- ExportDefaultDeclaration
- ExportNamedDeclaration
- ExportAllDeclaration

## Expression

表达式

表达式的特点是执行完以后有返回值，这是和语句 ( statement ) 的区别。

有的表达式可以独立作为语句执行，会包裹一层 ExpressionStatement 。

- ArrayExpression - 数组表达式
- AssignmentExpression - 赋值表达式
- BinaryExpression - 二元表达式
- UnaryExpression - 一元表达式
- FunctionExpresstion - 函数表达式 - `function () {}`
- ArrowFunctionExpression - 箭头函数表达式 `() => {}`
- ClassExpression - class 表达式 `class {}`
- Identifier - 标识符
- ThisExpression - this 表达式
- Super - super
- BindExpression - 绑定表达式

我们判断 AST 节点是不是某种类型要看它是不是符合该种类型的特点，比如语句的特点是能够单独执行，表达式的特点是有返回值。

有的表达式可以单独执行，符合语句的特点，所以也是语句，比如赋值表达式、数组表达式等，但有的表达式不能单独执行，需要和其他类型的节点组合在一起构成语句。

## Class

类

class 是 es next 的语法，babel 中有专门的 AST 来表示它的内容。

- ClassDeclaration
- ClassBody
- ClassProperty
- ClassMethod ( 通过 kind 属性区分是 constructor 还是 method )

## Modules

es module 是语法级别的模块规范，所以也有专门的 AST 节点。

### import

import 有以下三种

- named import - 具名导入 - ImportDeclaration - ImportSpecifier
- default import - 默认导入 - ImportDeclaration - ImportDefaultSpecifer
- namespace import - 命名空间导入 - ImportDeclaration - ImportNamespaceSpecifier

### export

export 有以下三种

- named export - 具名导出 - ExportNamedDeclaration
- default export - 默认导出 - ExportDefaultDeclaration - ExportSpecifier
- all export - 全部导出 - ExportAllDeclaration

## Program & Directive

program 是代表整个程序的节点，它有 body 属性代表程序体，存放 statement 数组，就是具体执行的语句的集合。

还有 directives 属性，存放 Directive 节点，比如 "use strict" 这种指令会使用 Directive 节点表示

- Program
- CallExpression
- Directive

## File & Comment

Babel 的 AST 最外层节点是 File，它有 program、comments、tokens 等属性，分别存放 Program 程序体、注释、token 等，是最外层节点。

Comment 分为块注释和行内注释。

- File
- CommentBlock
- CommentLine

## 公共属性

每种 AST 都有自己的属性，但是它们也有一些公共属性：

- type：AST 节点的类型
- start、end：start 和 end 代表该节点对应的源码字符串的开始和结束下标，不区分行列。
- loc：loc 属性是一个对象，有 line 和 column 属性分别记录开始和结束行列号。
- leadingComments、innerComments、trailingComments：表示开始的注释、中间的注释、结尾的注释，因为每个 AST 节点中都可能存在注释，而且可能在开始、中间、结束这三种位置，通过这三个属性来记录和 Comment 的关联。
- extra：记录一些额外的信息，用于处理一些特殊情况。比如 StringLiteral 修改 value 只是值的修改，而修改 extra.raw 则可以连同单双引号一起修改。
