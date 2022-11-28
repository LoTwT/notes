import{_ as s,c as n,o as a,a as l}from"./app.a067e1d4.js";const p="/http/message/curl.png",u=JSON.parse('{"title":"curl","description":"","frontmatter":{},"headers":[{"level":2,"title":"curl \u4E0E\u5E38\u89C1\u9009\u9879","slug":"curl-\u4E0E\u5E38\u89C1\u9009\u9879","link":"#curl-\u4E0E\u5E38\u89C1\u9009\u9879","children":[]},{"level":2,"title":"curl --request","slug":"curl-request","link":"#curl-request","children":[]},{"level":2,"title":"curl --head","slug":"curl-head","link":"#curl-head","children":[]},{"level":2,"title":"curl --include","slug":"curl-include","link":"#curl-include","children":[]},{"level":2,"title":"curl --verbose","slug":"curl-verbose","link":"#curl-verbose","children":[]},{"level":2,"title":"curl --location","slug":"curl-location","link":"#curl-location","children":[]},{"level":2,"title":"httpie and examples","slug":"httpie-and-examples","link":"#httpie-and-examples","children":[]}],"relativePath":"http/message/4-curl.md","lastUpdated":1669599731000}'),o={name:"http/message/4-curl.md"},e=l('<h1 id="curl" tabindex="-1">curl <a class="header-anchor" href="#curl" aria-hidden="true">#</a></h1><p><code>curl</code>\uFF0C\u7528\u4E8E\u53D1\u9001\u8BF7\u6C42\u7684\u547D\u4EE4\u884C\u5DE5\u5177\uFF0C\u4E00\u4E2A HTTP \u8BF7\u6C42\u5BA2\u6237\u7AEF ( \u5B9E\u9645\u4E0A\u5B83\u4E5F\u53EF\u4EE5\u505A FTP/SCP/TELNET \u534F\u8BAE\u7684\u4E8B\u60C5 )\u3002\u53EF\u7C7B\u6BD4\u4E8E\u6D4F\u89C8\u5668\u4E2D\u7684 fetch \u3002</p><p><code>curl</code> \u662F\u6700\u4E3A\u6D41\u884C\u7684 HTTP \u8BF7\u6C42\u547D\u4EE4\u884C\u5DE5\u5177\uFF0C\u5728\u8C37\u6B4C\u6D4F\u89C8\u5668\u63A7\u5236\u53F0\u7684\u7F51\u7EDC\u9762\u677F\u4E2D\uFF0C\u53EF\u5C06\u6321\u5899\u8BF7\u6C42\u8F6C\u5316\u4E3A <code>curl</code> \u3002</p><p><img src="'+p+`" alt="curl"></p><p>\u5728\u5B66\u4E60\u4E0E\u8C03\u8BD5 HTTP \u7684\u8FC7\u7A0B\u4E2D\uFF0C\u53EF\u7ED3\u5408 <code>curl</code> \u4E0E <a href="https://httpbin.org/" target="_blank" rel="noreferrer">httpbin</a> \u4E00\u540C\u4F7F\u7528\u3002<code>httpbin</code> \u53EF\u4EE5\u6D4B\u8BD5 HTTP \u5404\u79CD\u65B9\u6CD5\u3001\u72B6\u6001\u7801\u3001\u5934\u90E8\u3001\u57FA\u672C\u8BA4\u8BC1\u53CA\u6458\u8981\u8BA4\u8BC1\u7B49\u3002</p><h2 id="curl-\u4E0E\u5E38\u89C1\u9009\u9879" tabindex="-1">curl \u4E0E\u5E38\u89C1\u9009\u9879 <a class="header-anchor" href="#curl-\u4E0E\u5E38\u89C1\u9009\u9879" aria-hidden="true">#</a></h2><p>\u5982\u679C\u7D27\u8DDF URL\uFF0C\u5219\u76F4\u63A5\u53D1\u9001 GET \u8BF7\u6C42\u3002</p><p>\u4E00\u4E2A\u83B7\u53D6\u5BA2\u6237\u7AEF\u516C\u7F51 IP \u7684\u670D\u52A1 :</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ curl ifconfig.me</span></span>
<span class="line"><span style="color:#A6ACCD;">121.238.99.108</span></span>
<span class="line"></span></code></pre></div><p>\u4E00\u4E9B\u5E38\u89C1\u9009\u9879 :</p><ul><li><code>-X/--request</code> : \u6307\u5B9A\u8BF7\u6C42\u65B9\u6CD5</li><li><code>-I/--head</code> : \u53D1\u9001 HEAD \u8BF7\u6C42</li><li><code>-H/--header</code> : \u6307\u5B9A\u8BF7\u6C42\u5934</li><li><code>-d/--data</code> : \u6307\u5B9A\u8BF7\u6C42\u4F53</li></ul><h2 id="curl-request" tabindex="-1">curl --request <a class="header-anchor" href="#curl-request" aria-hidden="true">#</a></h2><p><code>--request/-X</code>\uFF0C\u6307\u5B9A\u8BF7\u6C42\u65B9\u6CD5\uFF0C\u5982 POST\u3001GET \u7B49\u65B9\u6CD5\uFF0C\u9ED8\u8BA4\u4E3A GET \u8BF7\u6C42\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ curl https://httpbin.org/post -X POST -H </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a: 3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">b: 4</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">args</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: {},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">files</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: {},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">form</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: {},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">headers</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">A</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Accept</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">B</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">4</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Connection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">close</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Host</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">httpbin.org</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">User-Agent</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">curl/7.79.1</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">origin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">118.113.0.137</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://httpbin.org/post</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="curl-head" tabindex="-1">curl --head <a class="header-anchor" href="#curl-head" aria-hidden="true">#</a></h2><p><code>--head/-I</code> \u53D1\u9001 HEAD \u8BF7\u6C42\uFF0C\u53EA\u4F1A\u8FD4\u56DE Response Header\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ curl --head https://shanyue.tech</span></span>
<span class="line"><span style="color:#A6ACCD;">HTTP/2 200</span></span>
<span class="line"><span style="color:#A6ACCD;">server: Tengine</span></span>
<span class="line"><span style="color:#A6ACCD;">content-type: text/html</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> charset=utf-8</span></span>
<span class="line"><span style="color:#A6ACCD;">content-length: 33229</span></span>
<span class="line"><span style="color:#A6ACCD;">vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#A6ACCD;">date: Tue, 21 Jun 2022 05:54:24 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;">vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#A6ACCD;">x-oss-request-id: 62B15D1050ED1C32320FE906</span></span>
<span class="line"><span style="color:#A6ACCD;">x-oss-cdn-auth: success</span></span>
<span class="line"><span style="color:#A6ACCD;">accept-ranges: bytes</span></span>
<span class="line"><span style="color:#A6ACCD;">etag: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">F540C0D57CDB57215AF11970EF4AAEF6</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">last-modified: Wed, 23 Mar 2022 14:57:44 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;">x-oss-object-type: Normal</span></span>
<span class="line"><span style="color:#A6ACCD;">x-oss-hash-crc64ecma: 8545542358272103335</span></span>
<span class="line"><span style="color:#A6ACCD;">x-oss-storage-class: Standard</span></span>
<span class="line"><span style="color:#A6ACCD;">x-oss-meta-mtime: 1648047444.796073379</span></span>
<span class="line"><span style="color:#A6ACCD;">cache-control: no-cache</span></span>
<span class="line"><span style="color:#A6ACCD;">content-md5: 9UDA1XzbVyFa8Rlw70qu9g==</span></span>
<span class="line"><span style="color:#A6ACCD;">x-oss-server-time: 27</span></span>
<span class="line"><span style="color:#A6ACCD;">ali-swift-global-savetime: 1655790864</span></span>
<span class="line"><span style="color:#A6ACCD;">via: cache12.l2cn3051</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">290,290,200-0,M</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">, cache4.l2cn3051</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">291,0</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">, kunlun6.cn3145</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">383,382,200-0,M</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">, kunlun3.cn3145</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">386,0</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">x-cache: MISS TCP_MISS dirn:-2:-2</span></span>
<span class="line"><span style="color:#A6ACCD;">x-swift-savetime: Tue, 21 Jun 2022 05:54:24 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;">x-swift-cachetime: 0</span></span>
<span class="line"><span style="color:#A6ACCD;">timing-allow-origin: </span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#A6ACCD;">eagleid: 791d26a916557908641262834e</span></span>
<span class="line"></span></code></pre></div><h2 id="curl-include" tabindex="-1">curl --include <a class="header-anchor" href="#curl-include" aria-hidden="true">#</a></h2><p><code>--include/-i</code>\uFF0C\u6253\u5370 Response Header \u4E0E Response Body\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#A6ACCD;">access-control-allow-origin: </span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#A6ACCD;">content-type: text/plain</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> charset=utf-8</span></span>
<span class="line"><span style="color:#A6ACCD;">content-length: 15</span></span>
<span class="line"><span style="color:#A6ACCD;">date: Wed, 17 Aug 2022 01:56:20 GMT</span></span>
<span class="line"><span style="color:#A6ACCD;">x-envoy-upstream-service-time: 1</span></span>
<span class="line"><span style="color:#A6ACCD;">strict-transport-security: max-age=2592000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> includeSubDomains</span></span>
<span class="line"><span style="color:#A6ACCD;">server: istio-envoy</span></span>
<span class="line"><span style="color:#A6ACCD;">Via: 1.1 google</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">222.222.222.113%</span></span>
<span class="line"></span></code></pre></div><h2 id="curl-verbose" tabindex="-1">curl --verbose <a class="header-anchor" href="#curl-verbose" aria-hidden="true">#</a></h2><p><code>--verbose/-v</code>\uFF0C\u67E5\u770B\u53D1\u9001\u62A5\u6587\u53CA TLS handshake \u7684\u8BE6\u7EC6\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># \u6709\u7684\u547D\u4EE4 -v \u662F\u4E00\u7EA7\u8BE6\u7EC6\u65E5\u5FD7\uFF0C-vv \u662F\u66F4\u8BE6\u7EC6\uFF0C-vvv \u662F\u66F4\u66F4\u8BE6\u7EC6</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl -vvv --head https://shanyue.tech</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> Rebuilt URL to: https://shanyue.tech/</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">   Trying 218.91.183.88...</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TCP_NODELAY </span><span style="color:#82AAFF;">set</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> Connected to shanyue.tech </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">218.91.183.88</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> port 443 </span><span style="color:#89DDFF;">(</span><span style="color:#676E95;">#0)</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> ALPN, offering h2</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> ALPN, offering http/1.1</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> successfully </span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;"> certificate verify locations:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">   CAfile: /etc/pki/tls/certs/ca-bundle.crt</span></span>
<span class="line"><span style="color:#A6ACCD;">  CApath: none</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">OUT</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, Client hello </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">1</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">IN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, Server hello </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">2</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">IN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">no content</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">0</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">IN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, Encrypted Extensions </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">8</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">IN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">no content</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">0</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">IN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, Certificate </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">11</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">IN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">no content</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">0</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">IN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, CERT verify </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">15</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">IN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">no content</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">0</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">IN</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, Finished </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">20</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">OUT</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS change cipher, Change cipher spec </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">1</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">OUT</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">no content</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">0</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> TLSv1.3 </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">OUT</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">, TLS handshake, Finished </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">20</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> ALPN, server accepted to use h2</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> Server certificate:</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">  subject: CN=shanyue.tech</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">  start date: Feb  5 00:00:00 2022 GMT</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">  expire date: Feb  6 23:59:59 2023 GMT</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">  subjectAltName: host </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">shanyue.tech</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> matched cert</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">s &quot;shanyue.tech&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">*  issuer: C=US; O=DigiCert Inc; OU=www.digicert.com; CN=Encryption Everywhere DV TLS CA - G1</span></span>
<span class="line"><span style="color:#C3E88D;">*  SSL certificate verify ok.</span></span>
<span class="line"><span style="color:#C3E88D;">* Using HTTP2, server supports multi-use</span></span>
<span class="line"><span style="color:#C3E88D;">* Connection state changed (HTTP/2 confirmed)</span></span>
<span class="line"><span style="color:#C3E88D;">* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (OUT), TLS app data, [no content] (0):</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (OUT), TLS app data, [no content] (0):</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (OUT), TLS app data, [no content] (0):</span></span>
<span class="line"><span style="color:#C3E88D;">* Using Stream ID: 1 (easy handle 0x55c5a8e24690)</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (OUT), TLS app data, [no content] (0):</span></span>
<span class="line"><span style="color:#C3E88D;">&gt; HEAD / HTTP/2</span></span>
<span class="line"><span style="color:#C3E88D;">&gt; Host: shanyue.tech</span></span>
<span class="line"><span style="color:#C3E88D;">&gt; User-Agent: curl/7.61.1</span></span>
<span class="line"><span style="color:#C3E88D;">&gt; Accept: */*</span></span>
<span class="line"><span style="color:#C3E88D;">&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (IN), TLS handshake, [no content] (0):</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (IN), TLS handshake, [no content] (0):</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (IN), TLS app data, [no content] (0):</span></span>
<span class="line"><span style="color:#C3E88D;">* Connection state changed (MAX_CONCURRENT_STREAMS == 128)!</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (OUT), TLS app data, [no content] (0):</span></span>
<span class="line"><span style="color:#C3E88D;">* TLSv1.3 (IN), TLS app data, [no content] (0):</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; HTTP/2 200</span></span>
<span class="line"><span style="color:#C3E88D;">HTTP/2 200</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; server: Tengine</span></span>
<span class="line"><span style="color:#C3E88D;">server: Tengine</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; content-type: text/html; charset=utf-8</span></span>
<span class="line"><span style="color:#C3E88D;">content-type: text/html; charset=utf-8</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; content-length: 33229</span></span>
<span class="line"><span style="color:#C3E88D;">content-length: 33229</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#C3E88D;">vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; date: Tue, 21 Jun 2022 06:02:59 GMT</span></span>
<span class="line"><span style="color:#C3E88D;">date: Tue, 21 Jun 2022 06:02:59 GMT</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#C3E88D;">vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-oss-request-id: 62B15F13F15BB231391FB3A8</span></span>
<span class="line"><span style="color:#C3E88D;">x-oss-request-id: 62B15F13F15BB231391FB3A8</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-oss-cdn-auth: success</span></span>
<span class="line"><span style="color:#C3E88D;">x-oss-cdn-auth: success</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; accept-ranges: bytes</span></span>
<span class="line"><span style="color:#C3E88D;">accept-ranges: bytes</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; etag: &quot;F540C0D57CDB57215AF11970EF4AAEF6&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">etag: &quot;F540C0D57CDB57215AF11970EF4AAEF6&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; last-modified: Wed, 23 Mar 2022 14:57:44 GMT</span></span>
<span class="line"><span style="color:#C3E88D;">last-modified: Wed, 23 Mar 2022 14:57:44 GMT</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-oss-object-type: Normal</span></span>
<span class="line"><span style="color:#C3E88D;">x-oss-object-type: Normal</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-oss-hash-crc64ecma: 8545542358272103335</span></span>
<span class="line"><span style="color:#C3E88D;">x-oss-hash-crc64ecma: 8545542358272103335</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-oss-storage-class: Standard</span></span>
<span class="line"><span style="color:#C3E88D;">x-oss-storage-class: Standard</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-oss-meta-mtime: 1648047444.796073379</span></span>
<span class="line"><span style="color:#C3E88D;">x-oss-meta-mtime: 1648047444.796073379</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; cache-control: no-cache</span></span>
<span class="line"><span style="color:#C3E88D;">cache-control: no-cache</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; content-md5: 9UDA1XzbVyFa8Rlw70qu9g==</span></span>
<span class="line"><span style="color:#C3E88D;">content-md5: 9UDA1XzbVyFa8Rlw70qu9g==</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-oss-server-time: 3</span></span>
<span class="line"><span style="color:#C3E88D;">x-oss-server-time: 3</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; ali-swift-global-savetime: 1655791379</span></span>
<span class="line"><span style="color:#C3E88D;">ali-swift-global-savetime: 1655791379</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; via: cache24.l2et15-1[66,66,200-0,M], cache44.l2et15-1[67,0], cache27.cn4056[128,128,200-0,M], cache64.cn4056[130,0]</span></span>
<span class="line"><span style="color:#C3E88D;">via: cache24.l2et15-1[66,66,200-0,M], cache44.l2et15-1[67,0], cache27.cn4056[128,128,200-0,M], cache64.cn4056[130,0]</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-cache: MISS TCP_MISS dirn:-2:-2</span></span>
<span class="line"><span style="color:#C3E88D;">x-cache: MISS TCP_MISS dirn:-2:-2</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-swift-savetime: Tue, 21 Jun 2022 06:02:59 GMT</span></span>
<span class="line"><span style="color:#C3E88D;">x-swift-savetime: Tue, 21 Jun 2022 06:02:59 GMT</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; x-swift-cachetime: 0</span></span>
<span class="line"><span style="color:#C3E88D;">x-swift-cachetime: 0</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; timing-allow-origin: *</span></span>
<span class="line"><span style="color:#C3E88D;">timing-allow-origin: *</span></span>
<span class="line"><span style="color:#C3E88D;">&lt; eagleid: 088432cc16557913793393217e</span></span>
<span class="line"><span style="color:#C3E88D;">eagleid: 088432cc16557913793393217e</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">&lt;</span></span>
<span class="line"><span style="color:#C3E88D;">* Connection #0 to host shanyue.tech left intact</span></span>
<span class="line"></span></code></pre></div><h2 id="curl-location" tabindex="-1">curl --location <a class="header-anchor" href="#curl-location" aria-hidden="true">#</a></h2><p><code>--location/-L</code>\uFF0C\u8FFD\u8E2A\u91CD\u5B9A\u5411\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># \u91CD\u5B9A\u5411\u4E24\u6B21\u540E\u8BF7\u6C42\u5230\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl --location http://zhihu.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u53EF\u4F7F\u7528 --head\uFF0C\u67E5\u770B\u5230\u4E09\u6B21\u54CD\u5E94</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl --head --location http://zhihu.com</span></span>
<span class="line"></span></code></pre></div><h2 id="httpie-and-examples" tabindex="-1">httpie and examples <a class="header-anchor" href="#httpie-and-examples" aria-hidden="true">#</a></h2><p><a href="https://httpie.io/" target="_blank" rel="noreferrer">httpie</a> \u662F\u66F4\u73B0\u4EE3\u5316\u66F4\u4E3A\u6D41\u884C\u7684\u4E00\u4E2A HTTP \u5BA2\u6237\u7AEF\uFF0C\u652F\u6301\u8272\u5F69\u3001JSON \u7B49\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># \u53D1\u9001 JSON \u6570\u636E\u7ED9\u670D\u52A1\u5668\u7AEF\uFF0Chttpie \u6BD4 curl \u65B9\u4FBF\u5F88\u591A\uFF0C\u4E0D\u9700\u8981\u81EA\u5DF1\u624B\u5199 header\uFF0Ccurl \u9ED8\u8BA4\u4E3A application/x-www-form-urlencoded</span></span>
<span class="line"><span style="color:#A6ACCD;">$ http POST httpbin.org/post </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a: 3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> name=shanyue</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl -X POST httpbin.org/post -H </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a: 3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">content-type: application/json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{&quot;name&quot;: &quot;shanyue&quot;}</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u53D1\u9001 Form \u6570\u636E\u7ED9\u670D\u52A1\u5668\u7AEF\uFF0Ccurl/httpie \u90FD\u6BD4\u8F83\u65B9\u4FBF</span></span>
<span class="line"><span style="color:#A6ACCD;">$ http -f POST httpbin.org/post </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a: 3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> name=shanyue</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl -X POST httpbin.org/post -H </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">a: 3</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> -d name=shanyue</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u4E0A\u4F20\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">$ http POST httpbin.org/post </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> Readme.md</span></span>
<span class="line"><span style="color:#A6ACCD;">$ curl -X POST httpbin.org/post -H </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">content-type: application/json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> -d @Readme.md</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># multipart \u4E0A\u4F20\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">$ http --multipart httpbin.org/post a=3 b@</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Readme.md</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div>`,29),c=[e];function t(r,D,y,C,i,A){return a(),n("div",null,c)}const h=s(o,[["render",t]]);export{u as __pageData,h as default};
