# chmod / chown

## chown

`chown`，change owner 。更改文件的所属用户及组。

通过 `ls` 命令，第三第四列便是文件所属用户及用户组。

```bash
$ ls -lah .
total 1.2M
drwxr-xr-x 11 shanyue shanyue 4.0K Jun 22 18:42 .
drwxr-xr-x  5 root    root    4.0K Jun 24 11:06 ..
drwxr-xr-x  2 shanyue shanyue 4.0K Jun 10 15:45 .circleci
drwxr-xr-x  2 shanyue shanyue 4.0K Jun 10 15:45 .codesandbox
-rw-r--r--  1 shanyue shanyue  294 May 22  2021 .editorconfig
-rw-r--r--  1 shanyue shanyue  759 Jun 10 15:45 .eslintignore
-rw-r--r--  1 shanyue shanyue 8.4K Jun 10 15:45 .eslintrc.js
drwxr-xr-x  7 shanyue shanyue 4.0K Jun 14 19:06 .git
-rw-r--r--  1 shanyue shanyue   12 May 22  2021 .gitattributes
```

通过 `chown -R`，可一并将子文件所属用户及用户组进行修改。

```bash
# 将 . 文件夹下当前目录的用户及用户组设为 shanyue
# -R : 遍历子文件修改
$ chown -R shanyue:shanyue .
```

## EACESS

前端使用 `yarn` 安装依赖时，可能会遇到 `EACCES: permission denied, unlink ...`

```bash
$ yarn

error An unexpected error occurred: "EACCES: permission denied, unlink '/home/train/Documents/react/node_modules/@babel/cli/node_modules/commander/CHANGELOG.md'".
info If you think this is a bug, please open a bug report with the information provided in "/home/train/Documents/react/packages/react/yarn-error.log".
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
```

上述问题的可能原因是：非该文件的所属用户去修改文件内容。比如其中一种可能是，`node_modules` 所属用户应该为 `train` 这个普通用户，但实际上为 `root`，从而导致没有权限。

而实际上，当文件的 owner 及 mode 不匹配时，均会报此错误。如非 root 用户操作 root 用户的文件，对可读文件进行写操作。

```bash
# 此时发现 node_modules 为 root:root，因此导致的问题
$ ls -lah .
drwxr-xr-x  3 root  root  4.0K Jun 27 22:19 node_modules
drwxr-xr-x  2 train train 4.0K Jun 10 15:45 npm
-rw-r--r--  1 train train 1.1K Jun 10 15:45 package.json
drwxr-xr-x  5 train train 4.0K Jun 10 15:45 src

# 此时通过 chown 即可解决问题
$ chown -R train:train node_modules
```

## chmod

`chmod`，change mode。更改文件的读写权限。

`mode` 指 Linux 中对某个文件的访问权限。

通过 `stat` 可获取某个文件的 mode 。

```bash
# -c: --format
# %a: 获得数字的 mode
$ stat -c %a README.md
644

# %A: 获得可读化的 mode
$ stat -c %A README.md
-rw-r--r--
```

文件的权限:

- `r` : 可读，二进制为 100，也就是 4
- `w` : 可写，二进制为 010，也就是 2
- `x` : 可执行，二进制为 001，也就是 1
- `s` : 强制位，在执行阶段拿到所有权限
- `t` : 粘滞位，权限颗粒度更细，只能删除自己创建的文档

而 Linux 为多用户系统，可对用户进行以下分类:

- `user` : 文件当前用户
- `group` : 文件当前用户所属组
- `other` : 其他用户

刚才 `644` 代表的释义:

```bash
# rw- : 当前用户可写可读，110，即十进制 6
# r-- : 当前用户组可读，100，即十进制 4
# r-- : 其他用户可读，100，即十进制 4
# 所以结果是 644
-rw-r--r--
```

通过 `chmod` 与数字所代表的权限，即可修改某个文件的权限。

```bash
# 777，即 rwx、rwx、rwx，代表所有用户可读可写可执行
$ chmod 777 yarn.lock
```

也可以通过可读化形式添加权限，如下所示:

```bash
# u : user
# g : group
# o : other
# a : all
# +-= :: 增加减少复制
# perms : 权限
$ chmod [ugoa...][[+-=][perms...]...]

# 为 yarn.lock 文件的用户所有者添加可读权限
$ chmod u+r yarn.lock

# 为所有用户添加 yarn.lock 的可读权限
$ chmod a+r yarn.lock

# 为所有用户删除 yarn.lock 的可读权限
$ chmod a-r yarn.lock

# 不指定 ugoa 时，默认就是 a
# 以下两个命令操作结果相同
$ chmod +x a.js
$ chmod a+x a.js
```
