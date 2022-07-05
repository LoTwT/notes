# 组织

## 范围模块

### Multirepo

一个项目有多个模块，一个模块对应一个仓库，这种仓库管理风格叫 Multirepo ，存在代码无法复用、基建无法复用、版本无法统一管理的问题。

### Monorepo

Monorepo ，一个项目多个模块，每个模块都放在项目仓库下。

优点：

1. 简化组织
1. 减少依赖
1. 跨模块联调
1. 方便管理

落地：`pnpm workspace` 和 `turborepo`

## 多包仓库

`pnpm workspace` 和 `turborepo`

## 开源输出

![package.json 字段](/engineering/package-json-fields.jpg)

### 版本编号

> `version` 遵循 [semver 规范](https://semver.org/lang/zh-CN/)

| 版号     | 简称  | 又称            | 功能                     | 描述                         |
| -------- | ----- | --------------- | ------------------------ | ---------------------------- |
| 主版本   | major | Breaking Change | 在原来功能框架下新增功能 | 通常是做了不兼容 API 的修改  |
| 次版本   | minor | New Feature     | 在原来功能框架下新增功能 | 通常是做了向下兼容的功能修改 |
| 修订版本 | patch | Bug Fix         | 在原来功能框架下修复缺陷 | 通常是做了向下兼容的缺陷修改 |

> 先行版本

| 标记     | 简称       | 功能                                        | 描述                                   |
| -------- | ---------- | ------------------------------------------- | -------------------------------------- |
| 内测版本 | alpha      | 主要以实现软件功能为主                      | 只在开发者内部交流，问题较多需继续优化 |
| 公测版本 | beta       | 主要以修复问题缺陷为主 <br />还会加入新功能 | 可在社区外部交流，问题不多但需继续优化 |
| 候选版本 | gama 或 rc | 主要以消除最终错误为主 <br />不会加入新功能 | 与正式版本无异                         |

> 版本准则

版本的优先层级指不同版本在排序时如何比较。判断优先层级时，必须把版本依序拆分为`主版本`、`次版本`、`修订版本`、`先行版本`后比较。

> 版本规则

- ^ ：表示同一主版本中不小于指定版本的版本，主版本固定
- ~ ：表示同一主版本与次版本中不小于指定版本的版本，主版本与次版本固定
- \>、<、=、>=、<=、- ：表示版本范围，`-` 必须使用前后空格间隔
- || ：表示满足多个条件的版本，`||` 必须使用前后空格间隔
- x 、\* ：表示通配版本

### 入口文件

1. main ：在 Web 和 Node 环境中都可使用 —— CJS
1. module ：在 Web 和 Node 环境中都可使用 —— ESM
1. browser ：在 Web 环境中使用 —— UMD

- 若 Npm 模块只导出 CJS 的入口文件，使用 main 字段
- 若 Npm 模块只导出 ESM 的入口文件，使用 module 字段
- 若 Npm 模块导出 CJS 与 ESM 的入口文件，使用使用 main/module 字段
- 若 Npm 模块只在 Web 中使用且严禁在 Node 中使用，使用 browser 字段
- 若 Npm 模块只在 Node 中使用，使用 main 字段
- 若 Npm 模块能在 Web 与 Node 中使用，使用 main/browser 字段
- 若 Npm 模块导出 CJS 与 ESM 的入口文件且能在 Web 与 Node 中使用，使用 main/module/browser 字段

### 开源协议

| 协议      | 简述                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------- |
| AGPL      | 拓展 GPL3，使用在线网络服务也需开源                                                            |
| Apache    | 允许他人修改源码后闭源，需对每个被修改的文件做版权说明                                         |
| BSD2/BSD3 | 与 MIT 相似，未经事先书面许可不得使用版权所有者信息做推广                                      |
| BSL       | 与 GPL3 相似，无需复制版权说明                                                                 |
| CCZ       | 放弃作品版权并将其奉献给大众，不对源码做任何担保                                               |
| EPL       | 与 GPL3 相似，有权使用、修改、复制和发布软件原始版本与迭代版本，但在某些情况下需将修改内容释出 |
| GPL2      | 与 GPL3 相比，若使用源码作为服务提供而不分发软件则无需开源                                     |
| GPL3      | 无论以何种方式修改或使用源码，需开源                                                           |
| LGPL      | 与 GPL3 相比，允许商业软件通过类库引用使用类库而无需开源                                       |
| MIT       | 允许他人修改源码后闭源，无需对每个被修改的文件做版权说明，二次开发可用原作者信息做推广         |
| Mozilla   | 与 LGPL 相似，需对每个被修改的文件做版权说明                                                   |
| Unlicense | 与 CCZ 相似，允许开放商标与专利授权                                                            |

### README

通常，一份 README 需要以下内容

1. Title：标题
1. Short Description：简短描述
1. Table of Contents：内容列表
1. Install：安装
1. Usage：用法
1. License：许可证书

徽章图标通过 [shields.io](https://shields.io/) 生成

公式：`https://img.shields.io/badge/[label]-[message]-[color]`

比如：`(https://img.shields.io/badge/ayingott-BageDemo-09f` ![](https://img.shields.io/badge/ayingott-BageDemo-09f)

> logo `https://img.shields.io/badge/ayingott-BageDemo-09f?logo=npm` ![](https://img.shields.io/badge/ayingott-BageDemo-09f?logo=npm)

> logoWidth `https://img.shields.io/badge/ayingott-BageDemo-09f?logo=npm&logoWidth=50` ![](https://img.shields.io/badge/ayingott-BageDemo-09f?logo=npm&logoWidth=50)

> labelColor `https://img.shields.io/badge/ayingott-BageDemo-09f?logo=npm&labelColor=66f` ![](https://img.shields.io/badge/ayingott-BageDemo-09f?logo=npm&labelColor=66f)

> link 第一个 link 是左边的链接，第二个是右边 `https://img.shields.io/badge/ayingott-BageDemo-09f?logo=npm&labelColor=66f&link=https://github.com/lotwt&link=https://ayingott.me` ![](https://img.shields.io/badge/ayingott-BageDemo-09f?logo=npm&labelColor=66f&link=https://github.com/lotwt&link=https://ayingott.me)

github 徽章

`<iframe src="https://ghbtns.com/github-btn.html?user=lotwt&repo=mini-vue3&type=star&size=large&count=true" frameborder="0" scrolling="0" width="130" height="30" title="GitHub"></iframe>`

lotwt/mini-vue3 的 star ：<iframe src="https://ghbtns.com/github-btn.html?user=lotwt&repo=mini-vue3&type=star&size=large&count=true" frameborder="0" scrolling="0" width="130" height="30" title="GitHub"></iframe>

规则：

- 以 iframe 加入到 README ，需要 MD 引擎不过滤掉 iframe
- 整体连接 `https://ghbtns.com/github-btn.html`
- 参数
  - user：用户名称
  - repo：仓库名称
  - type：统计类型，可选 star/fork/watch
  - size：图标尺寸，可选 small/larget
  - count：是否显示计数，可选 true/false
