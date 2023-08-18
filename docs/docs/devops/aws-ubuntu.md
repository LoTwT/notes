# AWS Ubuntu

记录在 aws 上启动 ubuntu 实例的过程。

### 首次登陆

进入 ec2 实例面板

- 点击右上角连接
- 选择 SSH 客户端
- 命令行进入 pem 秘钥目录下，根据提示操作

如果是 Windows 系统，AWS 连接到实例的第三步需要改为

- 我的电脑进入 pem 秘钥目录
- 右键属性
- tab 页选择安全，点击下方高级按钮
- 根据需要更改所有者
- 禁用继承，选删除所有
- 点击添加，选择主体，设置完全控制
- 命令行进入 pem 目录，进行第四步

### 配置 root 用户

```bash
# 设置 root 用户密码
sudo passwd root

# 也可同时设置 ubuntu 用户密码 ( AWS 默认用户 )
sudo passwd ubuntu

# 切换到 root 用户
su root
```

### 修改 ssh 登录方式

```bash
vim /etc/ssh/sshd_config
```

将 `PasswordAuthentication` 改为 `yes` ，`PermitRootLogin` 改为 `yes`

重启 sshd

```bash
sudo /sbin/service sshd restart
```

退出后即可使用 root 登录

### 配置弹性 IP

如果考虑到以后可能发生的各种意外，可以配置一个专门的弹性 IP 关联到实例，防止实例因各种问题导致 IP 改变后需要重新配置。

- 左侧菜单选择弹性 IP
- 点击右上角分配弹性 IP 地址
- 根据提示关联实例即可

配置好后，实例的共有 IPv4 地址将被设置为申请到的弹性 IP 地址，ssh 即可通过该 IP 地址登录。

```bash
ssh root@aaa.bbb.ccc.ddd
```

### 修改主机名

默认主机名比较难以阅读，可以改个喜欢的名字。

```bash
# 查看主机名
hostname

# 修改主机名
vim /etc/hostname

# 重启实例让新主机名生效
shutdown -r now
```

重启实例会强制中断 ssh 连接，并花费一些时间，稍等片刻后重新登录即可。

### 域名解析

- 进入 aws 控制台主页，选择 Route 53
- 左侧选择托管区域，选择要解析的域名
- 创建记录，填写具体规则即可

具体规则请查看 [域名](../toolchain/engineering/services.md#域名) 。

### 安装 node

1. 下载想要的 Linux 版本 node 安装包并用 FTP 工具上传或 `wget https://nodejs.org/dist/v16.15.0/node-v16.15.0-linux-x64.tar.xz`
1. 解压 `tar xf node-v16.15.0-linux-x64.tar.xz`
1. 设置软连接

   ```bash
   ln -s 安装目录/bin/npm   /usr/bin/
   ln -s 安装目录/bin/node   /usr/bin/
   ```

### 安装 pm2

安装完 node 后

```bash
npm i pm2 -g
npm i pm2 --location=global
```

设置软连接

```bash
ln -s node安装目录/lib/node_modules/pm2/bin/pm2   /usr/bin/
```

### 部署 nuxt3 ssr

- 将 `nuxi build` 构建好的代码上传到服务器，默认端口 3000
- 使用 pm2 启动入口文件 `pm2 start 目录/server/index.mjs --name 名字`
- 配置 nginx

  `xxx.yyy` 为域名

  ```bash
  # 添加对应域名配置
  vim /etc/nginx/conf.d/xxx.yyy.conf
  ```

  ```txt
  server {
    listen 80;
    server_name xxx.yyy www.xxx.yyy;
    location / {
      proxy_pass http://127.0.0.1:3000;
    }
  }
  ```

### 访问加密

安装 certbot

AWS Ubuntu 自带了 snap ，直接使用即可；如果没有，请自行安装。

```bash
# 开启自启
systemctl enable --now snapd.socket


snap install core
snap refresh core

# 安装 certbot
snap install --classic certbot

# 软连接
ln -s /snap/bin/certbot /usr/bin/certbot

# 查看版本
certbot --version

# 扫描 nginx 所有配置，对应输入答案
certbot --nginx
```

HTTPS 证书最终生成到 `/etc/letsencrypt/live/aaa.bbb` 目录下。
