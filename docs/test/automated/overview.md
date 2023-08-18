# 自动化测试

对核心组件覆盖自动化测试，可以有效地保证组件功能的单一。

对通用的基础建设，相比手工测试，自动化测试的覆盖率更有说服力，并且可以有效规避某次修改引起的历史功能的异常，从而保证整体功能的稳定。

## 如何写前端的自动化测试？

前端的自动化测试大部分需要模拟浏览器环境，进行对应 DOM 和事件效果的断言，这也是 QA 常称的 UI 自动化测试。

### 选型

Jest + React Testing Library + Cypress + Storybook

- Jest: 一个 JavaScript 集大成的测试库，是单元测试的基础 (~~Vue 生态相关请选择 Vitest 🤣~~)
- React Testing Library: 提供了一些 React Component 相关的 API，协助进行 React DOM 和事件相关的单侧编写
- Cypress: 通过 E2E 端对端的方式覆盖除滚动外的一些复杂场景
