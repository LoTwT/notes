# [Babel](https://babeljs.io/)

Babel 是一个 js **转译器**。暂时仍然无可替代！

## 用途

1. 转译 esnext、typescript、flow 等到目标环境支持的 js ，及其 polyfill
1. 一些特定用途的代码转换 (转译器)
1. 代码的静态分析

## 编译和转译

编译是从一种编程语言转成另一种编程语言。主要指的是高级语言到低级语言。
编译器 Compiler 是指高级语言到低级语言的转换工具。

转译是从一种高级语言转成另一种高级语言。
转换编译器 (转译器 Transpiler) 是指高级语言到高级语言的转换工具。

Babel 是 JavaScript Transpiler。

## 编译流程

Babel 是 source to source 的转换，整体编译流程分为三步：

1. parse：通过 parser 把源码转成抽象语法树（AST）
1. transform：遍历 AST，调用各种 transform 插件对 AST 进行增删改
1. generate：把转换后的 AST 打印成目标代码，并生成 sourcemap

为了让计算机理解代码需要先对源码字符串进行 parse，生成 AST，把对代码的修改转为对 AST 的增删改，转换完 AST 之后再打印成目标代码字符串并生成 sourcemap。
