# 服务

## 云服务器

云服务器又叫云主机或云计算服务器，简称 ECS ，是指简单高效、安全可靠、处理能力可弹性伸缩的计算服务。其管理方式比物理服务器更简单更高效，用户无需提前购买硬件就能迅速创建或释放任意多台云服务器。

云服务器可帮助开发者快速构建更稳定、更安全的应用，降低开发与运维的整体难度与整体成本。

云服务器的出现简化了整个前端工程化的流程，让开发者可以专注于核心业务的创新，以更小的成本接触前端开发外的更多领域。

### 选购

阿里云 > 腾讯云 > 华为云 > 其他

### 操作

工具准备，CMD 工具 ( 命令行工具 ) 和 FTP 工具 ( 文件传输工具 ) 。

Windows 选择 Cmder 和 FinalShell 。

我当前使用的是 VS Code SSH 和 WinSCP

```bash
# 登录服务器
# root 实例用户名
# aaa.bbb.ccc.ddd 实例公有 IP
ssh root@aaa.bbb.ccc.ddd

# 查看系统信息
lsb_release -a

# 断开实例
exit

# 连接服务器次数过多，可能需要如下操作
# 删除实例公有 IP 在 known_hosts 中的记录
ssh-keygen -R aaa.bbb.ccc.ddd

# 重命名主机名
hostname # 查看主机名
vim /etc/hostname # 修改主机名
shutdown -r now # 重启实例让新主机名生效
```

### 管理

`yum` 是在 Fedora 、RedHat 、CentOS 中的 Shell 软件包管理器。它基于 RPM 包管理，可从指定的服务器自动安装 RPM 包，可自动处理依赖性关系并一次性地安装所有依赖的软件包。

常用命令：

| 命令                  | 功能     |
| --------------------- | -------- |
| `yum install <pkg>`   | 安装     |
| `yum remove <pkg>`    | 卸载     |
| `yum upgrade <pkg>`   | 升级     |
| `yum downgrade <pkg>` | 降级     |
| `yum search <pkg>`    | 搜索     |
| `yum reinstall <pkg>` | 重装     |
| `yum list <pkg>`      | 罗列     |
| `yum info <pkg>`      | 信息     |
| `yum clean <pkg>`     | 清理缓存 |

## 域名

域名系统简称 DNS ，指一个将域名与 IP 地址相互映射的分布式数据库。DNS 使用 TCP 与 UDP 端口 53 ，对于每一级域名长度的限制是 63 个字符，域名总长度不能超过 253 个字符。

域名解析流程

1. 浏览器缓存：浏览器首先会在自身缓存中查找是否有该域名对应 IP 地址，命中则解析结束
1. 系统缓存：当浏览器缓存未命中该域名，则会自动检查用户计算机系统 Hosts 文件的 DNS 缓存中查找是否有该域名对应 IP 地址
1. 路由器缓存：当浏览器缓存与系统缓存都未命中该域名，则进入路由器缓存中检查 DNS 缓存中查找是否有该域名对应 IP 地址
1. 本地域名服务器：上述都未命中该域名，则请求本地域名服务器解析该域名。这台服务器一般在当前城市的某个角落，距离不会很远且性能良好，一般都会缓存域名解析结果，大约 80% 的域名解析到这里就完成了。
1. 根域名服务器：上述都未命中该域名，则请求根域名服务器解析该域名。收到请求后会查找区域文件记录，若无则将其管辖范围内顶级域名服务器的 IP 地址告知本地域名服务器

::: tip
全球仅有 13 台根域名服务器，1 台主根域名服务器，12 台辅根域名服务器
:::

1. 顶级域名服务器：本地域名服务器会发送请求给上一步返回的顶级域名服务器，顶级域名服务器收到请求后查找区域文件记录，若无则将其管辖范围内主域名服务器的 IP 地址告诉本地域名服务器
1. 主域名服务器：本地域名服务器会继续发送请求给上一步返回的主域名服务器，主域名服务器收到请求后查找自己的缓存，若无则返回相关下一级域名服务器的 IP 地址并重复该步骤直到找到正确记录
1. 保存结果到缓存：本地域名服务器把返回的结果保存到缓存中以备下一次使用，同时将该结果反馈给客户端，客户端通过该 IP 地址与 Web 服务器建立连接

域名记录由以下主要配置组成

- 记录类型：指向某个解析地址
- A：将域名指向一个 IPV4 地址
- CNAME：将域名指向另外一个域名
- AAAA：将域名指向一个 IPV6 地址
- NS：将子域名指向其他 DNS 服务器
- MX：将域名指向邮件服务器地址
- SRV：记录提供指定服务的服务器
- TXT：文本长度限制 512 ，通常做 SPF 记录
- CAA：CA 证书颁发机构授权校验
- 主机记录：域名形式
  - `@`：直接解析主域名 `xyz.com`
  - `*`：泛解析，匹配其他所有域名 `*.xyz.com`
  - `www`：将域名解析为 `www.xyz.com`
  - 二级域名：在域名前添加前缀，将域名解析为二级域名，如 abc.xyz.com
- 记录值：填写服务器公有 IP

## 站服务器

站服务器又叫 Web 服务器或者网站服务器，简称 WS 。站服务器的主要是向客户端提供文档服务，只要是遵循 HTTP 设计的网络应用程序都可以被认为是站服务器。

### 工作原理

1. 用户在地址栏中输入网址并按下回车键
1. 客户端与服务端建立 TCP 连接
1. 客户端将用户行为根据 HTTP 格式打包成数据包
1. 服务端接收到数据包后，以 HTTP 格式解析并获取客户端意图
1. 客户端确认服务端可写，将数据包通过因特网递交到服务端
1. 服务端获取客户端意图后，将数据包分类处理并返回处理结果
1. 服务端将处理结果装入缓冲区
1. 服务端将处理结果根据 HTTP 格式打包成数据包
1. 服务端确定客户端可写，将数据包通过因特网递交到客户端
1. 客户端接收到数据包后，以 HTTP 格式解析并获取处理结果
1. 客户端处理相关数据并展示在页面上

这是一个简单的网络通信过程，也就是发送数据、接收数据、处理数据的过程。

站服务器的工作原理和 HTTP 服务器类似。

HTTP 服务器是建立在 HTTP 上用于提供文档浏览的服务器，更多的是提供静态文件的浏览功能，而站服务器不仅能存储文档，还能在用户通过客户端提供信息的基础上运行其他脚本。

常见的站服务器有 Nginx 、Apache 、Tomcat 、IIS 。推荐用 Nginx 。

### Nginx

Nginx 具备反向代理、负载均衡、缓存服务、热部署等功能，几乎可以做到 7 \* 24 小时不间断运行。

Nginx 主打高性能，其占用内存少、并发能力强、能支持高达 50000 个并发连接数。

创建高版本的 Nginx 源：

```bash
vim /etc/yum.repos.d/nginx.repo
```

加入以下内容：

```bash
[nginx-stable]
name=nginx stable repo
baseurl=https://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=https://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```

```bash
# 查看新版本的 Nginx
yum info nginx

# 安装 Nginx
yum install nginx
```

大部分 Nginx 配置文件会放在 `/etc/nginx` 中，虽然配置文件众多，但只需关注 `/etc/nginx/conf.d` 文件夹，该文件夹用于存放用户自定义的自配置文件。

主配置 `nginx.conf` 文件中有一行 `include /etc/nginx/conf.d/*.conf` ，作用是当 Nginx 运行时，主配置文件会默认加载 `/etc/nginx/conf.d` 文件中的所有子配置文件。

#### 操作

| 命令              | 功能     |
| ----------------- | -------- |
| nginx             | 启动进程 |
| nginx -t          | 验证配置 |
| nginx -s reload   | 重启进程 |
| nginx -s stop     | 杀掉进程 |
| ps -ef grep nginx |          |

#### 语法

Nginx 主配置文件是 `/etc/nginx/nginx.conf` ，主体结构：

```bash
main        # 全局配置
├── events  # 配置影响：nginx服务器与用户的网络连接
├── http    # 配置功能：代理、缓存、日志等功能
│   ├── upstream # 配置后端地址：负载均衡不可或缺的部分
│   ├── server   # 配置虚拟主机：一个http块可包括多个server块
│   ├── server
│   │   ├── location  # server块可包括多个location块，location块指令用于匹配URI
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...
```

- 配置文件由`指令`与`指令块`组成
- 指令以`分号`结尾，指令与参数以`空格`分隔
- 指令块以`大括号`将多条指令组织在一起
- 使用 `$` 表示变量，提高复用性
- 使用 `#` 添加注释，提高可读性
- 部分指令的参数支持正则表达式
- `include` 语句允许组合多个配置文件以提升可维护性

#### Firewalld

Nginx 启动后，若 CentOS 开启了防火墙，需要加入开放的端口，让网站正常访问。

CentOS 默认安装了 Firewalld ，可操作 Firewalld 控制指定端口是否开放。

Firewalld 的基本使用可通过 Systemctl 管理。Systemctl 是 CentOS 主要的服务管理工具，它融合 Service 和 Chkconfig 的功能于一体。

操作命令：

| 命令                        | 功能           |
| --------------------------- | -------------- |
| systemctl start firewalld   | 开启防火墙     |
| systemctl stop firewalld    | 关闭防火墙     |
| systemctl status firewalld  | 查看防火墙状态 |
| systemctl disable firewalld | 开机禁用防火墙 |
| systemctl enable firewalld  | 开机启用防火墙 |

以开放 9999 端口为例

- 查看防火墙版本，确保防火墙已安装：firewall-cmd --version
- 查看防火墙状态，确保防火墙已开启：firewall-cmd --state
- 查看所有打开的端口，若端口已开放则无需继续执行命令：firewall-cmd --zone=public --list-ports
- 开放指定端口：firewall-cmd --zone=public --add-port=9999/tcp --permanent
- 重载防火墙配置：firewall-cmd --reload
- 查看指定端口是否已开放：firewall-cmd --zone=public --query-port=9999/tcp
- 删除指定端口：firewall-cmd --zone=public --remove-port=9999/tcp --permanent

:::tip
开放指定端口时追加 `--permanent` 表示开放端口永久生效，无该参数则重启防火墙会失效。
:::

#### 个人官网

根目录创建 `www` 文件夹，其中新建 `server` 和 `client` 存放源码。

在 `/etc/nginx/conf.d` 文件夹中创建 `域名.conf` 文件，执行 `vim /etc/nginx/conf.d/域名.conf` ，添加以下内容

```conf
server {
	listen 80;
	server_name 域名 www.域名;
	location / {
		root /www/client;
		index index.html;
	}
}
```

- 前往云服务器官网进行安全组配置，添加 80 端口。
- 执行 `nginx -t` 验证 Nginx 配置
- 执行 `nginx -s reload` 重启 Nginx 进程
- 访问域名

#### 域名映射

配置一个静态资源二级域名 `static.aaa.bbb`

- 在 `www` 文件夹下创建 `static` 文件夹，该文件夹用于存放域名中的所有静态资源。
- 在 `/etc/nginx/conf.d` 文件夹中创建 `static.aaa.bbb.conf` 文件，执行 `vim /etc/nginx/conf.d/static.aaa.bbb.conf` 加入以下内容

  ```conf
  server {
  	listen 80;
  	server_name static.aaa.bbb;
  	location / {
  		root /www/static;
  		index index.html;
  	}
  }
  ```

- 在 `/www/static` 文件夹中创建 `index.html` 文件，随便编辑一些代码
- 执行 `nginx -t` 验证 Nginx 配置
- 执行 `nginx -s reload` 重启 Nginx 进程
- 访问 `static.aaa.bbb` 即可

#### 跨域问题

产生跨域问题时，可通过配置 Nginx 解决该问题。

如 `x.aaa.bbb` 访问 `y.aaa.bbb` ，配置 Nginx 的 header 解决跨域问题

```conf
server {
	listen 80;
	server_name y.aaa.bbb;
	# 新增部分-开始
	add_header "Access-Control-Allow-Origin" $http_origin; # 当前请求域名，不支持携带Cookie的请求
	add_header "Access-Control-Allow-Credentials" "true"; # 请求可携带Cookie
	add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS"; # 允许的请求方式
	add_header "Access-Control-Allow-Headers" $http_access_control_request_headers; # 允许的请求Header，可配置为*
	add_header "Access-Control-Expose-Headers" "Content-Length,Content-Range";
	if ($request_method = "OPTIONS") {
		add_header "Access-Control-Max-Age" 18000000; # 请求的有效期：在有效期内无需发出另一条预检请求
		add_header "Content-Length" 0;
		add_header "Content-Type" "text/plain; charset=utf-8";
	}
	# 新增部分-结束
	location / {
		root /www/static; # 改为对应的路径
		index index.html;
	}
}
```

#### 动静分离

动静分离的两种方案

1. 将静态资源放置到独立的二级域名下
1. 动态跟静态资源混合发布，通过 Nginx 配置区分

如果使用 Nginx 配置动静分离就无需使用二级域名了

```conf
server {
	listen 80;
	location / {
		root /www/client; # 存放动态资源(Web应用)
		index index.html;
	}
	location /static/ {
		root /www/staic; # 存放静态资源
		autoindex on; # 开启资源目录
	}
}
```

- 执行 `nginx -t` 验证 Nginx 配置
- 执行 `nginx -s reload` 重启 Nginx 进程

#### 反向代理

反向代理常用于处理跨域问题：

1. 将请求转发到本机的另一个服务上
1. 根据访问路径跳转到不同端口的服务上

创建一个二级域名 `api.aaa.bbb` 用于管理接口，在服务器的 9999 端口运行一个接口系统。

将两者关联在一起，即在客户端中通过 `api.aaa.bbb` 访问到服务端中 `127.0.0.1:9999` 的接口功能

在 `/etc/nginx/conf.d` 文件夹中创建 `api.aaa.bbb.conf` 文件，执行 `vim /etc/nginx/conf.d/api.aaa.bbb.conf` 加入以下内容

```conf
server {
	listen 80;
	server_name api.aaa.bbb;
	location / {
		proxy_pass http://127.0.0.1:9999;
	}
}
```

- 执行 `nginx -t` 验证 Nginx 配置
- 执行 `nginx -s reload` 重启 Nginx 进程

#### 负载均衡

负载均衡的主要思想是把负载均匀合理地分发到多个服务器上，实现压力分流。

Nginx 提供四种负载均衡的方式，默认为**轮询**：

1. 轮询：无需配置，每个请求根据时间顺序逐一分配到不同服务器，若其中一个服务挂了会自动被剔除
1. weight：根据权重分配，指定每个服务器的轮询几率，权重越高其被访问的概率越大，可解决服务器性能不均的问题
1. ip_hash：根据访问 IP 的 Hash 结果分配，每个访客固定访问一个服务器，可解决动态网页 Session 共享的问题
1. fair：根据服务器响应时间分配，响应时间短的服务器会优先分配，需安装 `nginx-upstream-fair`

```conf
http {
	upstream api.aaa.bbb {
		# ip_hash; # IpHash方式
		# fair; # Fair方式
		server 127.0.0.1:9999; # 负载均衡目的服务地址：可设置多个服务器
		server 127.0.0.1:8888;
		server 127.0.0.1:7777 weight=10; # 配置权重：不配置默认为1
	}
	server {
		location / {
			proxy_pass api.aaa.bbb;
			proxy_connect_timeout 10;
		}
	}
}
```

## 访问加密

使用 HTTPS 为 HTTP 保温提供加密传输通道，这样攻击者就无法窃听或篡改传输内容。

免费好用的 HTTPS 证书服务商 [Letsencrypt](https://letsencrypt.org/) 。

### 部署安装

Letsencrypt 提供了 certbot 工具，它可以快速生成或刷新 HTTPS 证书，CentOS8 的 yum 不包含 certbot 源，考虑用 dnf 代替 yum 安装 certbot 。

CentOS8 内置了 dnf ，它也是一个 Shell 软件包管理器

```bash
dnf --version

# 新增 epel 源
dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm

# 更新 dnf 仓库
dnf upgrade

# 安装 snap
dnf install snapd -y

# 设置开机自启
systemctl enable --now snapd.socket

# 设计软连接，通过 snapd 快速调用命令
ln -s /var/lib/snapd/snap /snap

# 更新快照
snap install core
snap refresh core

# 安装 certbot
snap install --classic certbot

# 设置软连接，通过 certbot 快速调用命令
ln -s /snap/bin/certbot /usr/bin/certbot
```

### 配置

```bash
# 查看 certbot 是否安装成功
certbot --version

# 扫描 Nginx 所有配置
certbot --nginx
```

Nginx 配置示例：

```txt
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Enter email address (used for urgent renewal and security notices)
 (Enter 'c' to cancel): young.joway@aliyun.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing, once your first certificate is successfully issued, to
share your email address with the Electronic Frontier Foundation, a founding
partner of the Let's Encrypt project and the non-profit organization that
develops Certbot? We'd like to send you email about our work encrypting the web,
EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: n
Account registered.

Which names would you like to activate HTTPS for?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: yangzw.vip
2: www.yangzw.vip
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel): 1,2
Requesting a certificate for yangzw.vip and www.yangzw.vip

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/yangzw.vip/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/yangzw.vip/privkey.pem
This certificate expires on 2022-05-23.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for yangzw.vip to /etc/nginx/conf.d/yangzw.vip.conf
Successfully deployed certificate for www.yangzw.vip to /etc/nginx/conf.d/yangzw.vip.conf
Congratulations! You have successfully enabled HTTPS on https://yangzw.vip and https://www.yangzw.vip
```

流程解析

1. 输入电子邮箱，用于紧急续签和安全通知
1. 是否同意服务条款，y
1. 是否接收新闻邮件，n
1. 注册账户成功，自动处理，耐心等待
1. 选择需要激活 HTTPS 协议的域名，根据列表输入数字，以空格或英文逗号分隔
1. 申请证书服务，自动处理，耐心等待

最终证书生成到 `/etc/letsencrypt/live/域名` 文件夹下。

证书有效期为三个月，三个月后不续签就将自动失效。

配置了 certbot 开机自启，这些文件将在证书续订时自动更新。

### 解读

certbot 对 Nginx 配置文件进行了修改，执行 `im /etc/nginx/conf.d/域名.conf` 查看，后方有 `# managed by Certbot` 注释都是由 certbot 生成。

```bash
server {
	server_name yangzw.vip www.yangzw.vip;
	location / {
		root /www/client/yangzw;
		index index.html;
	}
	listen 443 ssl; # managed by Certbot
	include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
	ssl_certificate /etc/letsencrypt/live/yangzw.vip/fullchain.pem; # managed by Certbot
	ssl_certificate_key /etc/letsencrypt/live/yangzw.vip/privkey.pem; # managed by Certbot
	ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
	if ($host = www.yangzw.vip) {
		return 301 https://$host$request_uri;
	} # managed by Certbot
	if ($host = yangzw.vip) {
		return 301 https://$host$request_uri;
	} # managed by Certbot
	listen 80;
	server_name yangzw.vip www.yangzw.vip;
	return 404; # managed by Certbot
}
```

#### 修改端口

端口从原来的 80 变成 443 并从第一个 server 块移动到第二个 server 块中，都由 certbot 生成。

#### 导入证书

使用以下命令，告知 Nginx 使用 HTTPS 协议，通过绝对路径导入证书文件

```bash
ssl_certificate /etc/letsencrypt/live/域名/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/域名/privkey.pem;
```

#### 重定向

邢增两个 `if ($host = xyz) {}` 的判断，当使用非 HTTPS 协议访问域名时，直接 301 重定向到 `https://$host$request_uri` ，其他情况则 404 。

### 总结

certbot 会根据选择的域名自动匹配出对应 nginx conf 文件并对上述三部分修改，所以每次新增一个网站都需要单独创建 `xyz.conf` 到 `conf.d` 文件夹中，目的是为了隔离开每个网站的 Nginx 配置。

每次新开端口需要配置安全组，新增 443 端口。

通过 [SslTest](https://www.ssllabs.com/ssltest) 或 [slChecker](https://www.sslshopper.com/ssl-checker.html) ，输入域名检查证书是否有效。

## 资源加速

利用 CDN 加速静态资源，配合内容分发网络打造一个低成本网站静态资源服务，减轻静态资源的请求压力，同时在访问网站时提升静态资源的加载速度。

### 背景

缓存策略在资源访问时能够发挥很大作用，通过预设策略可将流量降到理想范围内。

缓存策略又叫浏览器策略，指浏览器采用最优方式访问资源，以降低访问成本与提升访问速度。

缓存策略是接入成本最低的性能优化策略，其显著减少网络传输带来的损耗，提升网页访问速度，是一种非常值得使用的性能优化策略。

### 缓存机制

为了让缓存策略发挥最大作用，需要让它尽量遵循以下五点

1. 考虑拒绝一切缓存策略：Cache-control:no-store
1. 考虑资源是否每次向服务器请求：Cache-Control:no-cache
1. 考虑资源是否被代理服务器缓存：Cache-Control:public/private
1. 考虑资源过期时间：Expires:t/Cache-Control:max-age=t,s-maxage=t
1. 考虑协商缓存：Last-Modified/Etag

### 缓存策略

缓存策略通过设置 HTTP 报文实现，在形式上分为强缓存 ( 强制缓存 ) 与协商缓存 ( 对比缓存 ) 。

![](/engineering/force-cache.jpg)
![](/engineering/http-cache.jpg)

缓存机制，先走强缓存，若命中失败才走协商缓存。若命中强缓存，直接使用强缓存；若未命中强缓存，发送请求到服务器检查是否命中协商缓存；若命中协商缓存，服务器返回 304 通知浏览器使用本地缓存，否则返回最新资源。

以下两种场景建议使用缓存策略

- 频繁变动的静态资源：设置 Cache-Control:no-cache 并走协商缓存，每次访问都发送请求到服务器，配合 Last-Modified/ETag 验证资源的有效性
- 不常变化的静态资源：设置 Cache-Control:max-age=31536000 走强缓存，哈希处理文件名称 ( 代码修改后生成带有 hash 的文件名称 ) ，当 html 文件名称发生改变就下载最新文件

### CDN

大型网站对速度的追求并未止步于仅仅利用缓存策略，因为缓存策略始终只是为了优化资源访问路径提升二次访问速度。对于首次访问速度需从网络层面优化，最常见手段就是内容分发网络加速。通过将静态资源缓存到离用户很近的相同网络运营商的内容分发网络节点上，不但能提升用户访问速度，还能节省服务带宽消耗。

内容分发网络简称 CDN ，指一组分布在各地，存储数据副本并可根据就近原则满足数据请求的服务器。其核心是缓存和回源，缓存是把资源复制到 CDN 服务器中，回源是资源过期或资源不存在就向上层服务器请求并复制到 CDN 服务器中。

CDN 通过不断地缓存与回源形成一个个网络拓扑图，降低网络拥塞，提升用户访问的响应速度与命中率，其意义在于构建在现有网络基础上的智能虚拟网络，依靠部署在各地服务器，通过中心平台的调度、负载均衡、内容分发等功能模块，使用户就近获取所需资源。

#### 原理

CDN 的工作原理是将源站的资源缓存到各个 CDN 节点上，当请求命中某个节点的资源缓存时，立即将资源返回到客户端，避免每个请求都通过源站获取。

#### 过程

通过 CDN 访问一张图片经历一下过程：

1. 用户请求静态资源 URL ，经过本地 DNF 解析，若 LDNS 命中则直接返回静态资源
1. 若 LDNS 未命中则转发授权 DNS 查询
1. 返回域名 CNAME 对应 IP 地址
1. 解析域名并发送请求到 DNS 调度系统，系统为请求分配最佳节点对应 IP 地址
1. 返回解析完毕的 IP 地址
1. 用户发送请求到缓存服务器
1. 缓存服务器响应用户请求并将用户所需内容发送到客户端

#### 部署

建议选购云服务商现成的 CDN 服务，或选用 jsdeliver 、unpkg 等免费的 CDN 服务。

阿里云服务器控制台 -> CDN -> 域名管理中进行配置。

域名信息：

1. 加速域名：填写域名 static.aaa.bbb
1. 业务类型
1. 加速区域
1. 资源分组：default resource group

也可以使用泛域名，使用泛域名的好处是将 `*.aaa.bbb` 解析到 CDN 生成的 CNAME 域名时，所有该泛域名的次级域名都可用 `*.aaa.bbb` 的 CNAME 加速。

新增站源信息：

1. 站源信息：选择 IP ，填写服务器公有 IP
1. 优先级：选择主
1. 权重：填写 10
1. 端口：填写 443 ，后续会使用 HTTPS 证书配置 CDN 服务

#### 配置证书

- 登录服务器
- certbot --nginx
- 选择二级域名
- 配置静态资源二级域名的 HTTPS 证书
- 下载 `/etc/letsencrypt/live/域名` 的证书文件

#### 解析域名

- 到云服务商的域名解析中，将记录类型变更为 CNAME，记录值变更为复制 CNAME 记录值。配置 CDN 加速静态资源后，访问二级域名会先跳转到对应 CDN 域名，再跳转到对应服务器上，所以解析域名无需配置记录类型为 A 的数据。
- 添加 HTTPS 证书相关文件
