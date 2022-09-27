# 用户相关

Linux 为多用户系统，允许多个用户同时登陆。

## whoami

打印当前用户名

```bash
whoami
```

## id

打印当前用户 id 及用户组 id。

在 Linux 中 root 用户为 0 ，第一个用户 id 默认为 1000 ，而在 macOS 中第一个用户默认为 501 。

```bash
id

# -u: --user, 打印 userId
# -n: --name, 打印 userId 对应的用户名
id -un
```

## who

打印出当前有哪些用户在登录状态 ( 进入服务器可理解为登录 )。

```bash
who -H

# root     pts/0        Jun 16 22:28 (172.16.3.2)
# shanyue  pts/1        Jun 16 22:58 (172.16.3.4)
```

以上输出表示：

1. 当前有两个用户登录，一个是 root，一个是 shanyue
1. root IP 地址为 `172.16.3.2`，在 `pts/0` 的 tty 登录

在日常工作中，可使用 `who -uH` 命令

```bash
# -u: 打印出登录用户的 IDLE / PID
# -H: 打印标头
who -uH
```

`IDLE` 表示当前用户已经处于不活跃状态多长时间，`.` 代表当前仍在活跃状态。

## w

一个比 `who -uH` 更好用的，可查看有几人登录的工具。

```bash
w
```

## last

打印出该服务器的历史登录用户。

```bash
# -n: 列出最近 10 次
last -n 10

# root     pts/2        118.73.226.42    Fri Jun 17 09:12   still logged in
# root     pts/1        118.73.226.42    Fri Jun 17 08:29   still logged in
# train    pts/0        118.73.226.42    Fri Jun 17 08:25   still logged in
# train    pts/2        61.149.240.111   Fri Jun 17 00:26 - 00:31  (00:05)
# train    pts/2        61.149.240.111   Thu Jun 16 23:19 - 00:24  (01:04)
# train    pts/1        118.73.121.227   Thu Jun 16 22:58 - 01:32  (02:33)
# train    pts/0        118.73.121.227   Thu Jun 16 22:48 - 01:32  (02:44)
# root     pts/0        118.73.121.227   Thu Jun 16 22:44 - 22:48  (00:03)
# train    pts/1        118.73.121.227   Thu Jun 16 22:40 - 22:44  (00:04)
# root     pts/0        118.73.121.227   Thu Jun 16 22:40 - 22:44  (00:04)

# wtmp begins Mon Feb 14 09:05:39 2022
```

前三行表示，IP 地址在远程服务器上有三个用户，三个 shell 窗口。

分析可知，由于是同一个 IP 地址，所以实际上有可能是同一个人。这代表一个人在终端开了三个 shell 窗口连接了远程服务器。
