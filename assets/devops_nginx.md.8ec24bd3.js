import{_ as s,c as n,o as a,a as e}from"./app.5ae73da0.js";const x=JSON.parse('{"title":"Nginx","description":"","frontmatter":{},"headers":[],"relativePath":"devops/nginx.md","lastUpdated":1658419284000}'),l={name:"devops/nginx.md"},p=e(`<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-hidden="true">#</a></h1><p>\u5B58\u653E\u4E00\u4E9B nginx \u914D\u7F6E\u3002</p><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">	listen 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">	server_name aaa.bbb.ccc;</span></span>
<span class="line"><span style="color:#A6ACCD;">	location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">		root /www/xxx/zzz;</span></span>
<span class="line"><span style="color:#A6ACCD;">		index index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">		try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"><span style="color:#A6ACCD;">	location /api {</span></span>
<span class="line"><span style="color:#A6ACCD;">		alias /www/xxx/zzz/api;</span></span>
<span class="line"><span style="color:#A6ACCD;">		index index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">		try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,3),t=[p];function o(c,i,r,A,C,d){return a(),n("div",null,t)}var y=s(l,[["render",o]]);export{x as __pageData,y as default};
