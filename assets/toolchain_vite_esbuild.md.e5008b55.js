import{_ as s,c as n,o as a,a as l}from"./app.a067e1d4.js";const u=JSON.parse('{"title":"esbuild","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4E3A\u4EC0\u4E48 esbuild \u6027\u80FD\u6781\u9AD8\uFF1F","slug":"\u4E3A\u4EC0\u4E48-esbuild-\u6027\u80FD\u6781\u9AD8","link":"#\u4E3A\u4EC0\u4E48-esbuild-\u6027\u80FD\u6781\u9AD8","children":[]},{"level":2,"title":"API","slug":"api","link":"#api","children":[{"level":3,"title":"build\u3001buildAsync\u3001serve","slug":"build\u3001buildasync\u3001serve","link":"#build\u3001buildasync\u3001serve","children":[]},{"level":3,"title":"transform","slug":"transform","link":"#transform","children":[]}]},{"level":2,"title":"\u63D2\u4EF6","slug":"\u63D2\u4EF6","link":"#\u63D2\u4EF6","children":[{"level":3,"title":"\u94A9\u5B50\u51FD\u6570","slug":"\u94A9\u5B50\u51FD\u6570","link":"#\u94A9\u5B50\u51FD\u6570","children":[]}]}],"relativePath":"toolchain/vite/esbuild.md","lastUpdated":1669599731000}'),p={name:"toolchain/vite/esbuild.md"},o=l(`<h1 id="esbuild" tabindex="-1">esbuild <a class="header-anchor" href="#esbuild" aria-hidden="true">#</a></h1><h2 id="\u4E3A\u4EC0\u4E48-esbuild-\u6027\u80FD\u6781\u9AD8" tabindex="-1">\u4E3A\u4EC0\u4E48 esbuild \u6027\u80FD\u6781\u9AD8\uFF1F <a class="header-anchor" href="#\u4E3A\u4EC0\u4E48-esbuild-\u6027\u80FD\u6781\u9AD8" aria-hidden="true">#</a></h2><p>\u539F\u56E0\uFF1A</p><ol><li>\u4F7F\u7528 Golang \u5F00\u53D1\u3002\u6784\u5EFA\u903B\u8F91\u4EE3\u7801\u76F4\u63A5\u88AB\u7F16\u8BD1\u4E3A\u539F\u751F\u673A\u5668\u7801\uFF0C\u800C\u4E0D\u7528\u50CF JS \u4E00\u6837\u5148\u4EE3\u7801\u89E3\u6790\u4E3A\u5B57\u8282\u7801\uFF0C\u7136\u540E\u8F6C\u6362\u4E3A\u673A\u5668\u7801\uFF0C\u5927\u5927\u8282\u7701\u4E86\u7A0B\u5E8F\u8FD0\u884C\u65F6\u95F4</li><li>\u591A\u6838\u5E76\u884C\u3002\u5185\u90E8\u6253\u5305\u7B97\u6CD5\u5145\u5206\u5229\u7528\u591A\u6838 CPU \u4F18\u52BF\uFF0C\u6240\u6709\u7684\u6B65\u9AA4\u5C3D\u53EF\u80FD\u5E76\u884C\uFF0C\u8FD9\u8981\u662F\u5F97\u76CA\u4E8E Go \u5F53\u4E2D\u591A\u7EBF\u7A0B\u5171\u4EAB\u5185\u5B58\u7684\u4F18\u52BF</li><li>\u4ECE\u96F6\u9020\u8F6E\u5B50\u3002\u51E0\u4E4E\u6CA1\u6709\u4F7F\u7528\u4EFB\u4F55\u7B2C\u4E09\u65B9\u5E93\uFF0C\u6240\u6709\u903B\u8F91\u81EA\u5DF1\u7F16\u5199\uFF0C\u5927\u5230 AST \u89E3\u6790\uFF0C\u5C0F\u5230\u5B57\u7B26\u4E32\u7684\u64CD\u4F5C\uFF0C\u4FDD\u8BC1\u6781\u81F4\u7684\u4EE3\u7801\u6027\u80FD</li><li>\u9AD8\u6548\u7684\u5185\u5B58\u5229\u7528\u3002esbuild \u4E2D\u4ECE\u5934\u5230\u5C3E\u5C3D\u53EF\u80FD\u5730\u590D\u7528\u4E00\u4EFD AST \u8282\u70B9\u6570\u636E\uFF0C\u800C\u4E0D\u7528\u50CF JS \u6253\u5305\u5DE5\u5177\u4E2D\u9891\u7E41\u5730\u89E3\u6790\u548C\u4F20\u9012 AST \u6570\u636E ( \u5982 string -&gt; TS -&gt; JS -&gt; string ) \uFF0C\u9020\u6210\u5185\u5B58\u7684\u5927\u91CF\u6D6A\u8D39</li></ol><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h2><h3 id="build\u3001buildasync\u3001serve" tabindex="-1">build\u3001buildAsync\u3001serve <a class="header-anchor" href="#build\u3001buildasync\u3001serve" aria-hidden="true">#</a></h3><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> build</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> buildSync</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> serve </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">esbuild</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">runBuild</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5F02\u6B65\u65B9\u6CD5\uFF0C\u8FD4\u56DE\u4E00\u4E2A Promise</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">build</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// ----  \u5982\u4E0B\u662F\u4E00\u4E9B\u5E38\u89C1\u7684\u914D\u7F6E  ---</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u5F53\u524D\u9879\u76EE\u6839\u76EE\u5F55</span></span>
<span class="line"><span style="color:#F07178;">    absWorkingDir</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cwd</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u5165\u53E3\u6587\u4EF6\u5217\u8868\uFF0C\u4E3A\u4E00\u4E2A\u6570\u7EC4</span></span>
<span class="line"><span style="color:#F07178;">    entryPoints</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./src/index.jsx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u6253\u5305\u4EA7\u7269\u76EE\u5F55</span></span>
<span class="line"><span style="color:#F07178;">    outdir</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dist</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u662F\u5426\u9700\u8981\u6253\u5305\uFF0C\u4E00\u822C\u8BBE\u4E3A true</span></span>
<span class="line"><span style="color:#F07178;">    bundle</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u6A21\u5757\u683C\u5F0F\uFF0C\u5305\u62EC\`esm\`\u3001\`commonjs\`\u548C\`iife\`</span></span>
<span class="line"><span style="color:#F07178;">    format</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">esm</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u9700\u8981\u6392\u9664\u6253\u5305\u7684\u4F9D\u8D56\u5217\u8868</span></span>
<span class="line"><span style="color:#F07178;">    external</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u662F\u5426\u5F00\u542F\u81EA\u52A8\u62C6\u5305</span></span>
<span class="line"><span style="color:#F07178;">    splitting</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u662F\u5426\u751F\u6210 SourceMap \u6587\u4EF6</span></span>
<span class="line"><span style="color:#F07178;">    sourcemap</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u662F\u5426\u751F\u6210\u6253\u5305\u7684\u5143\u4FE1\u606F\u6587\u4EF6</span></span>
<span class="line"><span style="color:#F07178;">    metafile</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u662F\u5426\u8FDB\u884C\u4EE3\u7801\u538B\u7F29</span></span>
<span class="line"><span style="color:#F07178;">    minify</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u662F\u5426\u5F00\u542F watch \u6A21\u5F0F\uFF0C\u5728 watch \u6A21\u5F0F\u4E0B\u4EE3\u7801\u53D8\u52A8\u5219\u4F1A\u89E6\u53D1\u91CD\u65B0\u6253\u5305</span></span>
<span class="line"><span style="color:#F07178;">    watch</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u662F\u5426\u5C06\u4EA7\u7269\u5199\u5165\u78C1\u76D8</span></span>
<span class="line"><span style="color:#F07178;">    write</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// Esbuild \u5185\u7F6E\u4E86\u4E00\u7CFB\u5217\u7684 loader\uFF0C\u5305\u62EC base64\u3001binary\u3001css\u3001dataurl\u3001file\u3001js(x)\u3001ts(x)\u3001text\u3001json</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u9488\u5BF9\u4E00\u4E9B\u7279\u6B8A\u7684\u6587\u4EF6\uFF0C\u8C03\u7528\u4E0D\u540C\u7684 loader \u8FDB\u884C\u52A0\u8F7D</span></span>
<span class="line"><span style="color:#F07178;">    loader</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">.png</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">base64</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">runBuild</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre></div><p>\u4E0D\u63A8\u8350\u4F7F\u7528 <code>buildSync</code> \u8FD9\u79CD\u540C\u6B65\u7684 API \uFF0C\u5B83\u4EEC\u4F1A\u5BFC\u81F4\u4E24\u65B9\u9762\u4E0D\u826F\u540E\u679C\uFF1A</p><ol><li>\u4E00\u65B9\u9762\u5BB9\u6613\u4F7F esbuild \u5728\u5F53\u524D\u7EBF\u7A0B\u963B\u585E\uFF0C\u4E27\u5931\u5E76\u53D1\u4EFB\u52A1\u5904\u7406\u7684\u4F18\u52BF</li><li>\u53E6\u4E00\u65B9\u9762\uFF0Cesbuild \u6240\u6709\u63D2\u4EF6\u4E2D\u90FD\u4E0D\u80FD\u4F7F\u7528\u4EFB\u4F55\u5F02\u6B65\u64CD\u4F5C\uFF0C\u7ED9\u63D2\u4EF6\u5F00\u53D1\u589E\u52A0\u4E86\u9650\u5236</li></ol><p>serve API \u7684\u7279\u70B9\uFF1A</p><ol><li>\u5F00\u542F serve \u6A21\u5F0F\u540E\uFF0C\u5C06\u5728\u6307\u5B9A\u7684\u7AEF\u53E3\u548C\u76EE\u5F55\u4E0A\u642D\u5EFA\u4E00\u4E2A\u9759\u6001\u6587\u4EF6\u670D\u52A1\uFF0C\u8FD9\u4E2A\u670D\u52A1\u5668\u7528\u539F\u751F Go \u8BED\u8A00\u5B9E\u73B0\uFF0C\u6027\u80FD\u6BD4 Node.js \u66F4\u9AD8</li><li>\u7C7B\u4F3C webpack-dev-server \uFF0C\u6240\u6709\u7684\u4EA7\u7269\u6587\u4EF6\u90FD\u9ED8\u8BA4\u4E0D\u4F1A\u5199\u5230\u78C1\u76D8\uFF0C\u800C\u662F\u653E\u5728\u5185\u5B58\u4E2D\uFF0C\u901A\u8FC7\u8BF7\u6C42\u670D\u52A1\u8BBF\u95EE</li><li>\u6BCF\u6B21\u8BF7\u6C42\u5230\u6765\u65F6\uFF0C\u90FD\u4F1A\u8FDB\u884C\u91CD\u65B0\u6784\u5EFA ( rebuild ) \uFF0C\u6C38\u8FDC\u8FD4\u56DE\u65B0\u7684\u4EA7\u7269</li></ol><blockquote><p>\u89E6\u53D1 rebuild \u7684\u6761\u4EF6\u4E0D\u662F\u4EE3\u7801\u6539\u52A8\uFF0C\u800C\u662F\u65B0\u7684\u8BF7\u6C42\u5230\u6765</p></blockquote><h3 id="transform" tabindex="-1">transform <a class="header-anchor" href="#transform" aria-hidden="true">#</a></h3><p>\u9664\u4E86\u9879\u76EE\u7684\u6253\u5305\u529F\u80FD\uFF0Cesbuild \u8FD8\u4E13\u95E8\u63D0\u4F9B\u4E86\u5355\u6587\u4EF6\u7F16\u8BD1\u7684\u80FD\u529B\uFF0C\u5373 <code>transform API</code> \uFF0C\u540C\u6837\u5305\u542B\u4E86\u540C\u6B65\u548C\u5F02\u6B65\u4E24\u4E2A\u65B9\u6CD5\uFF0C\u4E3A <code>transform</code> \u548C <code>transformSync</code> \u3002</p><p>\u540C\u6B65\u7684 <code>transformSync</code> \u540C\u6837\u4F1A\u4F7F esbuild \u4E27\u5931\u5E76\u53D1\u4EFB\u52A1\u5904\u7406\u7684\u4F18\u52BF\u3002</p><h2 id="\u63D2\u4EF6" tabindex="-1">\u63D2\u4EF6 <a class="header-anchor" href="#\u63D2\u4EF6" aria-hidden="true">#</a></h2><p>\u63D2\u4EF6\u5F00\u53D1\u5176\u5B9E\u5C31\u662F\u57FA\u4E8E\u539F\u6709\u7684\u4F53\u7CFB\u7ED3\u6784\u4E2D\u8FDB\u884C\u6269\u5C55\u548C\u81EA\u5B9A\u4E49\u3002</p><p>esbuild \u63D2\u4EF6\u7ED3\u6784\u88AB\u8BBE\u8BA1\u4E3A\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u91CC\u9762\u6709 name \u548C setup \u4E24\u4E2A\u5C5E\u6027\uFF0Cname \u662F\u63D2\u4EF6\u7684\u540D\u79F0\uFF0Csetup \u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u5176\u4E2D\u5165\u53C2\u662F\u4E00\u4E2A build \u5BF9\u8C61\uFF0C\u8FD9\u4E2A\u5BF9\u8C61\u4E0A\u6302\u8F7D\u4E86\u4E00\u4E9B\u94A9\u5B50\u53EF\u4F9B\u81EA\u5B9A\u4E49\u94A9\u5B50\u51FD\u6570\u903B\u8F91\u3002</p><h3 id="\u94A9\u5B50\u51FD\u6570" tabindex="-1">\u94A9\u5B50\u51FD\u6570 <a class="header-anchor" href="#\u94A9\u5B50\u51FD\u6570" aria-hidden="true">#</a></h3><ul><li>onResolve \u63A7\u5236\u8DEF\u5F84\u89E3\u6790</li><li>onLoad \u63A7\u5236\u6A21\u5757\u5185\u5BB9\u52A0\u8F7D</li></ul><p>\u8FD9\u4E24\u4E2A\u94A9\u5B50\u51FD\u6570\u4E2D\u90FD\u9700\u8981\u4F20\u5165\u4E24\u4E2A\u53C2\u6570\uFF1AOptions \u548C Callback \u3002</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Options</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">filter</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RegExp</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">namespace</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>filter \u4E3A\u5FC5\u4F20\u53C2\u6570\uFF0C\u662F\u4E00\u4E2A\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u5B83\u51B3\u5B9A\u4E86\u8981\u8FC7\u6EE4\u51FA\u7684\u7279\u5F81\u6587\u4EF6\u3002</p><blockquote><p>\u63D2\u4EF6\u4E2D\u7684 filter \u6B63\u5219\u662F\u4F7F\u7528 Go \u539F\u751F\u6B63\u5219\u5B9E\u73B0\u7684\uFF0C\u4E3A\u4E86\u4E0D\u4F7F\u6027\u80FD\u8FC7\u4E8E\u52A3\u5316\uFF0C\u89C4\u5219\u5E94\u8BE5\u5C3D\u53EF\u80FD\u4E25\u683C\u3002\u540C\u65F6\u5B83\u672C\u8EAB\u548C JS \u7684\u6B63\u5219\u4E5F\u6709\u6240\u533A\u522B\uFF0C\u4E0D\u652F\u6301\u524D\u77BB ( ?&lt;= ) \u3001\u540E\u987E ( ?= ) \u548C\u53CD\u5411\u5F15\u7528 ( \\1 ) \u8FD9\u4E09\u79CD\u89C4\u5219\u3002</p></blockquote><p>namespace \u4E3A\u9009\u586B\u53C2\u6570\uFF0C\u4E00\u822C\u5728 onResolve \u94A9\u5B50\u4E2D\u7684\u4F1A\u6389\u53C2\u6570\u8FD4\u56DE namespace \u5C5E\u6027\u4F5C\u4E3A\u6807\u8BC6\uFF0C\u53EF\u4EE5\u5728 onLoad \u94A9\u5B50\u4E2D\u901A\u8FC7 namespace \u5C06\u6A21\u5757\u8FC7\u6EE4\u51FA\u6765\u3002</p><p>Callback \uFF0C\u5B83\u7684\u7C7B\u578B\u6839\u636E\u4E0D\u540C\u7684\u94A9\u5B50\u4F1A\u6709\u6240\u4E0D\u540C\u3002</p><ul><li>onStart \u6784\u5EFA\u5F00\u59CB</li><li>onEnd \u6784\u5EFA\u7ED3\u675F</li></ul><p>\u6CE8\u610F\uFF1A</p><ol><li>onStart \u7684\u6267\u884C\u65F6\u673A\u662F\u5728\u6BCF\u6B21 build \u7684\u65F6\u5019\uFF0C\u5305\u62EC\u89E6\u53D1 watch \u548C serve \u6A21\u5F0F\u7684\u91CD\u65B0\u6784\u5EFA</li><li>onEnd \u5982\u679C\u8981\u62FF\u5230 metafile \uFF0C\u5FC5\u987B\u5C06 esbuild \u7684\u6784\u5EFA\u914D\u7F6E\u4E2D metafile \u5C5E\u6027\u8BBE\u4E3A true</li></ol>`,29),e=[o];function t(c,r,i,F,y,D){return a(),n("div",null,e)}const A=s(p,[["render",t]]);export{u as __pageData,A as default};
