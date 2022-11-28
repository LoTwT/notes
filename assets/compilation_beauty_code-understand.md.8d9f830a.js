import{_ as s,c as a,o as n,a as l}from"./app.a067e1d4.js";const e="/compilation/beauty/front-back-end.jpg",o="/assets/syntactic-analysis.724c3c2a.jpg",p="/assets/ast-build.ecddafa7.jpg",A=JSON.parse('{"title":"\u7406\u89E3\u4EE3\u7801: \u7F16\u8BD1\u5668\u7684\u524D\u7AEF\u6280\u672F","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u8BCD\u6CD5\u5206\u6790 ( Lexical Analysis )","slug":"\u8BCD\u6CD5\u5206\u6790-lexical-analysis","link":"#\u8BCD\u6CD5\u5206\u6790-lexical-analysis","children":[{"level":3,"title":"\u5982\u4F55\u8BFB\u61C2\u4E00\u6BB5\u4EE3\u7801\uFF1F","slug":"\u5982\u4F55\u8BFB\u61C2\u4E00\u6BB5\u4EE3\u7801","link":"#\u5982\u4F55\u8BFB\u61C2\u4E00\u6BB5\u4EE3\u7801","children":[]},{"level":3,"title":"\u5982\u4F55\u5199\u4E00\u4E2A\u7A0B\u5E8F\u6765\u8BC6\u522B Token \u5462\uFF1F","slug":"\u5982\u4F55\u5199\u4E00\u4E2A\u7A0B\u5E8F\u6765\u8BC6\u522B-token-\u5462","link":"#\u5982\u4F55\u5199\u4E00\u4E2A\u7A0B\u5E8F\u6765\u8BC6\u522B-token-\u5462","children":[]}]},{"level":2,"title":"\u8BED\u6CD5\u5206\u6790 ( Syntactic Analysis, or Parsing )","slug":"\u8BED\u6CD5\u5206\u6790-syntactic-analysis-or-parsing","link":"#\u8BED\u6CD5\u5206\u6790-syntactic-analysis-or-parsing","children":[{"level":3,"title":"\u6784\u9020 AST","slug":"\u6784\u9020-ast","link":"#\u6784\u9020-ast","children":[]}]},{"level":2,"title":"\u8BED\u4E49\u5206\u6790 ( Semantic Analysis )","slug":"\u8BED\u4E49\u5206\u6790-semantic-analysis","link":"#\u8BED\u4E49\u5206\u6790-semantic-analysis","children":[]},{"level":2,"title":"\u5C0F\u7ED3","slug":"\u5C0F\u7ED3","link":"#\u5C0F\u7ED3","children":[]}],"relativePath":"compilation/beauty/code-understand.md","lastUpdated":1669599731000}'),t={name:"compilation/beauty/code-understand.md"},c=l('<h1 id="\u7406\u89E3\u4EE3\u7801-\u7F16\u8BD1\u5668\u7684\u524D\u7AEF\u6280\u672F" tabindex="-1">\u7406\u89E3\u4EE3\u7801: \u7F16\u8BD1\u5668\u7684\u524D\u7AEF\u6280\u672F <a class="header-anchor" href="#\u7406\u89E3\u4EE3\u7801-\u7F16\u8BD1\u5668\u7684\u524D\u7AEF\u6280\u672F" aria-hidden="true">#</a></h1><p>\u7F16\u8BD1\u5668\u7684\u524D\u7AEF\u6280\u672F\uFF0C\u6307\u7684\u662F\u7F16\u8BD1\u5668\u5BF9\u7A0B\u5E8F\u4EE3\u7801\u7684\u5206\u6790\u548C\u7406\u89E3\u8FC7\u7A0B\u3002\u5B83\u901A\u5E38\u6307\u8DDF\u8BED\u8A00\u7684\u8BED\u6CD5\u6709\u5173\uFF0C\u8DDF\u76EE\u6807\u673A\u5668\u65E0\u5173\u3002</p><p>\u800C\u5BF9\u5E94\u7684\u540E\u7AEF\uFF0C\u5219\u662F\u751F\u6210\u76EE\u6807\u4EE3\u7801\u7684\u8FC7\u7A0B\uFF0C\u8DDF\u76EE\u6807\u673A\u5668\u6709\u5173\u3002</p><p><img src="'+e+`" alt="front-back-end"></p><p>\u7531\u56FE\u53EF\u89C1\uFF0C\u7F16\u8BD1\u5668\u7684\u524D\u7AEF\u6280\u672F\u6C1B\u56F4<strong>\u8BCD\u6CD5\u5206\u6790</strong>\u3001<strong>\u8BED\u6CD5\u5206\u6790</strong>\u3001<strong>\u8BED\u4E49\u5206\u6790</strong>\u4E09\u4E2A\u90E8\u5206\u3002\u5B83\u4E3B\u8981\u6D89\u53CA\u81EA\u52A8\u673A\u548C\u5F62\u5F0F\u8BED\u8A00\u65B9\u9762\u7684\u57FA\u7840\u8BA1\u7B97\u673A\u7406\u8BBA\u3002</p><h2 id="\u8BCD\u6CD5\u5206\u6790-lexical-analysis" tabindex="-1">\u8BCD\u6CD5\u5206\u6790 ( Lexical Analysis ) <a class="header-anchor" href="#\u8BCD\u6CD5\u5206\u6790-lexical-analysis" aria-hidden="true">#</a></h2><p>\u7F16\u8BD1\u5668\u7684\u7B2C\u4E00\u9879\u5DE5\u4F5C\u662F\u8BCD\u6CD5\u5206\u6790\u3002</p><p>\u7A0B\u5E8F\u662F\u7531\u4E00\u4E2A\u4E2A<strong>\u8BCD\u6CD5\u8BB0\u53F7</strong> ( Token ) \u7EC4\u6210\u7684\u3002</p><h3 id="\u5982\u4F55\u8BFB\u61C2\u4E00\u6BB5\u4EE3\u7801" tabindex="-1">\u5982\u4F55\u8BFB\u61C2\u4E00\u6BB5\u4EE3\u7801\uFF1F <a class="header-anchor" href="#\u5982\u4F55\u8BFB\u61C2\u4E00\u6BB5\u4EE3\u7801" aria-hidden="true">#</a></h3><div class="language-c"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">#include</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">stdio.h</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">argc</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">char</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">argv</span><span style="color:#C792EA;">[]</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">int</span><span style="color:#F07178;"> age </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">45</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#F07178;">age </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">17</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">8</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">printf</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello old man!</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">n</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">else</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">printf</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello young man!</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">n</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u8BC6\u522B\u51FA:</p><ul><li>if\u3001else\u3001int \u8FD9\u6837\u7684\u5173\u952E\u5B57</li><li>main\u3001printf\u3001age \u8FD9\u6837\u7684\u6807\u8BC6\u7B26</li><li>+\u3001-\u3001= \u8FD9\u6837\u7684\u64CD\u4F5C\u7B26\u53F7</li><li>{}\u3001()\u3001; \u8FD9\u6837\u7684\u7B26\u53F7</li><li>\u6570\u5B57\u5B57\u9762\u91CF\u3001\u5B57\u7B26\u4E32\u5B57\u9762\u91CF</li><li>...</li></ul><p>\u4EE5\u4E0A\u7684\u90FD\u662F Token \u3002</p><h3 id="\u5982\u4F55\u5199\u4E00\u4E2A\u7A0B\u5E8F\u6765\u8BC6\u522B-token-\u5462" tabindex="-1">\u5982\u4F55\u5199\u4E00\u4E2A\u7A0B\u5E8F\u6765\u8BC6\u522B Token \u5462\uFF1F <a class="header-anchor" href="#\u5982\u4F55\u5199\u4E00\u4E2A\u7A0B\u5E8F\u6765\u8BC6\u522B-token-\u5462" aria-hidden="true">#</a></h3><p>\u82F1\u6587\u5185\u5BB9\u901A\u5E38\u7528\u7A7A\u683C\u548C\u6807\u70B9\u628A\u5355\u6B21\u5206\u5F00\uFF0C\u65B9\u4FBF\u8BFB\u8005\u9605\u8BFB\u548C\u7406\u89E3\u3002\u4F46\u5728\u8BA1\u7B97\u673A\u7A0B\u5E8F\u4E2D\uFF0C\u4EC5\u4EC5\u7528\u7A7A\u683C\u548C\u6807\u70B9\u5206\u5272\u662F\u4E0D\u884C\u7684\u3002</p><p>\u6BD4\u5982 <code>age &gt;= 45</code> \u5E94\u8BE5\u5206\u6210 <code>age</code> \u3001<code>&gt;=</code> \u3001<code>45</code> \u8FD9\u4E09\u4E2A Token\uFF0C\u4F46\u5728\u4EE3\u7801\u91CC\u5B83\u4EEC\u53EF\u4EE5\u662F\u8FDE\u5728\u4E00\u8D77\u7684\uFF0C\u4E2D\u95F4\u53EF\u4EE5\u4E0D\u9700\u8981\u7A7A\u683C\u3002</p><p>\u7C7B\u4F3C\u4E8E\u6C49\u8BED\uFF0C\u6C49\u8BED\u91CC\u6BCF\u4E2A\u8BCD\u4E4B\u95F4\u4E5F\u6CA1\u6709\u7A7A\u683C\uFF0C\u4F46\u6211\u4EEC\u4F1A\u4E0B\u610F\u8BC6\u5730\u628A\u5C40\u5B50\u91CC\u7684\u8BCD\u8BED\u6B63\u786E\u5730\u62C6\u89E3\u51FA\u6765\u3002</p><p>\u6BD4\u5982\u628A<code>\u6211\u5B66\u4E60\u7F16\u7A0B</code>\u62C6\u89E3\u6210<code>\u6211</code> <code>\u5B66\u4E60</code> <code>\u7F16\u7A0B</code>\uFF0C\u8FD9\u4E2A\u8FC7\u7A0B\u53EB\u505A<strong>\u5206\u8BCD</strong>\u3002</p><p>\u53EF\u4EE5\u901A\u8FC7\u5236\u5B9A\u4E00\u4E9B\u89C4\u5219\u6765\u533A\u5206\u6BCF\u4E2A\u4E0D\u540C\u7684 Token \uFF1A</p><ul><li>\u8BC6\u522B <code>age</code> \u8FD9\u6837\u7684\u6807\u8BC6\u7B26: \u5B83\u4EE5\u5B57\u6BCD\u5F00\u5934\uFF0C\u540E\u9762\u53EF\u4EE5\u662F\u5B57\u6BCD\u6216\u6570\u5B57\uFF0C\u76F4\u5230\u9047\u5230\u7B2C\u4E00\u4E2A\u65E2\u4E0D\u662F\u5B57\u6BCD\u53C8\u4E0D\u662F\u6570\u5B57\u7684\u5B57\u7B26\u65F6\u7ED3\u675F</li><li>\u8BC6\u522B <code>&gt;=</code> \u8FD9\u6837\u7684\u64CD\u4F5C\u7B26: \u5F53\u626B\u63CF\u5230\u4E00\u4E2A <code>&gt;</code> \u5B57\u7B26\u65F6\uFF0C\u8981\u6CE8\u610F\uFF0C\u5B83\u53EF\u80FD\u662F\u4E00\u4E2A GT ( Greater Than\uFF0C\u5927\u4E8E ) \u64CD\u4F5C\u7B26\u3002\u4F46\u7531\u4E8E GE ( Greater Equal\uFF0C\u5927\u4E8E\u7B49\u4E8E ) \u4E5F\u662F\u4EE5 <code>&gt;</code> \u5F00\u5934\uFF0C\u6240\u4EE5\u8981\u518D\u5F80\u4E0B\u770B\u4E00\u4F4D\u3002\u5982\u679C\u662F <code>=</code>\uFF0C\u90A3\u4E48\u8FD9\u4E2A Token \u5C31\u662F GE\uFF0C\u5426\u5219\u5C31\u662F GT\u3002</li><li>\u8BC6\u522B <code>45</code> \u8FD9\u6837\u7684\u6570\u5B57\u5B57\u9762\u91CF\u3002\u5F53\u626B\u63CF\u5230\u4E00\u4E2A\u6570\u5B57\u5B57\u7B26\u7684\u65F6\u5019\uFF0C\u5C31\u5F00\u59CB\u628A\u5B83\u770B\u505A\u6570\u5B57\uFF0C\u76F4\u5230\u9047\u5230\u975E\u6570\u5B57\u7684\u5B57\u7B26\u3002</li></ul><p>\u4EE5\u4E0A\u89C4\u5219\u53EF\u4EE5\u901A\u8FC7\u624B\u5199\u7A0B\u5E8F\u6765\u5B9E\u73B0\u3002\u4E8B\u5B9E\u4E0A\uFF0C\u5F88\u591A\u7F16\u8BD1\u5668\u7684\u8BCD\u6CD5\u5206\u6790\u5668\u90FD\u662F\u624B\u5199\u5B9E\u73B0\u7684\uFF0C\u4F8B\u5982 GNU \u7684 C \u8BED\u8A00\u7F16\u8BD1\u5668\u3002</p><p>\u5982\u679C\u5ACC\u624B\u5199\u9EBB\u70E6\uFF0C\u53EF\u4EE5\u7528\u8BCD\u6CD5\u5206\u6790\u5668\u7684\u751F\u6210\u5DE5\u5177\u6765\u751F\u6210\uFF0C\u5982 Lex ( \u6216\u5176 GNU \u7248\u672C\uFF0CFlex )\u3002\u8FD9\u4E9B\u751F\u6210\u5DE5\u5177\u662F\u57FA\u4E8E\u4E00\u4E9B\u89C4\u5219\u6765\u5DE5\u4F5C\u7684\uFF0C\u8FD9\u4E9B\u89C4\u5219\u7528<strong>\u6B63\u5219\u6587\u6CD5</strong>\u8868\u8FBE\uFF0C\u7B26\u5408\u6B63\u5219\u6587\u6CD5\u7684\u8868\u8FBE\u5F0F\u6210\u4E3A<strong>\u6B63\u5219\u8868\u8FBE\u5F0F</strong>\u3002\u751F\u6210\u5DE5\u5177\u53EF\u4EE5\u8BFB\u5165\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u751F\u6210\u4E00\u79CD\u53EB<strong>\u6709\u9650\u81EA\u52A8\u673A</strong>\u7684\u7B97\u6CD5\uFF0C\u6765\u5B8C\u6210\u5177\u4F53\u7684\u8BCD\u6CD5\u5206\u6790\u5DE5\u4F5C\u3002</p><p>\u6709\u9650\u81EA\u52A8\u673A\u662F\u6709\u9650\u4E2A\u72B6\u6001\u7684\u81EA\u52A8\u673A\u5668\u3002</p><p>\u8BCD\u6CD5\u5206\u6790\u5668\u5206\u6790\u6574\u4E2A\u7A0B\u5E8F\u7684\u5B57\u7B26\u4E32\uFF0C\u5F53\u9047\u5230\u4E0D\u540C\u7684\u5B57\u7B26\u65F6\uFF0C\u4F1A\u9A71\u4F7F\u5B83\u8FC1\u79FB\u5230\u4E0D\u540C\u7684\u72B6\u6001\u3002\u8BCD\u6CD5\u5206\u6790\u8FC7\u7A0B\uFF0C\u5C31\u662F\u4E00\u4E2A\u4E2A\u72B6\u6001\u8FC1\u79FB\u7684\u8FC7\u7A0B\u3002</p><h2 id="\u8BED\u6CD5\u5206\u6790-syntactic-analysis-or-parsing" tabindex="-1">\u8BED\u6CD5\u5206\u6790 ( Syntactic Analysis, or Parsing ) <a class="header-anchor" href="#\u8BED\u6CD5\u5206\u6790-syntactic-analysis-or-parsing" aria-hidden="true">#</a></h2><p>\u7F16\u8BD1\u5668\u4E0B\u4E00\u4E2A\u9636\u6BB5\u7684\u5DE5\u4F5C\u662F\u8BED\u6CD5\u5206\u6790\u3002\u8BCD\u6CD5\u5206\u6790\u662F\u8BC6\u522B\u4E00\u4E2A\u4E2A\u7684\u5355\u8BCD\uFF0C\u800C\u8BED\u6CD5\u5206\u6790\u5C31\u662F\u5728\u8BCD\u6CD5\u5206\u6790\u7684\u57FA\u7840\u4E0A\u8BC6\u522B\u51FA\u7A0B\u5E8F\u7684\u8BED\u6CD5\u7ED3\u6784\u3002\u8FD9\u4E2A\u7ED3\u6784\u662F\u4E00\u4E2A\u6811\u72B6\u7ED3\u6784\uFF0C\u662F\u8BA1\u7B97\u673A\u5BB9\u6613\u7406\u89E3\u548C\u6267\u884C\u7684\u3002</p><p><img src="`+o+'" alt="Syntactic Analysis"></p><p>\u7A0B\u5E8F\u6709\u5B9A\u4E49\u826F\u597D\u7684\u8BED\u6CD5\u7ED3\u6784\uFF0C\u5B83\u7684\u8BED\u6CD5\u5206\u6790\u8FC7\u7A0B\uFF0C\u5C31\u662F\u6784\u9020\u8FD9\u4E48\u4E00\u68F5\u6811\u3002\u4E00\u4E2A\u7A0B\u5E8F\u5C31\u662F\u4E00\u68F5\u6811\uFF0C\u8FD9\u68F5\u6811\u53EB\u505A<strong>\u62BD\u8C61\u8BED\u6CD5\u6811</strong>( Abstract Syntax Tree, AST )\u3002\u6811\u7684\u6BCF\u4E2A\u8282\u70B9 ( \u5B50\u6811 ) \u662F\u4E00\u4E2A\u8BED\u6CD5\u5355\u5143\uFF0C\u8FD9\u4E2A\u5355\u5143\u7684\u6784\u6210\u89C4\u5219\u5C31\u53EB<strong>\u8BED\u6CD5</strong>\u3002\u6BCF\u4E2A\u8282\u70B9\u8FD8\u53EF\u4EE5\u6709\u4E0B\u7EA7\u8282\u70B9\u3002</p><p>\u5C42\u5C42\u5D4C\u5957\u7684\u6811\u72B6\u7ED3\u6784\uFF0C\u662F\u5BF9\u8BA1\u7B97\u673A\u7A0B\u5E8F\u7684\u76F4\u89C2\u7406\u89E3\u3002\u8BA1\u7B97\u673A\u8BED\u8A00\u603B\u662F\u4E00\u4E2A\u7ED3\u6784\u5957\u7740\u53E6\u4E00\u4E2A\u7ED3\u6784\uFF0C\u5927\u7684\u7A0B\u5E8F\u5957\u7740\u5B50\u7684\u7A0B\u5E8F\uFF0C\u5B50\u7A0B\u5E8F\u53C8\u53EF\u4EE5\u5305\u542B\u5B50\u7A0B\u5E8F\u3002</p><p>\u5F62\u6210 AST \u540E\uFF0C\u8BA1\u7B97\u673A\u5C31\u5F88\u5BB9\u6613\u53BB\u5904\u7406\u3002\u6BD4\u5982\uFF0C\u9488\u5BF9\u8868\u8FBE\u5F0F\u5F62\u6210\u7684\u6811\uFF0C\u4ECE\u6839\u8282\u70B9\u904D\u5386\u6574\u68F5\u6811\u5C31\u53EF\u4EE5\u83B7\u5F97\u8868\u8FBE\u5F0F\u7684\u503C\u3002</p><p>\u5982\u679C\u518D\u628A\u5FAA\u73AF\u8BED\u53E5\u3001\u5224\u65AD\u8BED\u53E5\u3001\u8D4B\u503C\u8BED\u53E5\u7B49\u8282\u70B9\u52A0\u5230 AST \u4E0A\uFF0C\u5E76\u89E3\u91CA\u6267\u884C\u5B83\uFF0C\u90A3\u5B9E\u9645\u4E0A\u5C31\u5B9E\u73B0\u4E86\u4E00\u4E2A\u811A\u672C\u8BED\u8A00\u3002\u800C\u6267\u884C\u811A\u672C\u8BED\u8A00\u7684\u8FC7\u7A0B\uFF0C\u5C31\u662F\u904D\u5386 AST \u7684\u8FC7\u7A0B\u3002</p><h3 id="\u6784\u9020-ast" tabindex="-1">\u6784\u9020 AST <a class="header-anchor" href="#\u6784\u9020-ast" aria-hidden="true">#</a></h3><p>\u4E00\u79CD\u76F4\u89C2\u7684\u6784\u9020\u601D\u8DEF\u662F\u81EA\u4E0A\u800C\u4E0B\u8FDB\u884C\u5206\u6790\u3002</p><p><img src="'+p+'" alt="ast-build"></p><p>\u4E00\u68F5\u5B50\u6811\u626B\u63CF\u5B8C\u6BD5\u540E\uFF0C\u7A0B\u5E8F\u9000\u56DE\u5230\u6839\u8282\u70B9\uFF0C\u5F00\u59CB\u6784\u5EFA\u6839\u8282\u70B9\u7684\u7B2C\u4E8C\u4E2A\u5B50\u8282\u70B9\u3002\u8FD9\u6837\u9012\u5F52\u5730\u626B\u63CF\uFF0C\u77E5\u9053\u6784\u5EFA\u8D77\u4E00\u68F5\u5B8C\u6574\u7684\u6811\u3002</p><p>\u8FD9\u4E2A\u7B97\u6CD5\u5C31\u662F\u975E\u5E38\u5E38\u7528\u7684<strong>\u9012\u5F52\u4E0B\u964D\u7B97\u6CD5</strong> ( Recursive Descent Parsing )\u3002</p><p>\u9012\u5F52\u4E0B\u964D\u7B97\u6CD5\u662F\u4E00\u79CD\u81EA\u9876\u5411\u4E0B\u7684\u7B97\u6CD5\uFF0C\u4E0E\u4E4B\u5BF9\u5E94\u7684\uFF0C\u8FD8\u6709\u81EA\u5E95\u5411\u4E0A\u7684\u7B97\u6CD5\u3002\u8FD9\u4E2A\u7B97\u6CD5\u4F1A\u5148\u5C06\u6700\u4E0B\u9762\u7684\u53F6\u5B50\u7ED3\u70B9\u8BC6\u522B\u51FA\u6765\uFF0C\u7136\u540E\u518D\u7EC4\u88C5\u4E0A\u4E00\u7EA7\u8282\u70B9\u3002\u50CF\u642D\u79EF\u6728\uFF0C\u603B\u662F\u5148\u6784\u9020\u51FA\u5C0F\u7684\u5355\u5143\uFF0C\u7136\u540E\u518D\u7EC4\u88C5\u6210\u66F4\u5927\u7684\u5355\u5143\u3002</p><h2 id="\u8BED\u4E49\u5206\u6790-semantic-analysis" tabindex="-1">\u8BED\u4E49\u5206\u6790 ( Semantic Analysis ) <a class="header-anchor" href="#\u8BED\u4E49\u5206\u6790-semantic-analysis" aria-hidden="true">#</a></h2><p>\u5728\u8BCD\u6CD5\u5206\u6790\u3001\u8BED\u6CD5\u5206\u6790\u540E\uFF0C\u7F16\u8BD1\u5668\u7684\u5728\u4E0B\u4E00\u6B65\u5DE5\u4F5C\u662F\u8BED\u4E49\u5206\u6790\u3002\u8BED\u4E49\u5206\u6790\u662F\u8981\u8BA9\u8BA1\u7B97\u673A\u7406\u89E3\u5F00\u53D1\u8005\u7684\u771F\u5B9E\u610F\u56FE\uFF0C\u628A\u4E00\u4E9B\u6A21\u68F1\u4E24\u53EF\u7684\u5730\u65B9\u6D88\u9664\u6389\u3002</p><p>\u7406\u89E3\u81EA\u7136\u8BED\u8A00\u7684\u542B\u4E49\u5F88\u96BE\uFF0C\u9700\u8981\u4E0A\u4E0B\u6587\uFF0C\u4F46\u5176\u5B9E\u8BED\u4E49\u5206\u6790\u5E76\u6CA1\u6709\u90A3\u4E48\u590D\u6742\u3002\u8BA1\u7B97\u673A\u8BED\u8A00\u7684\u8BED\u4E49\u4E00\u822C\u53EF\u4EE5\u8868\u8FBE\u4E3A\u4E00\u4E9B\u89C4\u5219\uFF0C\u53EA\u8981\u68C0\u67E5\u662F\u5426\u7B26\u5408\u8FD9\u4E9B\u89C4\u5219\u5373\u53EF\uFF0C\u6BD4\u5982\uFF1A</p><ul><li>\u67D0\u4E2A\u8868\u8FBE\u5F0F\u7684\u8BA1\u7B97\u7ED3\u679C\u662F\u4EC0\u4E48\u6570\u636E\u7C7B\u578B\uFF1F\u5982\u679C\u6709\u6570\u636E\u7C7B\u578B\u4E0D\u5339\u914D\u7684\u60C5\u51B5\uFF0C\u662F\u5426\u8981\u505A\u81EA\u52A8\u8F6C\u6362\uFF1F</li><li>\u5982\u679C\u5728\u4E00\u4E2A\u4EE3\u7801\u5757\u7684\u5185\u90E8\u548C\u5916\u90E8\u6709\u76F8\u540C\u540D\u79F0\u7684\u53D8\u91CF\uFF0C\u5728\u6267\u884C\u7684\u65F6\u5019\u5230\u5E95\u7528\u54EA\u4E2A\uFF1F</li><li>\u5728\u540C\u4E00\u4E2A\u4F5C\u7528\u57DF\u5185\uFF0C\u4E0D\u5141\u8BB8\u6709\u4E24\u4E2A\u540D\u79F0\u76F8\u540C\u7684\u53D8\u91CF\uFF0C\u8FD9\u662F\u552F\u4E00\u6027\u68C0\u67E5\u3002</li></ul><p>\u8BED\u4E49\u5206\u6790\u57FA\u672C\u4E0A\u5C31\u662F\u505A\u8FD9\u6837\u7684\u4E8B\u60C5\uFF0C\u4E5F\u5C31\u662F\u6839\u636E\u8BED\u4E49\u89C4\u5219\u8FDB\u884C\u5206\u6790\u5224\u65AD\u3002</p><p>\u8BED\u4E49\u5206\u6790\u5DE5\u4F5C\u7684\u67D0\u4E9B\u6210\u679C\uFF0C\u4F1A\u4F5C\u4E3A\u5C5E\u6027\u6807\u6CE8\u5728\u62BD\u8C61\u8BED\u6CD5\u6811\u4E0A\u3002</p><p>\u5728\u62BD\u8C61\u8BED\u6CD5\u6811\u4E0A\u8FD8\u53EF\u4EE5\u6807\u8BB0\u5F88\u591A\u5C5E\u6027\uFF0C\u6709\u4E9B\u5C5E\u6027\u662F\u5728\u4E4B\u524D\u7684\u4E24\u4E2A\u9636\u6BB5\u5C31\u88AB\u6807\u6CE8\u4E0A\u4E86\uFF0C\u6BD4\u5982\u6240\u5904\u7684\u6E90\u4EE3\u7801\u884C\u53F7\uFF0C\u8FD9\u4E00\u884C\u7684\u7B2C\u51E0\u4E2A\u5B57\u6BCD\u3002\u8FD9\u6837\uFF0C\u5728\u7F16\u8BD1\u7A0B\u5E8F\u62A5\u9519\u7684\u65F6\u5019\uFF0C\u5C31\u53EF\u4EE5\u6BD4\u8F83\u6E05\u695A\u5730\u4E86\u89E3\u51FA\u9519\u7684\u4F4D\u7F6E\u3002</p><p>\u505A\u4E86\u5C5E\u6027\u6807\u6CE8\u540E\uFF0C\u7F16\u8BD1\u5668\u5728\u540E\u9762\u5C31\u53EF\u4EE5\u4F9D\u636E\u8FD9\u4E9B\u4FE1\u606F\u751F\u6210\u76EE\u6807\u4EE3\u7801\u4E86\u3002</p><h2 id="\u5C0F\u7ED3" tabindex="-1">\u5C0F\u7ED3 <a class="header-anchor" href="#\u5C0F\u7ED3" aria-hidden="true">#</a></h2><ul><li>\u8BCD\u6CD5\u5206\u6790\u662F\u628A\u7A0B\u5E8F\u5206\u5272\u6210\u4E00\u4E2A\u4E2A Token \u7684\u8FC7\u7A0B\uFF0C\u53EF\u4EE5\u901A\u8FC7\u6784\u9020\u6709\u9650\u81EA\u52A8\u673A\u6765\u5B9E\u73B0\u3002</li><li>\u8BED\u6CD5\u5206\u6790\u662F\u628A\u7A0B\u5E8F\u7684\u7ED3\u6784\u8BC6\u522B\u51FA\u6765\uFF0C\u5E76\u5F62\u6210\u4E00\u68F5\u4FBF\u4E8E\u7531\u8BA1\u7B97\u673A\u5904\u7406\u7684\u62BD\u8C61\u8BED\u6CD5\u6811\u3002\u53EF\u4EE5\u7528\u9012\u5F52\u4E0B\u964D\u7684\u7B97\u6CD5\u6765\u5B9E\u73B0\u3002</li><li>\u8BED\u4E49\u5206\u6790\u662F\u6D88\u9664\u4E88\u4EE5\u6A21\u7CCA\uFF0C\u751F\u6210\u4E00\u4E9B\u5C5E\u6027\u4FE1\u606F\uFF0C\u8BA9\u8BA1\u7B97\u673A\u80FD\u591F\u4F9D\u636E\u8FD9\u4E9B\u4FE1\u606F\u751F\u6210\u76EE\u6807\u4EE3\u7801\u3002</li></ul>',47),r=[c];function i(d,y,F,D,h,g){return n(),a("div",null,r)}const C=s(t,[["render",i]]);export{A as __pageData,C as default};
