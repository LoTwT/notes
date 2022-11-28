import{_ as s,c as n,o as a,a as l}from"./app.a067e1d4.js";const d=JSON.parse('{"title":"Host \u4E0E :authority","description":"","frontmatter":{},"headers":[{"level":2,"title":"nc","slug":"nc","link":"#nc","children":[]},{"level":2,"title":"curl","slug":"curl","link":"#curl","children":[]}],"relativePath":"http/header/8-host-authority.md","lastUpdated":1669599731000}'),p={name:"http/header/8-host-authority.md"},o=l(`<h1 id="host-\u4E0E-authority" tabindex="-1">Host \u4E0E :authority <a class="header-anchor" href="#host-\u4E0E-authority" aria-hidden="true">#</a></h1><p>\u5728\u4E00\u4E2A\u670D\u52A1\u5668\u4E2D\uFF0C\u53EF\u80FD\u62E5\u6709\u591A\u4E2A Host \u7684\u5E94\u7528\u670D\u52A1\uFF0C\u5373\u540C\u4E00\u4E2A IP \u5730\u5740\uFF0C\u53EF\u80FD\u5BF9\u5E94\u591A\u4E2A\u57DF\u540D\uFF0C\u6B64\u65F6\u4EC5\u4EC5\u901A\u8FC7 IP \u65E0\u6CD5\u8BBF\u95EE\u5230\u5BF9\u5E94\u7684\u670D\u52A1\uFF0C\u53EF\u901A\u8FC7 <code>Host</code> \u8FDB\u884C\u5B9A\u4F4D\u3002</p><p>\u5982\u679C\u67D0 IP \u5BF9\u5E94\u591A\u4E2A\u57DF\u540D\uFF0C\u5219 <code>Host</code> \u662F\u5FC5\u987B\u643A\u5E26\u7684\u8BF7\u6C42\u5934\uFF0C\u5982\u679C\u7F3A\u5931\u4E86\u8BE5\u8BF7\u6C42\u5934\u5219\u4F1A\u8FD4\u56DE 400 \u72B6\u6001\u7801\u3002</p><p>\u5728 HTTP/2 \u4EE5\u53CA HTTP/3 \u4E2D\uFF0C\u4EE5\u4E00\u4E2A\u4F2A\u5934 <code>:authority</code> \u4EE3\u66FF\u3002</p><p>\u5728\u6D4F\u89C8\u5668\u4E2D\u4F7F\u7528 <code>fetch</code>\uFF0C\u6216\u8005\u4F7F\u7528 <code>curl/httpie</code> \u53D1\u9001\u8BF7\u6C42\u65F6\uFF0C\u5C06\u4F1A\u81EA\u52A8\u643A\u5E26\u8BE5\u8BF7\u6C42\u5934\u3002</p><h2 id="nc" tabindex="-1">nc <a class="header-anchor" href="#nc" aria-hidden="true">#</a></h2><p>\u53EF\u901A\u8FC7 <code>nc</code> \u547D\u4EE4\uFF0C\u76F4\u63A5\u4EE5\u53D1\u9001\u62A5\u6587\u7684\u5F62\u5F0F\u6765\u8BF7\u6C42\u6570\u636E\uFF0C\u8FDB\u884C\u6D4B\u8BD5 :</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ nc httpbin.org 80</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /get HTTP/1.1</span></span>
<span class="line"><span style="color:#A6ACCD;">Host: httpbin.org</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#A6ACCD;">Date: Wed, 21 Sep 2022 05:49:27 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Type: application/json</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Length: 200</span></span>
<span class="line"><span style="color:#A6ACCD;">Connection: keep-alive</span></span>
<span class="line"><span style="color:#A6ACCD;">Server: gunicorn/19.9.0</span></span>
<span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Origin: </span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Credentials: </span><span style="color:#82AAFF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">args</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: {},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">headers</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Host</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">httpbin.org</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">origin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">122.222.222.222</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://httpbin.org/get</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u5982\u679C\u4E0D\u643A\u5E26 <code>Host</code> \u8BF7\u6C42\u5934\uFF0C\u5219\u76F4\u63A5\u8FD4\u56DE 400 \u72B6\u6001\u7801\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ nc httpbin.org 80</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /get HTTP/1.1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">HTTP/1.1 400 Bad Request</span></span>
<span class="line"><span style="color:#A6ACCD;">Server: awselb/2.0</span></span>
<span class="line"><span style="color:#A6ACCD;">Date: Wed, 21 Sep 2022 05:51:39 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Type: text/html</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Length: 122</span></span>
<span class="line"><span style="color:#A6ACCD;">Connection: close</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">head&gt;&lt;title</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">400 Bad Request</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">/title&gt;&lt;/head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">center&gt;&lt;h</span><span style="color:#89DDFF;">1&gt;</span><span style="color:#A6ACCD;">400 Bad Request</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">/h1&gt;&lt;/center</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">/body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">/html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u5982\u679C\u67D0 IP \u4EC5\u5BF9\u5E94\u4E00\u4E2A\u57DF\u540D\uFF0C\u5E76\u4E14\u901A\u8FC7 IP \u5730\u5740\u53EF\u76F4\u63A5\u8BBF\u95EE\u5E94\u7528\uFF0C\u5219\u53EF\u4E0D\u52A0 <code>Host</code> \u8BF7\u6C42\u5934\uFF0C\u6BD4\u5982\u767E\u5EA6\u3002\u4F46\u8FD9\u79CD\u60C5\u51B5\u5F88\u5C11\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ dig +short www.baidu.com</span></span>
<span class="line"><span style="color:#A6ACCD;">www.a.shifen.com.</span></span>
<span class="line"><span style="color:#A6ACCD;">14.215.177.38</span></span>
<span class="line"><span style="color:#A6ACCD;">14.215.177.39</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u76F4\u63A5\u8BBF\u95EE IP \u5730\u5740\u6210\u529F</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl --head 14.215.177.39</span></span>
<span class="line"><span style="color:#A6ACCD;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#A6ACCD;">Accept-Ranges: bytes</span></span>
<span class="line"><span style="color:#A6ACCD;">Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform</span></span>
<span class="line"><span style="color:#A6ACCD;">Connection: keep-alive</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Length: 277</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Type: text/html</span></span>
<span class="line"><span style="color:#A6ACCD;">Date: Sun, 23 Oct 2022 03:01:08 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;">Etag: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">575e1f71-115</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">Last-Modified: Mon, 13 Jun 2016 02:50:25 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;">Pragma: no-cache</span></span>
<span class="line"><span style="color:#A6ACCD;">Server: bfe/1.0.8.18</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u6B64\u65F6 nc \u65F6\uFF0C\u53EF\u4E0D\u53D1\u9001 HOST \u8BF7\u6C42\u5934</span></span>
<span class="line"><span style="color:#A6ACCD;">$ nc www.baidu.com 80</span></span>
<span class="line"><span style="color:#A6ACCD;">GET / HTTP/1.1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#A6ACCD;">Accept-Ranges: bytes</span></span>
<span class="line"><span style="color:#A6ACCD;">Cache-Control: no-cache</span></span>
<span class="line"></span></code></pre></div><h2 id="curl" tabindex="-1">curl <a class="header-anchor" href="#curl" aria-hidden="true">#</a></h2><p>\u901A\u8FC7 <code>curl</code> \u53D1\u9001 HTTP \u8BF7\u6C42\u65F6\uFF0C\u5C06\u4F1A\u81EA\u52A8\u643A\u5E26 <code>HOST</code> \u8BF7\u6C42\u5934\u3002</p><p>\u901A\u8FC7 <code>curl</code> \u6A21\u62DF <code>HOST</code> \u529F\u80FD :</p><ol><li>\u901A\u8FC7 <code>-H HOST:</code> \u5220\u9664 HOST \u8BF7\u6C42\u5934\u3002\u5728 <code>curl</code> \u4E2D\uFF0C\u5982\u679C <code>-H</code> \u6307\u5B9A\u7684\u53C2\u6570\u4EE5 <code>:</code> \u7ED3\u5C3E\uFF0C\u4EE3\u8868\u4E0D\u53D1\u9001\u8BE5\u8BF7\u6C42\u5934\u3002</li><li>\u901A\u8FC7\u8BF7\u6C42 IP \u5730\u5740\uFF0C\u5E76\u901A\u8FC7 <code>-H</code> \u53C2\u6570\u660E\u786E\u6307\u5B9A Host \u5934\u90E8</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ curl -i http.devtool.tech -H HOST:</span></span>
<span class="line"><span style="color:#A6ACCD;">HTTP/1.1 404 Not Found</span></span>
<span class="line"><span style="color:#A6ACCD;">Connection: keep-alive</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Length: 67</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Type: text/plain</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> charset=utf-8</span></span>
<span class="line"><span style="color:#A6ACCD;">Date: Sun, 23 Oct 2022 04:18:47 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;">Server: Vercel</span></span>
<span class="line"><span style="color:#A6ACCD;">X-Vercel-Error: DEPLOYMENT_NOT_FOUND</span></span>
<span class="line"><span style="color:#A6ACCD;">X-Vercel-Id: hnd1::cgcvn-1666498727096-1e18fb504bcb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">The deployment could not be found on Vercel.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">DEPLOYMENT_NOT_FOUND</span></span>
<span class="line"></span></code></pre></div><p>\u4EE5\u4E0B\u662F\u901A\u8FC7 IP + HOST \u7684\u65B9\u5F0F :</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># \u8BF7\u6C42\u6210\u529F</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl http.devtool.tech</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u83B7\u53D6\u5230\u5176 IP \u5730\u5740</span></span>
<span class="line"><span style="color:#A6ACCD;">$ dig +short http.devtool.tech</span></span>
<span class="line"><span style="color:#A6ACCD;">76.223.126.88</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u76F4\u63A5\u8BF7\u6C42 IP\uFF0C\u5BFC\u81F4\u627E\u4E0D\u5230\u8BE5\u5E94\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl 76.223.126.88</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u8BF7\u6C42\u6210\u529F</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl 76.223.126.88 -H </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Host: http.devtool.tech</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div>`,19),e=[o];function t(c,r,C,i,D,A){return a(),n("div",null,e)}const h=s(p,[["render",t]]);export{d as __pageData,h as default};
