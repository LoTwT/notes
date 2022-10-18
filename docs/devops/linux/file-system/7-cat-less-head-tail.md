# cat / less / head / tail

## cat

`cat`，`concatenate` 缩写，`concatenate and print files` 连接文件并打印至标准输出 ( stdout )。

通常使用仅仅是将单文件打印。

```bash
$ cat README.md

# 也可以打印控制字符，比如 Tab、换行等不可见字符
# -v: 打印 <Ctrl-X>
# -e: 打印换行
# -t: 打印 TAB
$ cat -vet README.md

# 打印行号
$ cat -n READEME.md
```

连接多文件进行打印

```bash
$ cat package.json yarn.lock
```

### library : open / read

在打开一个文件，读取内容时，在操作系统底层实际上做了两步操作

- open : `open("package.json")`，并返回文件描述符，即 `file descriptor`，简写 `fd`，一个非负整数，通过文件描述符可用来读写文件
- read : `read(3)`，通过 `fd` 读取文件内容，其中的 3 为文件描述符

> 在 Node.js 中，有一个 API 为 `fs.readFile`，它实际上是 `fs.open` 与 `fs.read` 的结合体

### bat

[bat](https://github.com/sharkdp/bat) 是使用 Rust 编写的 cat 命令的升级版，需要手动安装。

它默认支持语法高亮，以及显示行号。

## less

比 `cat` 更高级更强大的文件内容工具，可使用 vim 命令控制上下移动以及关键词搜索。

```bash
$ less README.md

# 通过 —N 可显示行号
$ less -N README.md
```

## head

`head`，读取文件或者标准输入的前 N 行或前 N 哥字节。

```bash
# 输出文件前 10 行内容
$ head -10 README.md

# 与以上命令同义
$ head --lines 10 READEME.md

# 输出文件前 10 个字节
$ head -c 10 READEME.md
```

## tail

`tail`，读取文件或者标准输入的最后 N 行或最后 N 个字节。

```bash
# 输出文件后 10 行内容
$ tail -10 README.md
```

它与 `head` 最大不同的一点是 : `--follow`，简写为 `-f`。它可以实时打印文件中的最新内容。

在调试日志时非常有用 : 日志一行一行追加到文件中，而 `tail -f` 可以实时打印追加的内容。

```bash
$ tail -f log.json

# 如果为了做实验，可再打开一个窗口通过 >> 重定向追加内容至 log.json，具体查看下一章
$ echo test >> log.json
```
