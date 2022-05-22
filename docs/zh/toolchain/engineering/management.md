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
