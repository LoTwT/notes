# 选型

根据自动化测试的维度，可以分为单元测试和端到端测试。

- 单元测试是更细粒度的、从代码组件层次进行的功能测试
- 端到端测试是从用户视角，从项目整体展开的测试

针对单元测试，JavaScript 技术栈通常会选用 Jest 作为基础测试框架。但是进通过 Jest 没办法完成前端所有的单元测试，因为与常规的接口逻辑测试不同，前端的单元测试涉及到 DOM 和事件的模拟，还需要一个辅助库协助模拟相关的场景。

Reacting Test Library 和 Enzyme 都可供选择。

更推荐 Reacting Test Library 。

## 基础配置

- 使用 `pnpm create vite` 创建一个 `React + TypeScript` 的项目。
- 安装依赖 `pnpm i jest @types/jest @jest/types -D`
- 初始化 Jest 配置 `npx jest --init`，[查看更多配置](https://jestjs.io/docs/configuration)
  - yes
  - yes
  - jsdom (browser-like)
  - no
  - babel
  - yes
- 因为选用了 babel 作为单测的编译，添加对应依赖 `pnpm i babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript -D`
- 创建 `babel.config.cjs` 添加对应配置

  ```js
  // babel.config.cjs
  module.exports = {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      ["@babel/preset-react", { runtime: "automatic" }], // 自动导入react
      "@babel/preset-typescript",
    ],
  }
  ```

- 也许需要单独装一下 `ts-node`，`pnpm i ts-node -D`
- `pnpm i jest-environment-jsdom -D`

## 额外配置

- 额外的扩展名识别：因为 Jest 不使用 Webpack 等打包工具，所以它不知道如何加载除 `js/jsx` 外的其他文件扩展名，所以需要为它加一个转换器

  ```ts
  // jest.config.ts
  export default {
    // ... other config
    transform: {
      // ...
      "^.+.(js|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
  }
  ```

- SVG mock 转换：项目中可能会用到 SVG 图片，Jest 同样无法识别，需要对它进行 mock，返回相同的输出结果

  ```ts
  // jest.config.ts
  export default {
    // ... other config
    transform: {
      // ...
      "^.+.svg$": "<rootDir>/svg-transform.js",
    },
  }
  ```

  ```js
  // svg-transform.js
  export default {
    process() {
      return { code: "module.exports = {};" }
    },
    getCacheKey() {
      return "svgTransform" // SVG固定返回这个字符串
    },
  }
  ```

- CSS 代理：Jest 本身并不知道如何处理不同扩展的文件，可以通过配置代理的方式，告诉 Jest 将此对象模拟为导入的 CSS 模块

  ```bash
  pnpm i identity-obj-proxy -D
  ```

  ```ts
  // jest.config.ts
  export default {
    // ... other config
    moduleNameMapper: {
      ".(css|less)$": "identity-obj-proxy", // 有使用 sass 需求的同学可以把正则换成 ^\.(css|less|sass|scss)$
    },
  }
  ```

## React Testing Library

- 安装依赖

  - @testing-library/jest-dom : 用于 DOM 、样式类型等元素的选取
  - @testing-library/react : 提供针对 React 的单测渲染能力
  - @testing-library/user-event : 单测场景下事件的模拟
  - @types/testing-library\_\_jest-dom : 类型支持

  ```bash
  pnpm i @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/testing-library__jest-dom -D
  ```

- 针对 @testing-library/jest-dom ，创建 `jest-dom-setup.js` ( 名字自取 )，用于全局导入，使得 expect 可以适配 React Testing Library 提供的相关断言

  ```js
  // jest-dom-setup.js
  import "@testing-library/jest-dom"
  ```

- 将 `jest-dom-setup.js` 配置到 `jest.config.ts` 的 `setupFilesAfterEnv` 字段中；这个字段的作用是，将指定的配置文件，在安装测试框架后，执行测试代码本身之前运行

  ```ts
  // jest.config.ts
  export default {
    // ... other config
    setupFilesAfterEnv: ["<rootDir>/jest-dom-setup.js"],
  }
  ```
