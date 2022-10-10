# stat

<details>
  <summary>在 MacOS 中，stat 用法与 Linux 有差异。</summary>
  <div>在 macOS 中学习 Linux 命令有不少坑，比如 sed 等命令。</div>
  <div>在 macOS 中实际上为 BSD Unix 的衍生版本。</div>
  <div>在 Linux 中，实际上是 GNU / Linux 系统。</div>
      
  <a href="https://cotes.page/posts/use-gnu-utilities-in-mac/" target="_blank">macOS 使用 GNU 命令</a>
    
</details>

## stat

`stat` ，查看文件系统信息。无论对于命令行操作，还是对于后端开发者，甚至在前端工程化领域，都是非常重要的命令或操作系统 API 。

```bash
$ stat README.md
File: README.md
Size: 5201            Blocks: 16         IO Block: 4096   regular file
Device: fd01h/64769d    Inode: 657197      Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/ shanyue)   Gid: ( 1000/ shanyue)
Access: 2022-06-17 10:45:18.954000816 +0800
Modify: 2022-06-17 11:29:45.580831556 +0800
Change: 2022-06-17 12:24:25.276142164 +0800
Birth: 2022-06-14 19:10:22.779976895 +0800
```

重要属性 :

- `regular file` : 普通文件
- `Size` : 文件体积
- `Inode` : 每个文件的 Inode 编号，Inode 在分区内具有唯一性
- `Links` : 文件硬链接个数，为 2，代表有两个相同 Inode 的文件 ( 默认为 1 ，代表没有硬链接 )
- `Access Mode` : mode，文件访问模式或权限
- `Uid / Gid` : owner，文件所属用户与组 ID
- `Access` : atime，文件访问时间
- `Modify` : mtime，文件内容修改时间 ( 在 HTTP 服务器中，常以此作为 last-modified 响应头 )
- `Change` : ctime，文件修改时间 ( 包括属性，比如 mode 和 owner，也包括 mtime，因此 ctime 总比 mtime 大 )
- `Birth` : 某些操作系统其值为 `-`

每个字段的详细释义，请查看 [stat](https://www.man7.org/linux/man-pages/man2/stat.2.html#DESCRIPTION)

## stat -c

使用 `stat -c` 可指定文件某个属性进行输出。

```bash
$ stat -c --format=FORMAT
```

有以下格式可选 :

- `%a` access rights in octal
- `%A` access rights in human readable form
- `%f` raw mode in hex
- `%F` file type
- `%g` group ID of owner
- `%G` group name of owner
- `%h` number of hard links
- `%i` inode number
- `%n` file name
- `%s` total size, in bytes
- ...

```bash
$ stat -c "%a" README.md
644

$ stat -c "%F" README.md
regular file

$ stat -c "%A" README.md
-rw-r--r--

$ stat -c "%y" README.md
2022-06-17 12:21:06.028463373 +0800

$ stat -c "%Y" README.md
1655439666
```

## 文件类型

在 Linux 中一切都是文件，可以通过 `stat -c "%F"` 查看文件类型。

Linux 中有六种典型的文件类型，其中 `symbolic link`，即符号链接是一种特殊的文件类型，而硬链接，只是文件的一个属性。

```bash
$ stat -c "%F" README.md
regular file

$ stat -c "%F" node_modules/
directory

$ stat -c "%F" /usr/local/bin/npm
symbolic link

$ stat -c "%F" /dev/null
character special file

$ stat -c "%F" /dev/pts/0
character special file

$ stat -c "%F" /dev/vda
block special file

$ stat -c "%F" /var/run/docker.sock
socket
```

也可以使用 `ls -lah` 查看文件类型，第一个字符表示文件类型 :

- `-` : regular file，普通文件
- `d` : directory，目录文件
- `l` : symbolic link，符号链接
- `s` : socket，套接字文件，一般以 `.sock` 作为后缀 ( 可把 `.sock` 理解为 API，可以像 HTTP 一样对它请求数据 )
- `b` : block special file，块设备文件
- `c` : character special file，字符设备文件

```bash
# 注意首字母为 c，代表字符设备文件
$ ls -lah /dev/null
crw-rw-rw- 1 root root 1, 3 Sep 29  2019 /dev/null

# 在 /dev 目录，能够找到诸多字符设备文件与块设备文件
$ ls -lah /dev
```
