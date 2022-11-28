import{_ as s,c as n,o as a,a as l}from"./app.a067e1d4.js";const F=JSON.parse('{"title":"HTTP \u62A5\u6587\u6A21\u62DF","description":"","frontmatter":{},"headers":[{"level":2,"title":"nc / telnet","slug":"nc-telnet","link":"#nc-telnet","children":[]},{"level":2,"title":"HTTP \u62A5\u6587\u6D4B\u8BD5","slug":"http-\u62A5\u6587\u6D4B\u8BD5","link":"#http-\u62A5\u6587\u6D4B\u8BD5","children":[]}],"relativePath":"http/message/2-message-simulation.md","lastUpdated":1669599731000}'),p={name:"http/message/2-message-simulation.md"},o=l(`<h1 id="http-\u62A5\u6587\u6A21\u62DF" tabindex="-1">HTTP \u62A5\u6587\u6A21\u62DF <a class="header-anchor" href="#http-\u62A5\u6587\u6A21\u62DF" aria-hidden="true">#</a></h1><h2 id="nc-telnet" tabindex="-1">nc / telnet <a class="header-anchor" href="#nc-telnet" aria-hidden="true">#</a></h2><p>nc ( netcat \u7684\u7B80\u79F0 )\u4EE5\u53CA telnet \u80FD\u591F\u8FDE\u63A5 TCP/UDP \u7AEF\u53E3\u53F7\u4E0E\u5176\u901A\u4FE1\uFF0C\u4E5F\u53EF\u7528\u4E8E\u7AEF\u53E3\u8FDE\u901A\u6027\u6D4B\u8BD5\u3002</p><p>\u4E24\u4E2A\u547D\u4EE4\u6709\u53EF\u80FD\u9700\u8981\u901A\u8FC7\u624B\u52A8\u5B89\u88C5\u3002</p><h2 id="http-\u62A5\u6587\u6D4B\u8BD5" tabindex="-1">HTTP \u62A5\u6587\u6D4B\u8BD5 <a class="header-anchor" href="#http-\u62A5\u6587\u6D4B\u8BD5" aria-hidden="true">#</a></h2><p>\u901A\u5E38\uFF0CHTTP \u9ED8\u8BA4\u76D1\u542C\u7684\u662F 80 \u7AEF\u53E3\uFF0C\u53EF\u4EE5\u901A\u8FC7 <code>nc</code> \u4E0E\u7F51\u7AD9\u7684 80 \u7AEF\u53E3\u76F4\u63A5\u901A\u8FC7 HTTP \u62A5\u6587\u8FDB\u884C\u901A\u4FE1\u3002</p><p>\u8F93\u5165 <code>nc httpbin.org 80</code> \u540E\u56DE\u8F66\uFF0C\u968F\u540E\u624B\u52A8\u8F93\u5165 HTTP \u8BF7\u6C42\u62A5\u6587\uFF0C<code>nc</code> \u5C06\u6253\u5370\u51FA\u54CD\u5E94\u62A5\u6587\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ brew install nc</span></span>
<span class="line"><span style="color:#A6ACCD;">$ brew install telnet</span></span>
<span class="line"></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># \u4EE5\u4E0B\u4E09\u884C\u90FD\u8981\u8F93\u5165\uFF0C\u53EF\u7528 shift + enter \u6362\u884C\u8F93\u5165</span></span>
<span class="line"><span style="color:#A6ACCD;">$ nc httpbin.org 80</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /get HTTP/1.1</span></span>
<span class="line"><span style="color:#A6ACCD;">Host: httpbin.org</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#A6ACCD;">Date: Wed, 21 Sep 2022 07:16:25 GMT</span></span>
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
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://httpbin.org/get</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u901A\u8FC7 <code>telnet</code> \u540C\u6837\u53EF\u4EE5\u8FBE\u5230\u6548\u679C\uFF0C\u4F46\u4E00\u822C\u5EFA\u8BAE\u7528 <code>nc</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ telnet httpbin.org 80</span></span>
<span class="line"><span style="color:#A6ACCD;">Trying 18.207.88.57...</span></span>
<span class="line"><span style="color:#A6ACCD;">Connected to httpbin.org.</span></span>
<span class="line"><span style="color:#A6ACCD;">Escape character is </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">^]</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#676E95;"># \u4EE5\u4E0B\u4E24\u884C\u9700\u8981\u8F93\u5165</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /get HTTP/1.1</span></span>
<span class="line"><span style="color:#A6ACCD;">Host: httpbin.org</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#A6ACCD;">Date: Wed, 21 Sep 2022 07:22:36 GMT</span></span>
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
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://httpbin.org/get</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,11),e=[o];function t(c,r,D,i,C,A){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{F as __pageData,d as default};
