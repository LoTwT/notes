# 再谈 ESM

Vite 本身是借助浏览器原生的 ESM 解析能力 ( `type="module"` ) 实现了开发阶段的 no-bundle ，即不用打包也可以构建 Web 应用。

但请不要对原生 ESM 的理解仅仅停留在 `type="module"` 这个特性上。

一方面浏览器和 Node.js 各自提供了不同的 ESM 使用特性，如 `import maps` 、package.json 的 `imports` 和 `exports` 属性等。

另一方面，前端社区开始筑家你向 ESM 过渡，有的包甚至仅留下 ESM 产物，Pure ESM 的概念随之席卷前端圈。
