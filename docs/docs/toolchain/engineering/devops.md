# 开发运维

DevOps 是一组过程、方法和系统的同城，是 `Development ( 开发 )` 和 `Operations ( 运维 )` 的简写，用于促进技术开发、运营策划和质量保障三个部门间的沟通、写作和整合。

DevOps 的最大特性是自动化，终极目标就是解放双手。

DevOps 是一种重视`软件开发人员`与`运维技术人员`间沟通合作的文化、运动或管理。通过自动化`软件交付`与`架构变更`的流程，使`构建`、`测试`、`打包`、`发布`、`部署`变得更快捷、频繁、可靠。

## CI / CD

DevOps 与 CI / CD 紧密相关，是理论与实践的结合。

> 持续集成

Continuous Integration ，持续集成，简称 CI ，指多名开发者在开发不同代码过程当中可频繁地将代码合并且互相不影响工作。

> 持续部署

Continuous Deployment ，持续部署，简称 CD ，指基于某种工具或平台实现代码自动化的构建、测试、打包、发布、部署。

持续部署在某种程度上代表一个开发团队的更新迭代速率。

> 持续交付

Continuous Delivery ，持续交付，简称 CD ，指在持续部署的基础上将产品交付到线上环境以实现交付高质量的产品。

持续交付是产品价值的一种交付，是产品价值的一种盈利的实现。

---

一个完整的 CI / CD 包括一个 CI 与两个 CD 。通过 CI / CD 流水线，软件研发可实现从构建、测试、打包、发布、部署，甚至整个工程都在流水线中向前推进。

一旦将软件研发实施流水线，就可将其部分工作流程或全部工作流程自动化，以加快开发流程并减少错误。

简而言之，CI / CD 提供的流水线操作使企业更轻松地应对软件的自动快速持续交付。

## 方案

对于`个人服务器`、`类库模块`、`多包仓库`、`私有仓库`、`文档站点`等的搭建和部署，分析哪些需要 CI ：

- 个人服务器：作为承载 CI 流水线的底层支持，需要部署
- 类库模块：开发完毕最终会发布到 Npm 共有仓库或私有仓库，其发布过程可考虑使用 CI ，考虑部署
- 多包仓库：与类库模块相似，考虑部署
- 私有仓库：开发完毕基本不会发生很大变动，它只是作为一个中继托管仓库，无需部署
- 文档站点：在类库模块或多包仓库的版本迭代后，必定会更新网站内容，需要部署

可以通过 Gitlab 部署 CI / CD ，但要求服务器硬件必须在 `2核2G` 以上。

当版本发生迭代后，更新提交到 Github 仓库，会触发 Webhooks ，通过 Github Actions 监听指定的 Webhooks 就能触发提前编写好的脚本。

## Github Actions

Github Actions 是基于 Github 的持续集成服务。其提供一台虚拟服务器实例，在该实例中允许通过自定义 Actions 执行一个或多个命令，以自动地操作代码、构建代码、测试代码、打包代码、发布代码、部署代码、登录远程 服务器等。

### 概念术语

一个完整的 Actions 由以下部分组成：

1. workflow ：工作流程，一个完整且单独运行的持续集成服务
1. job ：任务，一个或多个 job 组成一个 workflow ，一次持续集成服务的运行可完成一个或多个任务
1. step ：步骤，一个或多个 step 组成一个 job ，一个任务的运行由一个或多个步骤根据顺序完成
1. action ：动作，一个或多个 action 组成一个 step ，一个步骤的运行由一个或多个动作根据顺序执行

### 配置文件

Github Actions 的配置文件是 workflow 文件，必须存放到 `.github/workflows` 目录下，并以 `<name>.yml` 形式命名。

workflow 文件可以创建多个，文件名称可以根据集成服务的功能任意命名，但后缀必须使用 `.yml` 。

当提交代码到 github 仓库，只要发现 `.github/workflows/<name>.yml` 文件，就会自动挨个文件执行，直至处理完毕所有集成服务。

配置文件的常见字段：

> name ，工作名称，若不设置，则默认为 workflow 文件的文件名称。若手动完成一个工作流程，会根据顺序执行 checkout 检出、build 构建、deploy 部署，工作名称会合并简称为 CBD 。

```yaml
name: CBD # 工作名称
```

> on ，触发事件，上述提到的 Webhooks 可定义一个或多个 Webhooks ，通常是 push 与 pull_request 。Webhooks 要指定操作的分支，通常是 main 。

```yaml
on: # 触发事件：在 push 到 main 分支后
  push:
    branches:
      - main
```

> jobs ，任务列表，使用对象表示，对象属性表示任务名称，会在 Actions 的执行过程中显示。

1. name ：任务名称
1. runs-on ：虚拟机环境，可选 `ubuntu-latest` 、`windows-latest` 、`macos-latest`
1. needs ：执行任务的依赖顺序
1. steps ：执行步骤，每个任务可将需执行的内容划分为不同步骤
   1. name ：步骤名称
   1. uses ：官方与第三方 Actions
   1. with ：Actions 的入参
   1. run ：执行命令
   1. env ：环境变量

```yaml
jobs: # 任务
  cbd: # 任务 ID
    name: doc cbd # 任务名称
    runs-on: ubuntu-latest # 虚拟机环境
    steps: # 执行步骤
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
      # 打包文件
      - name: Build
        run: yarn && yarn run deploy
        env:
          AUTHOR: Lo
          AGE: 26
          SEX: male
      - ...
```

## 部署

### Github Token 与 Actions Secret

1. 创建 Github Token ，Github 右上角的 settings -> Developer settings -> Personal access tokens -> generate new token
1. 填写备注、选择作用域、妥善保管
1. 创建 Actions Secret

   1. 打开项目仓库地址，settings -> Secrets -> Actions -> New repository secret
   1. 填写备注信息、填写 Github Token
   1. Add Secret

在配置文件中可通过 secrets.xxx 读取，`xxx` 为备注信息 Name 的秘钥名称

### 配置文件

```yaml
name: CBD
on:
  push:
    branches:
      - main
jobs:
  cbd:
    name: doc cbd
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Build
        run: yarn && yarn run deploy
      - name: DeployGP
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
      - name: DeployECS
      - uses: easingthemes/ssh-deploy@v2
      - env:
          ARGS: -avz --delete
          SSH_PRIVATE_KEY: ${{ secrets.ECS_PRIVATE_KEY }}
          REMOTE_HOST: ${{ secrets.ECS_SERVER_HOST }}
          REMOTE_USER: ${{ secrets.ECS_REMOTE_USER }}
          SOURCE: dist
          TARGET: /www/static/doc/bruce
```

整个 CI 操作只有一个任务 cbd ，cbd 由以下步骤组成：

1. Checkout ：检出代码，使仓库代码保持最新状态
1. Build ：打包文件，先执行 yarn 安装依赖，再执行 yarn run deploy 打包文件
1. DeployGP ：部署文件到 Gihtub pages
1. DeployECS ：部署文件到服务器

[checkout](https://github.com/actions/checkout) 是一个官方 action ，用于自动检出最新代码

[actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) 是一个第三方 action ，用于自动部署代码到 Github Pages 。

[ssh-deploy](https://github.com/easingthemes/ssh-deploy) 是一个第三方 action ，用于自动部署代码到服务器。
