# node v18 发布公告

> 原文链接：[v18-release-announce](https://nodejs.org/en/blog/announcements/v18-release-announce/)

我们很高兴地宣布，Node.js 18 今天发布了！亮点包括将 V8 JavaScript 引擎更新到 10.1，默认启用全局 fetch，以及一个核心的 Test runner module 。

最初，Node.js 18 将取代 Node.js 17 ，成为我们的 "当前" 发布版本。根据发布时间表，Node.js 18 将在未来 6 个月内作为 "当前" 版本，然后在 2022 年 10 月晋升为长期支持版（LTS）。一旦晋升为长期支持版，该版本将被指定 "Hydrogen" 的代号。Node.js 18 将被支持到 2025 年 4 月。

你可以在 <https://github.com/nodejs/release> ，了解更多关于我们的发布政策。

要下载 Node.js 18.0.0，请访问：<https://nodejs.org/en/download/current/> 。你可以在 <https://nodejs.org/en/blog/release/v18.0.0> 找到发布帖子，其中包含了本次发布中所包含的全部提交清单。

## 新的全局可用的兼容浏览器的 API

### fetch (实验性)

在 Node.js 18 中，一个实验性的全局 fetch API 是默认可用的。该实现来自 [undici](https://undici.nodejs.org/#/) ，并受到 [node-fetch](https://github.com/node-fetch/node-fetch) 的启发，后者最初是基于 [undici-fetch](https://github.com/Ethan-Arrowood/undici-fetch) 。该实现力争尽可能地接近规范，但有些方面需要浏览器环境，因此被省略了。

该 API 将保持实验性，直到有更多的测试覆盖，并且贡献者已经验证了该 API 实现了尽可能多的规范。如果你想参与进来，请访问 [nodejs/undici](https://github.com/nodejs/undici) 资源库，并寻找 [带有 fetch 标签的 issue](https://github.com/nodejs/undici/issues?q=is%3Aissue+is%3Aopen+label%3Afetch) 。

该 API 的使用实例：

```mjs
const res = await fetch("https://nodejs.org/api/documentation.json")
if (res.ok) {
  const data = await res.json()
  console.log(data)
}
```

通过这一补充，以下全局变量可以被使用了：`fetch`、`FormData`、`Headers`、`Request`、`Response`。

可以通过命令行输入 `--no-experimental-fetch` 标志来禁用该 API 。

`undici` 中的 `fetch()` 实现是由 Robert Nagy、Ethan Arrowood 和 Matteo Collina 负责。该实现由 Michaël Zasso 在 [#41811](https://github.com/nodejs/node/pull/41811) 中添加到 Node.js 核心。

### Web Streams API (实验性)

Node.js 现在在全局作用域内暴露了 [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) 的实验性实现。这意味着以下 API 现在是全局可用的：

- `ReadableStream`, `ReadableStreamDefaultReader`, `ReadableStreamBYOBReader`, `ReadableStreamBYOBRequest`, `ReadableByteStreamController`, `ReadableStreamDefaultController`, `TransformStream`, `TransformStreamDefaultController`, `WritableStream`, `WritableStreamDefaultWriter`, `WritableStreamDefaultController`, `ByteLengthQueuingStrategy`, `CountQueuingStrategy`, `TextEncoderStream`, `TextDecoderStream`, `CompressionStream`, `DecompressionStream`.

由 James Snell 在 [#39062](https://github.com/nodejs/node/pull/39062) 和 Antoine du Hamel 在 [#42225](https://github.com/nodejs/node/pull/42225) 贡献。

### 其他全局 API

此外，以下 API 现在暴露在全局作用域内：

- `Blob` - <https://nodejs.org/api/buffer.html#class-blob>
- `BroadcastChannel` - <https://nodejs.org/api/worker_threads.html#class-broadcastchannel-extends-eventtarget>

这两个 API 都不再是实验性的了。

由 James Snell 在 [#41270](https://github.com/nodejs/node/pull/41270) 和 [#41271](https://github.com/nodejs/node/pull/41271) 贡献。

## Test runner module (实验性)

`node:test` 模块便于创建 JavaScript 测试，以 TAP 格式报告结果。要访问它：

`import test from 'node:test';`

下面是一个带有两个子测试的父测试的实现实例：

```js
test("top level test", async (t) => {
  await t.test("subtest 1", (t) => {
    assert.strictEqual(1, 1)
  })

  await t.test("subtest 2", (t) => {
    assert.strictEqual(2, 2)
  })
})
```

注意，`Test runner module` 只能使用 `node:` 前缀访问。`node:` 前缀表示加载的是一个核心模块。省略前缀并导入 `test` 将试图加载一个用户区模块。

更多信息请见 <https://nodejs.org/dist/latest-v18.x/docs/api/test.html> 。

由 Colin Ihrig 在 [#42325](https://github.com/nodejs/node/pull/42325) 贡献。

## 工具链和编译器的升级

Node.js 为几个不同的平台提供了预构建的二进制文件。对于每个主要的版本，都会评估最低的工具链，并酌情提高。

- 用于 Linux 的预编译二进制文件现在是在 `Red Hat Enterprise Linux`（RHEL）8 上构建的，并与基于 glibc 2.28 或更高版本的 Linux 发行版兼容，例如，Debian 10、RHEL 8、Ubuntu 20.04。
- 用于 macOS 的预构建二进制文件现在需要 macOS 10.15 或更高版本。
- 对于 AIX ，最小支持的架构已经从 Power 7 提高到 Power 8 。

由于在 Node.js 中构建 V8 依赖的问题，32 位 Windows 的预构建二进制文件最初将不可用。我们希望通过未来的 V8 更新来恢复 Node.js 18 的 32 位 Windows 二进制文件。

Node.js 不支持在不再被其供应商支持的操作系统上运行。对于其供应商已计划在 2025 年 4 月之前结束支持的操作系统，如 Windows 8.1（2023 年 1 月）和 Windows Server 2012 R2（2023 年 10 月），对 Node.js 18 的支持将在较早的日期结束。

关于支持的工具链和编译器的全部细节在 Node.js [BUILDING.md](https://github.com/nodejs/node/blob/v18.x/BUILDING.md#supported-platforms) 文件中记录了。

Node.js 团队再次感谢我们的基础设施供应商 Digital Ocean、Rackspace、ARM、Cloudflare、Equinix、IBM、Intel、Joyent、Macstadium、Microsoft 和俄勒冈州立大学开源实验室为该项目提供基础设施。我们还要感谢 Red Hat 根据他们的 [Red Hat for Open Source Infrastructure](https://www.redhat.com/en/blog/extending-no-cost-red-hat-enterprise-linux-open-source-organizations) 计划提供免费的 Red Hat 订阅。

由 Richard Lau 在 ([#42292](https://github.com/nodejs/node/pull/42292) 、[#42604](https://github.com/nodejs/node/pull/42604) 、 [#42659](https://github.com/nodejs/node/pull/42659)) 和 Michaël Zasso 在 ([#42105](https://github.com/nodejs/node/pull/42105) 和 [#42666](https://github.com/nodejs/node/pull/42666)) 贡献。用于 ARMv7 升级的交叉编译器由 Rod Vagg 贡献。

## Build-time user-land snapshot (实验性)

从 Node.js 18.0.0 开始，用户可以使用 configure 脚本的 `--node-snapshot-main` 标志来构建一个带有自定义 V8 启动快照的 Node.js 二进制文件。比如：

```console
$ cd /path/to/node/source

# Specifying an entry point of the snapshot, for example,
# a UMD module like the marked markdown renderer which in
# this case should initialize the renderer and stores in
# globalThis.
$ ./configure --node-snapshot-main=marked.js

# Build the binary
$ make node
```

生成的二进制文件可以反序列化在构建时由快照入口点初始化的堆的状态，因此生成的二进制文件中的应用程序可以更快地被初始化：

```js
// render.js
// globalThis.marked can be deserialized from the embedded
// snapshot so there is no need to parse and execute the
// module again, which improves startup time.
const html = globalThis.marked(process.argv[1])
console.log(html)
```

生成的二进制文件可以像这样执行：

```console
$ out/Release/node render.js test.md
```

作为后续工作，我们正在为用户区快照开发 JS API（[#42617](https://github.com/nodejs/node/issues/42617)），这样二进制文件就可以在没有额外的运行时入口脚本的情况下被执行，有效地把它变成一个包含用户应用程序的单文件可执行程序。我们还在努力使该功能成为一个运行时标志（[#38905](https://github.com/nodejs/node/pull/38905)），以便快照可以在没有编译器的情况下生成和加载。

由 Joyee Cheung 在 [#42466](https://github.com/nodejs/node/pull/42466) 贡献。

## V8 10.1

V8 引擎被更新到 10.1 版本，这是 Chromium 101 的一部分。与 Node.js 17.9.0 中包含的版本相比，包括以下新功能：

- [`findLast()` and `findLastIndex()` array methods](https://v8.dev/features/finding-in-arrays)
- 对 [`Intl.Locale` API](https://v8.dev/blog/v8-release-99#intl.locale-extensions) 的完善.
- [`Intl.supportedValuesOf` function](https://v8.dev/blog/v8-release-99#intl-enumeration)
- 优化性能的 [class fields](https://bugs.chromium.org/p/v8/issues/detail?id=9888) 和 [private class methods](https://bugs.chromium.org/p/v8/issues/detail?id=10793) (它们的初始化现在和普通的属性一样快)。

由 Michaël Zasso 在 [#42657](https://github.com/nodejs/node/pull/42657) 中贡献。

## 其他项目新闻

虽然在 Node.js 18 中没有新的内容，但在过去的几个月中，该项目继续发展其 ECMAScript 模块实现。值得注意的里程碑包括增加对 [JSON Import Assertions](https://github.com/tc39/proposal-import-assertions) 的实验性支持，取消 JSON 模块的 flagging（实验性），以及对 HTTPS 和 HTTP 导入的实验性支持。[Node.js Loaders 团队](https://github.com/nodejs/loaders)也在继续开发 Node.js 中的 ECMAScript 模块加载器实现。

该项目还在继续其 ['Next 10'](https://github.com/nodejs/next-10) 工作。这项工作的目标是反思 Node.js 前 10 年的成功之处，并为未来 10 年的成功设定方向。已经召开了几次会议，讨论商定的 [技术重点](https://github.com/nodejs/node/blob/master/doc/contributing/technical-priorities.md) 的下一步工作。在 Modern HTTP、WebAssembly 和 Types 上已经有了很好的讨论。关于 ECMAScript 模块和 Observability 的下一次会议计划在即将于 6 月举行的 [OpenJS World](https://events.linuxfoundation.org/openjs-world/) 会议上成为合作者峰会的一部分。

## 倡议

试用新的 Node.js 18 版本! 我们总是很高兴听到你的反馈。用 Node.js 18 测试你的应用程序和模块，有助于确保你的项目在未来与 Node.js 的最新变化和功能兼容。

另外值得注意的是，Node.js 12 将在 2022 年 4 月停止维护，所以我们建议你开始计划升级到 Node.js 14（LTS）或 Node.js 16（LTS）。

关于 Node.js 发布的时间线，请查看 [Node.js 发布时间表](https://github.com/nodejs/release#release-schedule) 。

## 致谢

我们要感谢所有的 Node.js 合作者和贡献者，因为这个版本是他们所有持续努力的总结。
