# 规范

## 模块规范

模块化让 JavaScript 也能用有自己的模块化效果。

Web 开发和 Node 开发都开始倾向于 ESM 。但现在仍然是 CJS 和 ESM 共存的时代，工具库的打包仍然建议生产这两种规范的产物。

在实际开发中，一个模块就是一个文件。

### 核心

模块化的核心包括以下四点，主要围绕如何处理文件 ( 模块 ) ：

- 拆分：将代码根据功能拆分为多个可复用模块
- 加载：通过指定方式加载、执行、输出模块
- 注入：将一个模块的输出注入到另一个模块
- 管理：因工程模块数量众多，需管理模块间的依赖关系

### 作用

- 隔离作用域
- 提供复用性
- 提高可维护性
- 解决命名冲突
- 抽离公共代码

### 方案

1. IIFE

   - 定义：使用立即执行函数编写模块化 —— `;(function() {})()`
   - 特点：

     - 模仿块级作用域
     - 利于代码压缩
     - 颠倒代码执行顺序
     - 通过函数作用域解决命名冲突和全局作用域污染

1. CJS

   - 定义：Node.js 引入的模块化、同步加载依赖模块 —— `require() 、exports 、module.exports`
   - 特点：

     - 一个文件就是一个模块
     - 拥有独立作用域、变量、函数
     - 无法并行加载多个模块
     - 在 Web 端使用会阻塞加载

1. AMD

   - 定义：使用 RequireJS 编写模块化、异步加载依赖模块 —— `define() 、require() 、require.config()`
   - 特点：

     - 依赖前置，代码执行前加载模块
     - 可并行加载多个模块
     - 在 Web 端可以异步加载
     - 不符合通用模块化的思维方式
     - 提高开发成本且代码逻辑不顺畅

1. CMD

- 定义：使用 SeaJS 编写模块化、异步加载依赖模块 —— `define()`
- 特点：

  - 依赖就近，代码执行时加载模块
  - 依赖 SPM 打包
  - 模块加载逻辑偏重

1. UMD

   - 定义：兼容 CJS 和 AMD 规范
   - 特点：

     - 兼容 CJS 和 AMD 规范的同时还兼容 IIFE
     - 先判断 AMD 支持，在判断 CJS 支持，都不支持则使用 IIFE

1. ESM

- 定义：ES6 引入的模块化，异步加载依赖模块 —— `import 、export`
- 特点：

  - 静态分析
  - 面向未来
  - 部分 Web 未完全实现 ESM
  - 高版本 Node.js 才支持较新的 ESM

总结：

1. 同步加载包括 IIFE 、CJS ，异步加载包括 AMD 、CMD 、ESM
1. 浏览器兼容 IIFE 、AMD，服务器兼容 CJS ，浏览器服务器都兼容 CMD 、UMD 、ESM

### ESM 和 CJS

|          | CJS                                                          | ESM                                                    |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| 语法类型 | 动态                                                         | 静态                                                   |
| 关键声明 | require                                                      | import 、export                                        |
| 加载方式 | 运行时加载                                                   | 编译时加载                                             |
| 加载行为 | 同步加载                                                     | 异步加载                                               |
| 书写位置 | 任何位置                                                     | 顶层位置                                               |
| 指针指向 | this 指向当前模块                                            | this 指向 undefined                                    |
| 执行顺序 | 首次引入时 `加载模块` <br /> 再次引入时 `读取缓存`           | 引入时生成 `只读引用` <br /> 执行时才是 `正式取值`     |
| 属性引用 | 基本类型属于 `复制不共享` <br /> 引用类型属于 `浅拷贝且共享` | 所有类型属于 `动态只读引用`                            |
| 属性修改 | 工作空间可修改引入的值                                       | 工作空间不可修改引入的值 <br /> 但可通过引用的方式修改 |

- 运行时加载：指整体加载模块生成一个对象，再从对象上获取所需的属性方法加载。最大的特性是`全部加载`，只有运行时才能得到该对象，无法在编译时做静态优化
- 编译时加载：指直接从模块中获取所需的属性方法加载。最大的特性是`按需加载`，在编译时就完成模块加载，效率比其他方案高，无法引用模块本身 ( 本身不是对象 ) ，但可拓展 JavaScript 高级语法 ( 宏与类型校验 )

ESM 无法使用 CJS 提供的 `直接引入 json 文件` 、`__dirname` 、`__filename` 、`require` 、`module` 、`exports`

- `__dirname` 和 `__filename` 用 `import.meta` 重建
- `require` 、`module` 、`exports` 使用 `import` 、`export` 替代
- json 文件引入使用 `readFile` 和 `JSON.parse()` 替代

```js
import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const json = readFileSync("./xxx.json")
const data = JSON.parse(json)
```

CJS 的循环依赖关系通过缓存各个模块的 `module.exports` 对象解决，但 ESM 用了所谓的绑定，ESM 模块不会导出导入值而是引用值。

- 导入引用的模块可访问该引用但无法修改它
- 导出引用的模块可为引用该模块的模块重新分配值，且该值由导入引用的模块使用

而 CJS 允许在任何时间点将引用分配给模块的 `module.exports` 对象，让这些修改仅部分反映在其他模块。

### ESM 现状

Node.js 老版本 ( <= v13.2.0 ) 先不谈。

新版本使用 type 指定模块方案，指定 `package.json` 的 `type` 字段 ( 其他方法略 )

- commonjs：使用 CJS
- module: 使用 ESM

Node.js 要求使用 ESM 规范的文件使用 `.mjs` 后缀名，文件中存在 `import 、export` 必须使用 `.mjs` ；不希望修改后缀名，则在 `package.json` 中指定 `type` 为 `module` 。基于此，其他使用 CJS 规范的文件使用 `.cjs` 后缀名，或使用 `.js` 后缀时，在 `package.json` 中指定 `type` 字段为 `commonjs` 。

`mjs` 使用 ESM 解析，`cjs` 使用 CJS 解析，`js` 基于指定的 `type` 解析。

Node.js 将以下情况视为 ESM ：

1. `.mjs`
1. `.js` + `type` 字段为 `module`
1. 命令中添加参数 `--input-type=module`
1. 命令中添加参数 `--eval cmd`
