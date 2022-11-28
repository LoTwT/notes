import{_ as s,c as n,o as a,a as o}from"./app.a067e1d4.js";const A=JSON.parse('{"title":"\u7BA1\u7406","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u73AF\u5883\u7BA1\u7406","slug":"\u73AF\u5883\u7BA1\u7406","link":"#\u73AF\u5883\u7BA1\u7406","children":[]},{"level":2,"title":"\u955C\u50CF\u7BA1\u7406","slug":"\u955C\u50CF\u7BA1\u7406","link":"#\u955C\u50CF\u7BA1\u7406","children":[]},{"level":2,"title":"\u6570\u636E\u7BA1\u7406","slug":"\u6570\u636E\u7BA1\u7406","link":"#\u6570\u636E\u7BA1\u7406","children":[{"level":3,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5","link":"#\u5B89\u88C5","children":[]},{"level":3,"title":"\u914D\u7F6E","slug":"\u914D\u7F6E","link":"#\u914D\u7F6E","children":[]},{"level":3,"title":"\u8FDE\u63A5","slug":"\u8FDE\u63A5","link":"#\u8FDE\u63A5","children":[]},{"level":3,"title":"\u63A5\u53E3\u670D\u52A1","slug":"\u63A5\u53E3\u670D\u52A1","link":"#\u63A5\u53E3\u670D\u52A1","children":[]}]},{"level":2,"title":"\u8FDB\u7A0B\u7BA1\u7406","slug":"\u8FDB\u7A0B\u7BA1\u7406","link":"#\u8FDB\u7A0B\u7BA1\u7406","children":[{"level":3,"title":"pm2","slug":"pm2","link":"#pm2","children":[]}]}],"relativePath":"toolchain/engineering/management.md","lastUpdated":1669599731000}'),l={name:"toolchain/engineering/management.md"},p=o(`<h1 id="\u7BA1\u7406" tabindex="-1">\u7BA1\u7406 <a class="header-anchor" href="#\u7BA1\u7406" aria-hidden="true">#</a></h1><h2 id="\u73AF\u5883\u7BA1\u7406" tabindex="-1">\u73AF\u5883\u7BA1\u7406 <a class="header-anchor" href="#\u73AF\u5883\u7BA1\u7406" aria-hidden="true">#</a></h2><p>Node.js \u73AF\u5883\u7BA1\u7406\uFF0Cwindows \u4F7F\u7528 nvm \u3002</p><p>pnpm \u7684\u73AF\u5883\u7BA1\u7406 <code>pnpm env --global use lts</code> \u3002</p><h2 id="\u955C\u50CF\u7BA1\u7406" tabindex="-1">\u955C\u50CF\u7BA1\u7406 <a class="header-anchor" href="#\u955C\u50CF\u7BA1\u7406" aria-hidden="true">#</a></h2><p>\u4F7F\u7528 nrm \u8FDB\u884C\u955C\u50CF\u7BA1\u7406\u3002</p><p><a href="https://npmmirror.com/" target="_blank" rel="noreferrer">npmmirror \u4E2D\u56FD\u955C\u50CF\u7AD9</a></p><p>\u5BF9\u4E8E\u4E00\u4E9B\u4F7F\u7528 C++ \u6A21\u5757\uFF0C\u6216\u5FC5\u987B\u4ECE github \u6216\u6307\u5B9A\u5730\u5740\u4E0B\u8F7D\u8D44\u6E90\u7684\u5305\uFF0C\u53EF\u4EE5\u989D\u5916\u914D\u7F6E\u955C\u50CF\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki has-highlighted-lines"><code><span class="line"><span style="color:#676E95;"># \u67E5\u770BNode\u7248\u672C\u4E0Enpm\u7248\u672C\u786E\u8BA4\u5DF2\u5B89\u88C5Node\u73AF\u5883</span></span>
<span class="line"><span style="color:#A6ACCD;">node -v</span></span>
<span class="line"><span style="color:#A6ACCD;">npm -v</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5168\u5C40\u5B89\u88C5nrm\u5E76\u8BBE\u7F6Enpm\u7684\u6DD8\u5B9D\u955C\u50CF</span></span>
<span class="line"><span style="color:#A6ACCD;">npm i -g nrm</span></span>
<span class="line"><span style="color:#A6ACCD;">nrm use taobao</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u8BBE\u7F6E\u4F9D\u8D56\u5728\u5B89\u88C5\u8FC7\u7A0B\u4E2D\u5185\u90E8\u6A21\u5757\u4E0B\u8F7DNode\u7684\u6DD8\u5B9D\u955C\u50CF</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> disturl https://registry.npmmirror.com/node/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u8BBE\u7F6E\u5E38\u89C1\u6A21\u5757\u7684\u6DD8\u5B9D\u955C\u50CF</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> electron_mirror https://npm.taobao.org/mirrors/electron/</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> puppeteer_download_host https://npm.taobao.org/mirrors/</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> python_mirror https://npm.taobao.org/mirrors/python/</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> sass_binary_site https://npm.taobao.org/mirrors/node-sass/</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> sentrycli_cdnurl https://npm.taobao.org/mirrors/sentry-cli/</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> sharp_binary_host https://npm.taobao.org/mirrors/sharp/</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> sharp_dist_base_url https://npm.taobao.org/mirrors/sharp-libvips/</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> sharp_libvips_binary_host https://npm.taobao.org/mirrors/sharp-libvips/</span></span>
<span class="line"><span style="color:#A6ACCD;">npm config </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> sqlite3_binary_site https://npm.taobao.org/mirrors/sqlite3/</span></span>
<span class="line"></span></code></pre></div><h2 id="\u6570\u636E\u7BA1\u7406" tabindex="-1">\u6570\u636E\u7BA1\u7406 <a class="header-anchor" href="#\u6570\u636E\u7BA1\u7406" aria-hidden="true">#</a></h2><p>\u975E\u5173\u7CFB\u578B\u6570\u636E\u5E93 MongoDB \u3002</p><p>MongoDB \u6807\u51C6\u7684 URL \uFF1A<code>mongodb://username:password@host:port/database[?options]</code></p><table><thead><tr><th>\u53C2\u6570</th><th>\u8BF4\u660E</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>mongodb://</td><td>\u534F\u8BAE</td><td>\u53EF\u7406\u89E3\u6210 HTTP</td></tr><tr><td>username</td><td>\u8D26\u53F7</td><td>\u4E0A\u8FF0\u521B\u5EFA\u7684 root</td></tr><tr><td>password</td><td>\u5BC6\u7801</td><td>\u4E0A\u8FF0\u521B\u5EFA\u7684 root \u7684\u5BC6\u7801 123456</td></tr><tr><td>host</td><td>\u5B9E\u4F8B\u516C\u6709 IP</td><td></td></tr><tr><td>port</td><td>\u7AEF\u53E3</td><td>\u9ED8\u8BA4 27017</td></tr><tr><td>database</td><td>\u6570\u636E\u5E93</td><td>\u4E0A\u8FF0\u5207\u6362\u7684 admin \u6570\u636E\u5E93</td></tr><tr><td>options</td><td>\u914D\u7F6E</td><td>\u7528\u5F97\u5F88\u5C11</td></tr></tbody></table><h3 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h3><ul><li>\u767B\u5F55\u670D\u52A1\u5668</li><li>\u8FDB\u5165\u5DE5\u5177\u76EE\u5F55\uFF1A<code>cd /tool</code></li><li>\u4E0B\u8F7D MongoDB\uFF1A<code>wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel80-5.0.6.tgz</code></li><li>\u89E3\u538B MongoDB\uFF1A<code>tar -zxvf mongodb-linux-x86_64-rhel80-5.0.6.tgz -C /tool</code></li><li>\u91CD\u547D\u540D\u76EE\u5F55\uFF1A<code>mv mongodb-linux-x86_64-rhel80-5.0.6 mongodb</code></li></ul><h3 id="\u914D\u7F6E" tabindex="-1">\u914D\u7F6E <a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a></h3><ul><li><p>\u8FDB\u5165\u76EE\u5F55\u5E76\u521B\u5EFA\u6587\u4EF6\u5939\u4E0E\u65E5\u5FD7\u6587\u4EF6\uFF1A<code>cd mongodb &amp;&amp; mkdir data &amp;&amp; mkdir log &amp;&amp; touch log/mongodb.log</code></p></li><li><p>\u914D\u7F6E\u73AF\u5883\u53D8\u91CF\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">export PATH=</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">PATH</span><span style="color:#C3E88D;">:/tool/mongodb/bin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.bash_profile</span></span>
<span class="line"><span style="color:#82AAFF;">source</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.bash_profile</span></span>
<span class="line"></span></code></pre></div></li><li><p>\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6\uFF1A<code>vim /tool/mongodb/mongodb.conf</code> \uFF0C\u52A0\u5165\u4E00\u4E0B\u5185\u5BB9</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># \u6570\u636E\u5E93</span></span>
<span class="line"><span style="color:#A6ACCD;"> dbpath=/tool/mongodb/data</span></span>
<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># \u65E5\u5FD7\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;"> logpath=/tool/mongodb/log/mongodb.log</span></span>
<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># \u4F7F\u7528\u8FFD\u52A0\u7684\u65B9\u5F0F\u66F4\u65B0\u65E5\u5FD7</span></span>
<span class="line"><span style="color:#A6ACCD;"> logappend=true</span></span>
<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># \u7AEF\u53E3</span></span>
<span class="line"><span style="color:#A6ACCD;"> port=27017</span></span>
<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># \u4EE5\u5B88\u62A4\u8FDB\u7A0B\u7684\u65B9\u5F0F\u8FD0\u884CMongoDB(\u521B\u5EFA\u670D\u52A1\u5668\u8FDB\u7A0B)</span></span>
<span class="line"><span style="color:#A6ACCD;"> fork=true</span></span>
<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># \u542F\u7528\u7528\u6237\u9A8C\u8BC1</span></span>
<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># auth=true</span></span>
<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># \u7ED1\u5B9A\u670D\u52A1IP(\u7ED1\u5B9A127.0.0.1\u53EA\u80FD\u672C\u673A\u8BBF\u95EE\uFF0C\u82E5\u4E0D\u6307\u5B9A\u5219\u9ED8\u8BA4\u672C\u5730\u6240\u6709IP)</span></span>
<span class="line"><span style="color:#A6ACCD;"> bind_ip=0.0.0.0</span></span>
<span class="line"></span></code></pre></div></li><li><p>\u542F\u52A8 MongoDB\uFF1A<code>mongod -f /tool/mongodb/mongodb.conf</code></p></li><li><p>\u67E5\u770B MongoDB \u72B6\u6001\uFF1A<code>ps -ef | grep mongod</code></p></li><li><p>\u5173\u95ED MongoDB\uFF1A<code>mongod --shutdown -f /tool/mongodb/mongodb.conf</code></p></li></ul><h3 id="\u8FDE\u63A5" tabindex="-1">\u8FDE\u63A5 <a class="header-anchor" href="#\u8FDE\u63A5" aria-hidden="true">#</a></h3><ul><li><p>MongoDB \u542F\u52A8\u540E\uFF0C\u6267\u884C <code>mongo</code> \u8FDE\u63A5 MongoDB</p></li><li><p>\u8FDE\u63A5\u540E\uFF0C\u7EC8\u7AEF\u8FDB\u5165 mongodb \u6A21\u5F0F\uFF0C\u8BE5\u6A21\u5F0F\u53EF\u6267\u884C mongodb \u76F8\u5173\u547D\u4EE4</p></li><li><p>\u5207\u6362\u5230 admin \u6570\u636E\u5E93\uFF0C\u8BE5\u6570\u636E\u5E93\u662F mongodb \u9ED8\u8BA4\u6570\u636E\u5E93\uFF0C\u7528\u4E8E\u7BA1\u7406\u7528\u6237\u6743\u9650 \uFF1A<code>use admin</code></p></li><li><p>\u521B\u5EFA root \u7528\u6237\uFF1A<code>db.createUser({ user: &quot;root&quot;, pwd: &quot;123456&quot;, roles: [{ role: &quot;root&quot;, db: &quot;admin&quot; }] })</code></p></li><li><p>\u5F00\u542F <code>auth=true</code> \uFF0C<code>vim /tool/mongodb/mongodb.conf</code> \uFF0C\u53BB\u6389 <code>auth=true</code> \u7684\u6CE8\u91CA</p></li><li><p>\u91CD\u542F MongoDB</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> mongod -f /tool/mongodb/mongodb.conf</span></span>
<span class="line"><span style="color:#A6ACCD;"> mongod --shutdown -f /tool/mongodb/mongodb.conf</span></span>
<span class="line"></span></code></pre></div></li><li><p>\u7528\u6237\u767B\u5F55\uFF0C\u8F93\u51FA 1 \u5219\u8868\u793A\u6210\u529F</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">use admin</span></span>
<span class="line"><span style="color:#A6ACCD;">db.auth</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">root</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">123456</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div></li></ul><h3 id="\u63A5\u53E3\u670D\u52A1" tabindex="-1">\u63A5\u53E3\u670D\u52A1 <a class="header-anchor" href="#\u63A5\u53E3\u670D\u52A1" aria-hidden="true">#</a></h3><ul><li><p>\u4E0A\u4F20\u670D\u52A1\u7AEF\u4EE3\u7801\uFF0C\u5B89\u88C5\u4F9D\u8D56</p></li><li><p>\u767B\u5F55\u670D\u52A1\u5668\uFF0C\u521B\u5EFA\u5BF9\u5E94\u7684 Nginx \u914D\u7F6E\u6587\u4EF6 <code>/etc/nginx/conf.d/api.aaa.bbb.conf</code> \uFF0C\u52A0\u5165\u4EE5\u4E0B\u5185\u5BB9</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	server_name api.yangzw.vip</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	location /mall </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_pass http://127.0.0.1:3000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_set_header Host </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">host</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_set_header X-Forwarded-For </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_addr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_set_header X-Forwarded-Proto https</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	location /blog </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_pass http://127.0.0.1:3001</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_set_header Host </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">host</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_set_header X-Forwarded-For </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_addr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_set_header X-Forwarded-Proto https</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	location /resume </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_pass http://127.0.0.1:3002</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_set_header Host </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">host</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_set_header X-Forwarded-For </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_addr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		proxy_set_header X-Forwarded-Proto https</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></li><li><p>\u6267\u884C <code>ccertbot --nginx</code> \uFF0C\u9009\u62E9 <code>npm.aaa.bbb</code></p></li><li><p>\u914D\u7F6E\u5B89\u5168\u7EC4</p></li><li><p>\u6267\u884C <code>nginx -t</code> \u9A8C\u8BC1 Nginx \u914D\u7F6E</p></li><li><p>\u6267\u884C <code>nginx -s reload</code> \u91CD\u542F Nginx \u8FDB\u7A0B</p></li><li><p>\u6267\u884C <code>npm run deploy</code> \u542F\u52A8\u670D\u52A1</p></li></ul><h2 id="\u8FDB\u7A0B\u7BA1\u7406" tabindex="-1">\u8FDB\u7A0B\u7BA1\u7406 <a class="header-anchor" href="#\u8FDB\u7A0B\u7BA1\u7406" aria-hidden="true">#</a></h2><table><thead><tr><th>\u5DE5\u5177</th><th>\u7A33\u5B9A\u6027</th><th>\u8FD0\u884C\u73AF\u5883</th><th>\u5E76\u53D1\u91CF\u7EA7</th><th>\u540E\u53F0\u8FD0\u884C</th><th>\u4EE3\u7801\u76D1\u542C</th><th>\u72B6\u6001\u76D1\u63A7</th><th>\u65E5\u5FD7\u7BA1\u7406</th><th>\u96C6\u7FA4\u6A21\u5F0F</th></tr></thead><tbody><tr><td>nodemon</td><td>\u4E2D\u7B49</td><td>\u5F00\u53D1\u73AF\u5883</td><td>\u65E0</td><td>\u274C</td><td>\u2714\uFE0F</td><td>\u274C</td><td>\u274C</td><td>\u274C</td></tr><tr><td>forever</td><td>\u4E2D\u7B49</td><td>\u751F\u4EA7\u73AF\u5883</td><td>\u8F83\u5C0F</td><td>\u2714\uFE0F</td><td>\u2714\uFE0F</td><td>\u274C</td><td>\u2714\uFE0F</td><td>\u274C</td></tr><tr><td>pm2</td><td>\u8F83\u9AD8</td><td>\u751F\u4EA7\u73AF\u5883</td><td>\u8F83\u5927</td><td>\u2714\uFE0F</td><td>\u2714\uFE0F</td><td>\u2714\uFE0F</td><td>\u2714\uFE0F</td><td>\u2714\uFE0F</td></tr></tbody></table><ul><li>nodemon\uFF1A\u9002\u7528\u4E8E\u5F00\u53D1\u73AF\u5883\uFF0C\u8C03\u8BD5\u4EE3\u7801\u66F4\u65B9\u4FBF</li><li>forever\uFF1A\u9002\u7528\u4E8E\u65E0\u9700\u76D1\u63A7\u4E14\u8BBF\u95EE\u91CF\u8F83\u5C0F\u7684\u7AD9\u70B9</li><li>pm2\uFF1A\u9002\u7528\u4E8E\u9700\u76D1\u63A7\u4E14\u8BBF\u95EE\u91CF\u8F83\u5927\u7684\u7AD9\u70B9</li></ul><h3 id="pm2" tabindex="-1">pm2 <a class="header-anchor" href="#pm2" aria-hidden="true">#</a></h3><p>pm2 \u662F\u4E00\u4E2A\u8FD0\u884C\u5728 Node.js \u73AF\u5883\u7684\u5B88\u62A4\u8FDB\u7A0B\u7BA1\u7406\u5668\uFF0C\u7528\u4E8E\u7BA1\u7406 Node.js \u8FDB\u7A0B \u3002</p><p>\u7279\u70B9</p><ol><li>\u540E\u53F0\u8FD0\u884C\uFF1Apm2 \u542F\u52A8\u7684 Node.js \u8FDB\u7A0B\uFF0C\u4E0D\u4F1A\u968F\u7740 CMD \u5DE5\u5177\u7684\u5173\u95ED\u800C\u7ED3\u675F</li><li>\u4EE3\u7801\u76D1\u542C\uFF1A\u76D1\u542C\u4EE3\u7801\u6587\u4EF6\uFF0C\u82E5\u53D1\u751F\u4FEE\u6539\u4F1A\u91CD\u542F Node.js \u8FDB\u7A0B</li><li>\u6B21\u6570\u9650\u5236\uFF1A\u9650\u5236\u4E0D\u7A33\u5B9A\u7684\u91CD\u542F\u6B21\u6570\uFF0C\u8FBE\u5230\u4E0A\u9650\u5C31\u7ED3\u675F Node.js \u8FDB\u7A0B</li><li>\u96F6\u79D2\u91CD\u542F\uFF1A\u5728\u96C6\u7FA4\u6A21\u5F0F\u4E0B\uFF0C\u91CD\u542F\u65F6\u4E0D\u4F1A\u7ED3\u675F Node.js \u8FDB\u7A0B</li><li>\u8D1F\u8F7D\u5747\u8861\uFF1A\u5728\u96C6\u7FA4\u6A21\u5F0F\u4E0B\uFF0C\u81EA\u52A8\u4F7F\u7528\u8F6E\u8BE2\u65B9\u5F0F\u8FBE\u5230\u8D1F\u8F7D\u5747\u8861\uFF0C\u51CF\u8F7B\u670D\u52A1\u5668\u538B\u529B</li><li>\u5B9E\u65F6\u63A5\u53E3\uFF1A\u63D0\u4F9B Node.js \u8FDB\u7A0B\u76D1\u63A7\u72B6\u6001\u7684\u5B9E\u65F6\u63A5\u53E3\uFF0C\u8FD4\u56DE\u670D\u52A1\u5668\u4E0E Node.js \u8FDB\u7A0B\u7684\u76F8\u5173\u4FE1\u606F</li><li>\u65E5\u5FD7\u7BA1\u7406\uFF1A\u6536\u96C6\u7684\u65E5\u5FD7\u6587\u4EF6\u53EF\u914D\u5408\u63D2\u4EF6\u7BA1\u7406\u4E0E\u7EC6\u5316</li><li>\u96C6\u6210\u7BA1\u7406\uFF1A\u5BF9\u4E8E\u591A\u4E2A Node.js \u8FDB\u7A0B\uFF0C\u5728\u4E0D\u540C\u73AF\u5883\u4E0B\u53EF\u901A\u8FC7\u540C\u4E00\u4E2A\u914D\u7F6E\u6587\u4EF6\u7EDF\u4E00\u7BA1\u7406</li></ol>`,28),t=[p];function e(r,c,d,i,h,y){return a(),n("div",null,t)}const C=s(l,[["render",e]]);export{A as __pageData,C as default};
