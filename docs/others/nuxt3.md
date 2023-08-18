# Nuxt3

## Nginx 无法识别 mjs 文件

当使用 Nuxt3 部署到 Nginx ，遇到如下问题：

::: danger
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "application/octet-stream". Strict MIME type checking is enforced for module scripts per HTML spec.
:::

问题原因是 Nginx 无法正确识别 mjs 类型，设置了错误的 MIME type ，修改 MIME type 与 mjs 文件映射即可。

[解决方法](https://segmentfault.com/a/1190000041954539)

- 打开 mime.types 文件

  ```bash
  vim /etc/nginx/mime.types
  ```

- 修改映射，将

  ```bash
  application/javascript                 js;
  ```

  改为

  ```bash
  application/javascript                 js mjs;
  ```

- 重启 Nginx

  ```bash
  nginx -s reload
  ```
