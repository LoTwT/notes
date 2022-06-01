# parser

Babel 的 parser 基于 acorn 扩展而来

## 历史

- 基于 Mozilla 公布的 SpiderMonkey ( c++ ) 的 esprima ，后来形成了 estree 标准
- 基于 estree 标准的 acorn ，比 esprima 更快，且支持插件
- eslint 的 espree fork 自 exprima ，后来 espree 2.0 基于 acorn 重新实现
- 基于 acorn 的 Babel parser ( babylon ) ，对 AST 节点和属性做了扩展，并提供了各种插件

## 扩展

Babel 基于 acorn 插件对 estree AST 做了如下扩展

- 把 Literal 替换为 StringLiteral 、NumericLiteral 、BigIntLiteral 、BooleanLiteral 、NullLiteral 、RegExpLiteral
- 把 Property 替换为 ObjectProperty 和 ObjectMethod
- 把 MethodDefinition 替换为 ClassMethod
- Program 和 BlockStatement 支持了 directives 属性，对 `use strict` 等指令的解析，对应 Directive 和 DirectiveLiteral
- ChainExpression 替换为 ObjectMemberExpression 和 OptionalCallExpression
- ImportExpression 替换为 CallExpression 且 callee 属性设置为 Import

## acorn 插件

acorn 是一个 Parser 类，不同的方法实现不同的逻辑，插件扩展就是继承 Parser 类，重写一些方法。

parse 的过程是 `分词 + 组装 AST` ( `词法分析 + 语法分析` ) 。
