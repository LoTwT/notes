# ln

## ln: hard link

`ln`，在两个文件间创建连接，默认为硬链接。

```bash
# 创建一个硬链接 package.hard.json
$ ln package.json package.hard.json

# 此时 stat 查看 package.json，其 Links 为 2
$ stat package.json
  File: package.json
  Size: 7419            Blocks: 16         IO Block: 4096   regular file
Device: fd01h/64769d    Inode: 657204      Links: 2
Access: (0644/-rw-r--r--)  Uid: ( 1000/ shanyue)   Gid: ( 1000/ shanyue)
Access: 2022-06-14 20:07:05.182595637 +0800
Modify: 2022-06-14 20:07:02.337546644 +0800
Change: 2022-06-18 21:19:50.885983756 +0800
 Birth: 2022-06-14 19:10:22.779976895 +0800

 # 此时 stat 查看 package.hard.json，其 Links 为 2，与源文件具有相同的 Inode
$ stat package.hard.json
  File: package.hard.json
  Size: 7419            Blocks: 16         IO Block: 4096   regular file
Device: fd01h/64769d    Inode: 657204      Links: 2
Access: (0644/-rw-r--r--)  Uid: ( 1000/ shanyue)   Gid: ( 1000/ shanyue)
Access: 2022-06-14 20:07:05.182595637 +0800
Modify: 2022-06-14 20:07:02.337546644 +0800
Change: 2022-06-18 21:19:50.885983756 +0800
 Birth: 2022-06-14 19:10:22.779976895 +0800
```

在 stat 命令中，可发现硬链接文件与源文件：

- 其 `Links` 变成了 2，`Links` 代表硬链接的个数
- 具有相同的 Inode : 657204
- 具有相同的 Size 及属性

在前端使用了 pnpm 作为包管理工具的项目中，硬链接到处存在。

```bash
# 以下操作在 React 源码目录中进行操作
# 进入 React 源码目录，通过 pnpm i 进行装包

# 使用 pnpm 作为前端依赖的项目中的硬链接
$ stat node_modules/.pnpm/react@17.0.2/node_modules/react/package.json
  File: 'node_modules/.pnpm/react@17.0.2/node_modules/react/package.json'
  Size: 777             Blocks: 8          IO Block: 4096   regular file
Device: fd01h/64769d    Inode: 2680331     Links: 2
Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2022-06-22 17:47:53.434715185 +0800
Modify: 2022-06-22 17:47:09.079634810 +0800
Change: 2022-06-22 17:47:51.534626066 +0800
 Birth: -
```

:::info
Q : 在上述 pnpm 硬链接的示例中，如何找到该 package.json 在 pnpm 全局目录 `~/.pnpm-store` 的位置？

Tip : 请参考 [find](./11-find.md) 和 [ag](./12-ag.md) 命令
:::

## ln -s : symbol link

`ln -s` : 在两个文件间创建符号链接，符号链接也被称为软链接。

```bash
# 创建一个软链接
$ ln -s README.md README.soft.md

# 此时使用 stat 查看源文件
$ stat README.md
  File: README.md
  Size: 5201            Blocks: 16         IO Block: 4096   regular file
Device: fd01h/64769d    Inode: 657197      Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/ shanyue)   Gid: ( 1000/ shanyue)
Access: 2022-06-18 21:02:40.466278536 +0800
Modify: 2022-06-17 11:29:45.580831556 +0800
Change: 2022-06-18 21:02:36.238205891 +0800
 Birth: 2022-06-14 19:10:22.779976895 +0800

# 此时使用 stat 查看时，发现其变为了一个 symbolic link
$ stat README.soft.md
  File: README.soft.md -> README.md
  Size: 9               Blocks: 0          IO Block: 4096   symbolic link
Device: fd01h/64769d    Inode: 666151      Links: 1
Access: (0777/lrwxrwxrwx)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2022-06-22 18:37:57.957044230 +0800
Modify: 2022-06-22 18:37:56.123012505 +0800
Change: 2022-06-22 18:37:56.123012505 +0800
 Birth: 2022-06-22 18:37:56.123012505 +0800 ln -s Readme.md Readme.hard.md
```

使用 [stat](./4-stat.md) 命令，可发现软链接文件与源文件

- 完全不同的 Inode ，证明是两个独立的文件
- 完全不同的 Size 及属性
- 在软链接文件中拥有 synbol link 标志

其中，软链接文件的 Size 为 9，实际上是它所指向的文件名的字节数。

软链接应用场景

- 在前端中，`npm link` 为 `node_modules` 中的某个 package 创建软链接至源码目录，方便调试
- 在前端中，`node_modules` 中某个 package 的 `package.json`中的 `bin` 字段所指向的文件，会软链接至 `node_modules/.bin` 目录
- 在前端中，`npm i -g` 将某个 package 的 `bin` 字段所指向文件，软链接到 `$PATH` 目录下
