import{_ as s,c as n,o as a,a as l}from"./app.a067e1d4.js";const d=JSON.parse('{"title":"Docker \u90E8\u7F72","description":"","frontmatter":{},"headers":[{"level":2,"title":"web","slug":"web","link":"#web","children":[{"level":3,"title":"nginx","slug":"nginx","link":"#nginx","children":[]},{"level":3,"title":"Dockerfile","slug":"dockerfile","link":"#dockerfile","children":[]},{"level":3,"title":"build:deploy","slug":"build-deploy","link":"#build-deploy","children":[]}]},{"level":2,"title":"node","slug":"node","link":"#node","children":[{"level":3,"title":"Dockerfile","slug":"dockerfile-1","link":"#dockerfile-1","children":[]}]}],"relativePath":"devops/docker.md","lastUpdated":1669599731000}'),p={name:"devops/docker.md"},o=l(`<h1 id="docker-\u90E8\u7F72" tabindex="-1">Docker \u90E8\u7F72 <a class="header-anchor" href="#docker-\u90E8\u7F72" aria-hidden="true">#</a></h1><p>\u524D\u7AEF\u4E5F\u9700\u8981\u638C\u63E1\u4E00\u4E9B\u8FD0\u7EF4\u76F8\u5173\u7684\u77E5\u8BC6\u5416...</p><p><a href="https://registry.hub.docker.com/" target="_blank" rel="noreferrer">dockerhub</a></p><h2 id="web" tabindex="-1">web <a class="header-anchor" href="#web" aria-hidden="true">#</a></h2><p>\u4EE5 vite + vue3 \u7684 web \u9879\u76EE\u4E3A\u4F8B</p><p>\u90E8\u7F72\u6D41\u7A0B\uFF1A</p><ul><li><p>\u6784\u5EFA + \u4E0A\u4F20</p><ol><li><p>\u4F7F\u7528 <code>pnpm build:deploy</code> \u547D\u4EE4\u751F\u6210 <code>deploy</code> \u6587\u4EF6\u5939\uFF0C\u5176\u4E2D\u5305\u542B\uFF1A</p><ol><li><code>pnpm build</code> \u6784\u5EFA\u7684 <code>dist</code> \u6587\u4EF6\u5939</li><li>\u5B58\u653E nginx \u914D\u7F6E\u6587\u4EF6 <code>default.conf</code> \u7684 <code>nginx</code> \u6587\u4EF6\u5939</li><li>Dockerfile</li></ol></li><li><p>\u628A <code>deploy</code> \u6587\u4EF6\u5939\u4E0A\u4F20\u5230\u670D\u52A1\u5668\uFF0C\u6539\u540D\u4E3A <code>web</code> \u4FBF\u4E8E\u533A\u5206\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>WinSCP</code></p></li></ol></li><li><p>docker \u64CD\u4F5C</p><ol><li><code>docker ps</code> \u67E5\u770B\u5F53\u524D\u8FD0\u884C\u5BB9\u5668 ( <code>docker container ls -a</code> \u67E5\u770B\u6240\u6709\u5BB9\u5668 ) \uFF0C\u5F97\u5230\u539F\u5148\u7684\u5BB9\u5668 id\uFF0C\u53EF\u4EE5\u901A\u8FC7 <code>IMAGE</code> \u548C <code>NAMES</code> \u533A\u5206</li><li><code>docker stop \u5BB9\u5668id</code> \u505C\u6B62\u5BB9\u5668</li><li><code>docker rm \u5BB9\u5668id</code> \u79FB\u9664\u5BB9\u5668</li><li><code>docker images</code> \u67E5\u770B\u955C\u50CF</li><li><code>docker rmi \u955C\u50CFid</code> \u79FB\u9664\u4E0A\u4E00\u6B21\u6784\u5EFA\u7684\u955C\u50CF</li><li>\u8FDB\u5165 <code>web</code> \u6587\u4EF6\u5939\u6240\u5728\u76EE\u5F55</li><li><code>docker build -t image-name .</code>\uFF0C\u901A\u8FC7 Dockerfile \u6784\u5EFA\u4E86\u540D\u4E3A <code>image-name</code> \u7684\u955C\u50CF</li><li><code>docker run -it -p 7000:80 -d --name container-name image-name</code><ul><li><code>-it</code> \u4EA4\u4E92\u6A21\u5F0F\u8FD0\u884C\uFF0C\u5E76\u5206\u914D\u4E00\u4E2A\u4F2A\u8F93\u5165\u7EC8\u7AEF</li><li><code>-p</code> \u6307\u5B9A\u7AEF\u53E3\u6620\u5C04\uFF0C\u683C\u5F0F\uFF1A<code>\u4E3B\u673A(\u5BBF\u4E3B)\u7AEF\u53E3:\u5BB9\u5668\u7AEF\u53E3</code></li><li><code>-d</code> \u540E\u53F0\u8FD0\u884C</li><li><code>--name</code> \u5BB9\u5668\u540D\u79F0</li></ul></li></ol></li></ul><p>\u8BF4\u660E\uFF1A</p><ol><li>\u5982\u679C\u9700\u8981\u4FDD\u7559\u4E0A\u6B21\u6784\u5EFA\u7684 <code>image</code> \u548C\u8FD0\u884C\u7684\u5BB9\u5668\uFF0C\u8BF7\u8DF3\u8FC7\u79FB\u9664\u6B65\u9AA4</li><li><code>container-name</code>, <code>image-name</code>, <code>-p</code> \u7684\u7AEF\u53E3\u6620\u5C04\u8BF7\u81EA\u884C\u4FEE\u6539</li></ol><h3 id="nginx" tabindex="-1">nginx <a class="header-anchor" href="#nginx" aria-hidden="true">#</a></h3><p>\u90E8\u7F72 web \u9879\u76EE\u81EA\u7136\u5C11\u4E0D\u4E86 nginx</p><p><code>default.conf</code> \u6A21\u677F\u6765\u81EA docker \u4E2D <code>nginx:latest</code> \u955C\u50CF</p><p>\u4E0D\u8981\u5FD8\u8BB0\u914D\u7F6E\u4EE3\u7406\u54E6...</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen       80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen  [::]:80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name  localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #access_log  /var/log/nginx/host.access.log  main;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    location /api/ {</span></span>
<span class="line"><span style="color:#A6ACCD;">        rewrite /api/(.*) /$1 break;</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy_pass \u4F60\u7684 proxy \u4EE3\u7406;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #error_page  404              /404.html;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    # redirect server error pages to the static page /50x.html</span></span>
<span class="line"><span style="color:#A6ACCD;">    #</span></span>
<span class="line"><span style="color:#A6ACCD;">    error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    location = /50x.html {</span></span>
<span class="line"><span style="color:#A6ACCD;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    # proxy the PHP scripts to Apache listening on 127.0.0.1:80</span></span>
<span class="line"><span style="color:#A6ACCD;">    #</span></span>
<span class="line"><span style="color:#A6ACCD;">    #location ~ \\.php$ {</span></span>
<span class="line"><span style="color:#A6ACCD;">    #    proxy_pass   http://127.0.0.1;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #}</span></span>
<span class="line"><span style="color:#A6ACCD;">    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span></span>
<span class="line"><span style="color:#A6ACCD;">    #</span></span>
<span class="line"><span style="color:#A6ACCD;">    #location ~ \\.php$ {</span></span>
<span class="line"><span style="color:#A6ACCD;">    #    root           html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #    fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #    fastcgi_index  index.php;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #    include        fastcgi_params;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    # deny access to .htaccess files, if Apache&#39;s document root</span></span>
<span class="line"><span style="color:#A6ACCD;">    # concurs with nginx&#39;s one</span></span>
<span class="line"><span style="color:#A6ACCD;">    #</span></span>
<span class="line"><span style="color:#A6ACCD;">    #location ~ /\\.ht {</span></span>
<span class="line"><span style="color:#A6ACCD;">    #    deny  all;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="dockerfile" tabindex="-1">Dockerfile <a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a></h3><p>\u7528\u4E8E\u6784\u5EFA docker \u955C\u50CF\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u7528\u597D\u4E4B\u540E\u5F88\u65B9\u4FBF\uFF01</p><p>\u8BF4\u660E\uFF1A</p><ol><li>\u4EE5 <code>nginx</code> \u8FD9\u4E2A\u955C\u50CF\u4E3A\u6A21\u677F\uFF0C\u5982\u679C\u672C\u5730\u6CA1\u6709\uFF0C\u4F1A\u4ECE\u670D\u52A1\u5668\u62C9\u53D6</li><li>\u5C06 <code>default.conf</code> \u590D\u5236\u5230\u5BF9\u5E94\u76EE\u5F55\u4E0B\uFF0C\u8986\u76D6\u9ED8\u8BA4\u914D\u7F6E</li><li>\u5C06\u6784\u5EFA\u597D\u7684 <code>dist</code> \u6587\u4EF6\u5939\u590D\u5236\u5230\u5BF9\u5E94\u76EE\u5F55</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">FROM nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">COPY nginx/default.conf /etc/nginx/conf.d/default.conf</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">COPY dist/ /usr/share/nginx/html/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="build-deploy" tabindex="-1">build:deploy <a class="header-anchor" href="#build-deploy" aria-hidden="true">#</a></h3><p><code>build:deploy</code> \u662F\u5B9A\u4E49\u5728 <code>package.json</code> \u4E2D\uFF0C\u4F7F\u7528 <code>vite build</code> \u6784\u5EFA\uFF0C\u8FD0\u884C\u81EA\u5B9A\u4E49\u811A\u672C\u6587\u4EF6\uFF0C\u4EE5\u8FBE\u5230\u751F\u6210\u9700\u8981\u7684 <code>deploy</code> \u6587\u4EF6\u5939\u7684\u547D\u4EE4</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># deploy \u6587\u4EF6\u5939\u7684\u5927\u81F4\u7ED3\u6784</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500 Dockerfile</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500 dist</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2502  favicon.ico</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2502  index.html</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2502</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2514\u2500assets</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.10fd9df2.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.18403c66.css</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.3d74d3d4.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.4d34df23.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.60d6081d.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.83b25e1a.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.848db11a.css</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.bf502b0c.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.c60cc70b.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.d7c39d95.css</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          index.e123854a.css</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          Login.238ecb70.css</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          Login.af636802.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          project.45745834.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          useMapper.f392e285.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502          vendor.7b9a3c1a.js</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500 nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">        default.conf</span></span>
<span class="line"></span></code></pre></div><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vite build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">build:deploy</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">npm run build &amp;&amp; node ./scripts/buildDeploy.js</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u4EE5\u4E0B\u662F <code>buildDeploy.js</code> \u811A\u672C\u7684\u5185\u5BB9</p><p>\u56E0\u4E3A\u7528\u5230\u4E86 <code>fs.cpSync</code>\uFF0C\u9700\u8981 <code>node &gt;= 16.7.0</code> \u54E6</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fs </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">fs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> path </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> root </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> deployDir </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(root</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">deploy</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">start build deploy...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> (fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">existsSync</span><span style="color:#A6ACCD;">(deployDir)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">rmSync</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">deployDir</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> recursive</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mkdirSync</span><span style="color:#A6ACCD;">(deployDir)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cpSync</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(root</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dist</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(deployDir</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dist</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">recursive</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cpSync</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(root</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nginx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(deployDir</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nginx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">recursive</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cpSync</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(root</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Dockerfile</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(deployDir</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Dockerfile</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">finish build deploy...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="node" tabindex="-1">node <a class="header-anchor" href="#node" aria-hidden="true">#</a></h2><p>\u4EE5 <a href="https://www.eggjs.org/" target="_blank" rel="noreferrer">eggjs</a> \u4E3A\u4F8B</p><p>\u6D41\u7A0B\u4E0E\u90E8\u7F72 web \u9879\u76EE\u5927\u81F4\u76F8\u540C\uFF0C\u6838\u5FC3\u662F\u914D\u7F6E Dockerfile\uFF0C\u4F46\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF1A</p><ol><li>node \u9879\u76EE\u76F4\u63A5\u5C06\u9879\u76EE\u76EE\u5F55\u4E0A\u4F20\u5230\u670D\u52A1\u5668\u5373\u53EF</li><li>\u5EFA\u8BAE\u4ECE\u4EE3\u7801\u4ED3\u5E93\u62C9\u53D6\u7EAF\u51C0\u7684\u9879\u76EE\u4E0A\u4F20</li><li>\u9879\u76EE\u4F9D\u8D56\u7684 <code>node_modules</code> \u53EF\u6839\u636E\u60C5\u51B5\uFF0C\u9009\u62E9\u5408\u9002\u7684\u65F6\u673A\u5B89\u88C5\uFF0C\u793A\u4F8B\u653E\u5728\u4E86 Dockerfile \u4E2D</li><li>\u542F\u52A8\u627F\u8F7D node \u670D\u52A1\u7684\u5BB9\u5668\u65F6\uFF0C\u6709\u53EF\u80FD\u9700\u8981\u66F4\u9AD8\u7684\u6743\u9650 <code>--privileged=true</code></li></ol><p>\u4E00\u4E2A\u53EF\u80FD\u7684\u542F\u52A8\u5BB9\u5668\u547D\u4EE4 <code>docker run -it -p 7001:7001 -d --privileged=true --name container-name image-name</code></p><h3 id="dockerfile-1" tabindex="-1">Dockerfile <a class="header-anchor" href="#dockerfile-1" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"># \u8BBE\u7F6E\u57FA\u7840\u955C\u50CF\uFF0C\u5982\u679C\u672C\u5730\u6CA1\u6709\u8BE5\u955C\u50CF\uFF0C\u4F1A\u4ECE\u670D\u52A1\u5668\u62C9\u53D6</span></span>
<span class="line"><span style="color:#A6ACCD;">FROM node:16.14.0-alpine</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u8BBE\u7F6E\u65F6\u533A</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN apk --update add tzdata \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    &amp;&amp; cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    &amp;&amp; echo &quot;Asia/Shanghai&quot; &gt; /etc/timezone \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    &amp;&amp; apk del tzdata</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u521B\u5EFAapp\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN mkdir -p /usr/src/server</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u8BBE\u7F6E\u5DE5\u4F5C\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">WORKDIR /usr/src/server</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u62F7\u8D1Dpackage.json\u6587\u4EF6\u5230\u5DE5\u4F5C\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;"># !!\u91CD\u8981\uFF1Apackage.json \u9700\u8981\u5355\u72EC\u6DFB\u52A0\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"># Docker \u5728\u6784\u5EFA\u955C\u50CF\u7684\u65F6\u5019\uFF0C\u662F\u4E00\u5C42\u4E00\u5C42\u6784\u5EFA\u7684\uFF0C\u4EC5\u5F53\u8FD9\u4E00\u5C42\u6709\u53D8\u5316\u65F6\uFF0C\u91CD\u65B0\u6784\u5EFA\u5BF9\u5E94\u7684\u5C42\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"># \u5982\u679C package.json \u548C\u6E90\u4EE3\u7801\u4E00\u8D77\u6DFB\u52A0\u5230\u955C\u50CF\uFF0C\u5219\u6BCF\u6B21\u4FEE\u6539\u6E90\u7801\u90FD\u9700\u8981\u91CD\u65B0\u5B89\u88C5 npm \u6A21\u5757\uFF0C\u8FD9\u6837\u6728\u6709\u5FC5\u8981\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"># \u6240\u4EE5\uFF0C\u6B63\u786E\u7684\u987A\u5E8F\u662F: \u6DFB\u52A0 package.json\uFF1B\u5B89\u88C5 npm \u6A21\u5757\uFF1B\u6DFB\u52A0\u6E90\u4EE3\u7801\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY package.json /usr/src/server/package.json</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u5B89\u88C5 npm \u4F9D\u8D56(\u4F7F\u7528\u6DD8\u5B9D\u7684\u955C\u50CF\u6E90)</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN npm i --production --registry=https://registry.npmmirror.com/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u62F7\u8D1D\u6240\u6709\u6E90\u4EE3\u7801\u5230\u5DE5\u4F5C\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY . /usr/src/server</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u66B4\u9732\u5BB9\u5668\u7AEF\u53E3</span></span>
<span class="line"><span style="color:#A6ACCD;">EXPOSE 7001</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u542F\u52A8node\u5E94\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">CMD npm start</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,33),e=[o];function c(t,r,i,A,C,D){return a(),n("div",null,e)}const F=s(p,[["render",c]]);export{d as __pageData,F as default};
