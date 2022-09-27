# 目录与切换操作

## cd

`cd`，`change directory`，切换当前工作目录。

除指定目录外，还有以下特殊目录:

- `.`: 当前工作目录
- `..`: 父级工作目录
- `/`: 根目录
- `~`: home 目录，即当前的用户目录，同事也可用环境变量 `$HOME` 表示。假设当前用户为 `ayingott`，则 `~` 目录为 `/Users/ayingott` ( macOS )。

另外，`cd -` 为进入上一次的工作目录，如同 `git checkout -` 切回上次的分支一样。

```bash
cd ~
cd -
cd $HOME
```

除 `cd` 外，有一个拥有强大功能切换目录的小工具 [autojump](https://github.com/wting/autojump)，需要手动下载。

## pwd

`pwd`，`print working directory`，打印当前工作目录。

```bash
# 打印当前路径
pwd
```

## ls

`ls`，列出某个工作目录的内容。

`ls` 单指令不会列出以 `.` 开头的文件，比如 `.git`、`.babelrc`、`.eslintrc` 均不会默认显示。

使用 `ls -a` 列出所有文件。

日常工作中，常使用 `ls -lah` 列出工作目录内容。

```bash
# -l: 使用长列表格式
# -a: 列出所有文件，包括以 . 开头的文件
# -h: 以可读的形式表示文件体积
ls -lah
```

## exa

一个 `ls` 的替代品，拥有更友好的色彩、更丰富的输出，同时支持更丰富的选项。

该命令需要手动下载安装。

```bash
# 支持查看 git 情况
exa -lah --git
```

## tree

`tree`，以树状图的形式列出文件。

该命令需要手动下载安装。( 部分系统 )

```bash
# macOS
brew install tree

# CentOS
yum install tree
```

可通过 `-L` 指定层级，平常工作可使用以下指令

```bash
# -a: 列出所有文件
# -F: 对目录末尾添加 / ，对可执行文件末尾添加 *
# -L: 指定层级
tree packages/react-dom -aF -L 2
```

可以使用 `exa -T` 打印树状文件

```bash
# -T: --tree，以树状图的形式列出文件
# -L: --level，指定层级
exa -lah -T -L 2 packages/react-dom
```

## 问题

1. 使用 tree/exa 列出目录树时，如何忽略 .gitignore 中文件内容？

```bash
tree --gitignore
​
exa -T -L 2 --git-ignore
```
