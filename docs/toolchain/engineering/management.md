# 管理

## 环境管理

Node.js 环境管理，windows 使用 nvm 。

pnpm 的环境管理 `pnpm env --global use lts` 。

## 镜像管理

使用 nrm 进行镜像管理。

[npmmirror 中国镜像站](https://npmmirror.com/)

对于一些使用 C++ 模块，或必须从 github 或指定地址下载资源的包，可以额外配置镜像。

```bash{13,14}
# 查看Node版本与npm版本确认已安装Node环境
node -v
npm -v

# 全局安装nrm并设置npm的淘宝镜像
npm i -g nrm
nrm use taobao

# 设置依赖在安装过程中内部模块下载Node的淘宝镜像
npm config set disturl https://registry.npmmirror.com/node/

# 设置常见模块的淘宝镜像
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set puppeteer_download_host https://npm.taobao.org/mirrors/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
npm config set python_mirror https://npm.taobao.org/mirrors/python/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set sentrycli_cdnurl https://npm.taobao.org/mirrors/sentry-cli/
npm config set sharp_binary_host https://npm.taobao.org/mirrors/sharp/
npm config set sharp_dist_base_url https://npm.taobao.org/mirrors/sharp-libvips/
npm config set sharp_libvips_binary_host https://npm.taobao.org/mirrors/sharp-libvips/
npm config set sqlite3_binary_site https://npm.taobao.org/mirrors/sqlite3/
```

## 数据管理

非关系型数据库 MongoDB 。

MongoDB 标准的 URL ：`mongodb://username:password@host:port/database[?options]`

| 参数       | 说明        | 描述                          |
| ---------- | ----------- | ----------------------------- |
| mongodb:// | 协议        | 可理解成 HTTP                 |
| username   | 账号        | 上述创建的 root               |
| password   | 密码        | 上述创建的 root 的密码 123456 |
| host       | 实例公有 IP |                               |
| port       | 端口        | 默认 27017                    |
| database   | 数据库      | 上述切换的 admin 数据库       |
| options    | 配置        | 用得很少                      |

### 安装

- 登录服务器
- 进入工具目录：`cd /tool`
- 下载 MongoDB：`wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel80-5.0.6.tgz`
- 解压 MongoDB：`tar -zxvf mongodb-linux-x86_64-rhel80-5.0.6.tgz -C /tool`
- 重命名目录：`mv mongodb-linux-x86_64-rhel80-5.0.6 mongodb`

### 配置

- 进入目录并创建文件夹与日志文件：`cd mongodb && mkdir data && mkdir log && touch log/mongodb.log`
- 配置环境变量：

  ```bash
  echo "export PATH=$PATH:/tool/mongodb/bin" >> ~/.bash_profile
  source ~/.bash_profile
  ```

- 修改配置文件：`vim /tool/mongodb/mongodb.conf` ，加入一下内容

  ```bash
   # 数据库
   dbpath=/tool/mongodb/data
   # 日志文件
   logpath=/tool/mongodb/log/mongodb.log
   # 使用追加的方式更新日志
   logappend=true
   # 端口
   port=27017
   # 以守护进程的方式运行MongoDB(创建服务器进程)
   fork=true
   # 启用用户验证
   # auth=true
   # 绑定服务IP(绑定127.0.0.1只能本机访问，若不指定则默认本地所有IP)
   bind_ip=0.0.0.0
  ```

- 启动 MongoDB：`mongod -f /tool/mongodb/mongodb.conf`
- 查看 MongoDB 状态：`ps -ef | grep mongod`
- 关闭 MongoDB：`mongod --shutdown -f /tool/mongodb/mongodb.conf`

### 连接

- MongoDB 启动后，执行 `mongo` 连接 MongoDB
- 连接后，终端进入 mongodb 模式，该模式可执行 mongodb 相关命令
- 切换到 admin 数据库，该数据库是 mongodb 默认数据库，用于管理用户权限
  ：`use admin`
- 创建 root 用户：`db.createUser({ user: "root", pwd: "123456", roles: [{ role: "root", db: "admin" }] })`
- 开启 `auth=true` ，`vim /tool/mongodb/mongodb.conf` ，去掉 `auth=true` 的注释
- 重启 MongoDB

  ```bash
   mongod -f /tool/mongodb/mongodb.conf
   mongod --shutdown -f /tool/mongodb/mongodb.conf
  ```

- 用户登录，输出 1 则表示成功

  ```bash
  use admin
  db.auth("root", "123456")
  ```

### 接口服务

- 上传服务端代码，安装依赖
- 登录服务器，创建对应的 Nginx 配置文件 `/etc/nginx/conf.d/api.aaa.bbb.conf` ，加入以下内容

  ```bash
  server {
  	server_name api.yangzw.vip;
  	location /mall {
  		proxy_pass http://127.0.0.1:3000;
  		proxy_set_header Host $host;
  		proxy_set_header X-Forwarded-For $remote_addr;
  		proxy_set_header X-Forwarded-Proto https;
  	}
  	location /blog {
  		proxy_pass http://127.0.0.1:3001;
  		proxy_set_header Host $host;
  		proxy_set_header X-Forwarded-For $remote_addr;
  		proxy_set_header X-Forwarded-Proto https;
  	}
  	location /resume {
  		proxy_pass http://127.0.0.1:3002;
  		proxy_set_header Host $host;
  		proxy_set_header X-Forwarded-For $remote_addr;
  		proxy_set_header X-Forwarded-Proto https;
  	}
  }
  ```

- 执行 `ccertbot --nginx` ，选择 `npm.aaa.bbb`
- 配置安全组
- 执行 `nginx -t` 验证 Nginx 配置
- 执行 `nginx -s reload` 重启 Nginx 进程
- 执行 `npm run deploy` 启动服务

## 进程管理

| 工具    | 稳定性 | 运行环境 | 并发量级 | 后台运行 | 代码监听 | 状态监控 | 日志管理 | 集群模式 |
| ------- | ------ | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| nodemon | 中等   | 开发环境 | 无       | ❌       | ✔️       | ❌       | ❌       | ❌       |
| forever | 中等   | 生产环境 | 较小     | ✔️       | ✔️       | ❌       | ✔️       | ❌       |
| pm2     | 较高   | 生产环境 | 较大     | ✔️       | ✔️       | ✔️       | ✔️       | ✔️       |

- nodemon：适用于开发环境，调试代码更方便
- forever：适用于无需监控且访问量较小的站点
- pm2：适用于需监控且访问量较大的站点

### pm2

pm2 是一个运行在 Node.js 环境的守护进程管理器，用于管理 Node.js 进程 。

特点

1. 后台运行：pm2 启动的 Node.js 进程，不会随着 CMD 工具的关闭而结束
1. 代码监听：监听代码文件，若发生修改会重启 Node.js 进程
1. 次数限制：限制不稳定的重启次数，达到上限就结束 Node.js 进程
1. 零秒重启：在集群模式下，重启时不会结束 Node.js 进程
1. 负载均衡：在集群模式下，自动使用轮询方式达到负载均衡，减轻服务器压力
1. 实时接口：提供 Node.js 进程监控状态的实时接口，返回服务器与 Node.js 进程的相关信息
1. 日志管理：收集的日志文件可配合插件管理与细化
1. 集成管理：对于多个 Node.js 进程，在不同环境下可通过同一个配置文件统一管理
