# esbuild

## 为什么 esbuild 性能极高？

原因：

1. 使用 Golang 开发。构建逻辑代码直接被编译为原生机器码，而不用像 JS 一样先代码解析为字节码，然后转换为机器码，大大节省了程序运行时间
1. 多核并行。内部打包算法充分利用多核 CPU 优势，所有的步骤尽可能并行，这要是得益于 Go 当中多线程共享内存的优势
1. 从零造轮子。几乎没有使用任何第三方库，所有逻辑自己编写，大到 AST 解析，小到字符串的操作，保证极致的代码性能
1. 高效的内存利用。esbuild 中从头到尾尽可能地复用一份 AST 节点数据，而不用像 JS 打包工具中频繁地解析和传递 AST 数据 ( 如 string -> TS -> JS -> string ) ，造成内存的大量浪费

## API

### build、buildAsync、serve

```ts
const { build, buildSync, serve } = require("esbuild")

async function runBuild() {
  // 异步方法，返回一个 Promise
  const result = await build({
    // ----  如下是一些常见的配置  ---
    // 当前项目根目录
    absWorkingDir: process.cwd(),
    // 入口文件列表，为一个数组
    entryPoints: ["./src/index.jsx"],
    // 打包产物目录
    outdir: "dist",
    // 是否需要打包，一般设为 true
    bundle: true,
    // 模块格式，包括`esm`、`commonjs`和`iife`
    format: "esm",
    // 需要排除打包的依赖列表
    external: [],
    // 是否开启自动拆包
    splitting: true,
    // 是否生成 SourceMap 文件
    sourcemap: true,
    // 是否生成打包的元信息文件
    metafile: true,
    // 是否进行代码压缩
    minify: false,
    // 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包
    watch: false,
    // 是否将产物写入磁盘
    write: true,
    // Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
    // 针对一些特殊的文件，调用不同的 loader 进行加载
    loader: {
      ".png": "base64",
    },
  })
  console.log(result)
}

runBuild()
```

不推荐使用 `buildSync` 这种同步的 API ，它们会导致两方面不良后果：

1. 一方面容易使 esbuild 在当前线程阻塞，丧失并发任务处理的优势
1. 另一方面，esbuild 所有插件中都不能使用任何异步操作，给插件开发增加了限制

serve API 的特点：

1. 开启 serve 模式后，将在指定的端口和目录上搭建一个静态文件服务，这个服务器用原生 Go 语言实现，性能比 Node.js 更高
1. 类似 webpack-dev-server ，所有的产物文件都默认不会写到磁盘，而是放在内存中，通过请求服务访问
1. 每次请求到来时，都会进行重新构建 ( rebuild ) ，永远返回新的产物

> 触发 rebuild 的条件不是代码改动，而是新的请求到来

### transform

除了项目的打包功能，esbuild 还专门提供了单文件编译的能力，即 `transform API` ，同样包含了同步和异步两个方法，为 `transform` 和 `transformSync` 。

同步的 `transformSync` 同样会使 esbuild 丧失并发任务处理的优势。

## 插件

插件开发其实就是基于原有的体系结构中进行扩展和自定义。

esbuild 插件结构被设计为一个对象，里面有 name 和 setup 两个属性，name 是插件的名称，setup 是一个函数，其中入参是一个 build 对象，这个对象上挂载了一些钩子可供自定义钩子函数逻辑。

### 钩子函数

- onResolve 控制路径解析
- onLoad 控制模块内容加载

这两个钩子函数中都需要传入两个参数：Options 和 Callback 。

```ts
interface Options {
  filter: RegExp
  namespace?: string
}
```

filter 为必传参数，是一个正则表达式，它决定了要过滤出的特征文件。

> 插件中的 filter 正则是使用 Go 原生正则实现的，为了不使性能过于劣化，规则应该尽可能严格。同时它本身和 JS 的正则也有所区别，不支持前瞻 ( ?<= ) 、后顾 ( ?= ) 和反向引用 ( \1 ) 这三种规则。

namespace 为选填参数，一般在 onResolve 钩子中的会掉参数返回 namespace 属性作为标识，可以在 onLoad 钩子中通过 namespace 将模块过滤出来。

Callback ，它的类型根据不同的钩子会有所不同。

- onStart 构建开始
- onEnd 构建结束

注意：

1. onStart 的执行时机是在每次 build 的时候，包括触发 watch 和 serve 模式的重新构建
1. onEnd 如果要拿到 metafile ，必须将 esbuild 的构建配置中 metafile 属性设为 true
