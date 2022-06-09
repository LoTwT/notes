# Nginx

存放一些 nginx 配置。

```conf
server {
	listen 80;
	server_name aaa.bbb.ccc;
	location / {
		root /www/xxx/zzz;
		index index.html;
		try_files $uri $uri/ /index.html;
	}
	location /api {
		alias /www/xxx/zzz/api;
		index index.html;
		try_files $uri $uri/ /index.html;
	}
}
```
