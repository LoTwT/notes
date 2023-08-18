# 帮助命令

一般而言，Linux 约定俗成的帮助命令有两个。但是对于这两个命令，不一定都存在。

```bash
$ man <command>

$ <command> --help
```

## man

`man`，`manual` 简写，意为手册，手册实际上存储在系统的 `/usr/share/man` 目录。

```bash
$ man ls

$ man pwd

$ man ssh
```

通过 `man <command>` 后，可通过 [vim move](./vim-move.md) 进行操作，快捷方式：

- `j`：向下移动
- `k`：向上移动
- `q`：退出

## Usage

不管是 `man` 手册，还是 `<command> --help` 命令，都会列出该命令行所有参数的用法。

一个命令的用法 ( Usage ) 通常由以下部分组成：

- `argument`：命令中的参数，一般而言，除了命令本身外，其它的都是参数
- `command`：子命令，如 `git clone` 中的 `clone` 就是子命令
- `option/flag`：选项，使用 `-` 作为前缀的参数 ( argument )，一般以 `--` 前缀接多个字符， `-` 前缀接单个字符，如 `--help` / `-h`
- `option argument`：选项参数，如 `--git-dir=<path>` 中的 `path` 就是选项参数

对可选命令使用 `[ ]` 包裹：

- `[ ]`：可选参数
- `[-v | --version]`：`-v` 或者 `--version` ，是等效的
- `<command>`：子命令

查看 `cat` 命令的帮助文档，多个参数可使用 `[file.. .]`，类似于 `JavaScript` 中的 `...` 扩展运算符

```bash
$ cat [-belnstuv] [file ...]

$ cat a.txt b.txt c.txt ...
```

在某些命令行还支持将多个单字母参数直接拼接

```bash
# 以下两个命令是等价的
$ ls -lah

$ ls -l -a -h
```

[cli 开发指南](https://clig.dev/#output)

## tldr

`man` 手册和 `<command> --help` 命令有可能晦涩难懂，此时可以使用 `tldr` 。

[tldr](https://github.com/tldr-pages/tldr) 是一个 `npm` 命令行工具，`Too Long; Didn't Read` 的简写。

```bash
$ pnpm dlx tldr ls

$ ls

列出目录中的内容。
更多信息：https://www.gnu.org/software/coreutils/ls .

- 列出目录中的文件，每个文件占一行：
  ls -1

- 列出包含隐藏文件的所有文件：
  ls -a

- 列出所有文件，如果是目录，则在目录名后面加上「/」：
  ls -F

- 列出包含隐藏文件的所有文件信息，包括权限，所有者，大小和修改日期：
  ls -la

- 列出所有文件信息，大小用人类可读的单位表示（KiB, MiB, GiB）：
  ls -lh

- 列出所有文件信息，按大小降序排序：
  ls -lS

- 列出所有文件信息，按修改日期从旧到新排序：
  ls -ltr

- 只列出目录：
  ls -d */
```
