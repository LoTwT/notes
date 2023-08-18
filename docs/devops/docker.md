# Docker 部署

前端也需要掌握一些运维相关的知识吖...

[dockerhub](https://registry.hub.docker.com/)

## web

以 vite + vue3 的 web 项目为例

部署流程：

- 构建 + 上传

  1. 使用 `pnpm build:deploy` 命令生成 `deploy` 文件夹，其中包含：

     1. `pnpm build` 构建的 `dist` 文件夹
     1. 存放 nginx 配置文件 `default.conf` 的 `nginx` 文件夹
     1. Dockerfile

  1. 把 `deploy` 文件夹上传到服务器，改名为 `web` 便于区分，可以使用 `WinSCP`

- docker 操作

  1.  `docker ps` 查看当前运行容器 ( `docker container ls -a` 查看所有容器 ) ，得到原先的容器 id，可以通过 `IMAGE` 和 `NAMES` 区分
  1.  `docker stop 容器id` 停止容器
  1.  `docker rm 容器id` 移除容器
  1.  `docker images` 查看镜像
  1.  `docker rmi 镜像id` 移除上一次构建的镜像
  1.  进入 `web` 文件夹所在目录
  1.  `docker build -t image-name .`，通过 Dockerfile 构建了名为 `image-name` 的镜像
  1.  `docker run -it -p 7000:80 -d --name container-name image-name`
      - `-it` 交互模式运行，并分配一个伪输入终端
      - `-p` 指定端口映射，格式：`主机(宿主)端口:容器端口`
      - `-d` 后台运行
      - `--name` 容器名称

说明：

1. 如果需要保留上次构建的 `image` 和运行的容器，请跳过移除步骤
1. `container-name`, `image-name`, `-p` 的端口映射请自行修改

### nginx

部署 web 项目自然少不了 nginx

`default.conf` 模板来自 docker 中 `nginx:latest` 镜像

不要忘记配置代理哦...

```
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location /api/ {
        rewrite /api/(.*) /$1 break;
        proxy_pass 你的 proxy 代理;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

### Dockerfile

用于构建 docker 镜像的配置文件，用好之后很方便！

说明：

1. 以 `nginx` 这个镜像为模板，如果本地没有，会从服务器拉取
1. 将 `default.conf` 复制到对应目录下，覆盖默认配置
1. 将构建好的 `dist` 文件夹复制到对应目录

```
FROM nginx

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY dist/ /usr/share/nginx/html/
```

### build:deploy

`build:deploy` 是定义在 `package.json` 中，使用 `vite build` 构建，运行自定义脚本文件，以达到生成需要的 `deploy` 文件夹的命令

```shell
# deploy 文件夹的大致结构
├─ Dockerfile
│
├─ dist
│   │  favicon.ico
│   │  index.html
│   │
│   └─assets
│          index.10fd9df2.js
│          index.18403c66.css
│          index.3d74d3d4.js
│          index.4d34df23.js
│          index.60d6081d.js
│          index.83b25e1a.js
│          index.848db11a.css
│          index.bf502b0c.js
│          index.c60cc70b.js
│          index.d7c39d95.css
│          index.e123854a.css
│          Login.238ecb70.css
│          Login.af636802.js
│          project.45745834.js
│          useMapper.f392e285.js
│          vendor.7b9a3c1a.js
│
└─ nginx
        default.conf
```

```json
{
  "scripts": {
    "build": "vite build",
    "build:deploy": "npm run build && node ./scripts/buildDeploy.js"
  }
}
```

以下是 `buildDeploy.js` 脚本的内容

因为用到了 `fs.cpSync`，需要 `node >= 16.7.0` 哦

```javascript
const fs = require("fs")
const path = require("path")

const root = path.resolve(__dirname, "../")
const deployDir = path.resolve(root, "deploy")

console.log("start build deploy...")

if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true })
}

fs.mkdirSync(deployDir)

fs.cpSync(path.resolve(root, "dist"), path.resolve(deployDir, "dist"), {
  recursive: true,
})
fs.cpSync(path.resolve(root, "nginx"), path.resolve(deployDir, "nginx"), {
  recursive: true,
})
fs.cpSync(
  path.resolve(root, "Dockerfile"),
  path.resolve(deployDir, "Dockerfile"),
)

console.log("finish build deploy...")
```

## node

以 [eggjs](https://www.eggjs.org/) 为例

流程与部署 web 项目大致相同，核心是配置 Dockerfile，但需要注意的是：

1. node 项目直接将项目目录上传到服务器即可
1. 建议从代码仓库拉取纯净的项目上传
1. 项目依赖的 `node_modules` 可根据情况，选择合适的时机安装，示例放在了 Dockerfile 中
1. 启动承载 node 服务的容器时，有可能需要更高的权限 `--privileged=true`

一个可能的启动容器命令 `docker run -it -p 7001:7001 -d --privileged=true --name container-name image-name`

### Dockerfile

```
# 设置基础镜像，如果本地没有该镜像，会从服务器拉取
FROM node:16.14.0-alpine

# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

# 创建app目录
RUN mkdir -p /usr/src/server

# 设置工作目录
WORKDIR /usr/src/server

# 拷贝package.json文件到工作目录
# !!重要：package.json 需要单独添加。
# Docker 在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# 如果 package.json 和源代码一起添加到镜像，则每次修改源码都需要重新安装 npm 模块，这样木有必要。
# 所以，正确的顺序是: 添加 package.json；安装 npm 模块；添加源代码。
COPY package.json /usr/src/server/package.json

# 安装 npm 依赖(使用淘宝的镜像源)
RUN npm i --production --registry=https://registry.npmmirror.com/

# 拷贝所有源代码到工作目录
COPY . /usr/src/server

# 暴露容器端口
EXPOSE 7001

# 启动node应用
CMD npm start
```
