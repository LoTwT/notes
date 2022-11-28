import{_ as s,c as n,o as a,a as l}from"./app.a067e1d4.js";const i=JSON.parse('{"title":"46-\u5168\u6392\u5217","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/46-permutations.md","lastUpdated":1669599731000}'),p={name:"algorithm/46-permutations.md"},o=l(`<h1 id="_46-\u5168\u6392\u5217" tabindex="-1"><a href="https://leetcode-cn.com/problems/permutations/" target="_blank" rel="noreferrer">46-\u5168\u6392\u5217</a> <a class="header-anchor" href="#_46-\u5168\u6392\u5217" aria-hidden="true">#</a></h1><p>\u601D\u8DEF\uFF1A\u56DE\u6EAF + \u9012\u5F52</p><p><a href="https://baike.baidu.com/item/%E5%9B%9E%E6%BA%AF%E7%AE%97%E6%B3%95/9258495?fr=aladdin" target="_blank" rel="noreferrer">\u56DE\u6EAF\u7B97\u6CD5</a> \u662F\u6DF1\u5EA6\u4F18\u5148\u7684\u3002</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">permute</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;">[][] </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#F07178;">[][] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">backtrack</span><span style="color:#F07178;">([]) </span><span style="color:#676E95;">// \u4ECE\u7A7A\u8DEF\u5F84\u5F00\u59CB</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u56DE\u6EAF</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">backtrack</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#F07178;">[]</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">path</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u9012\u5F52</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">n</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">includes</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">n</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">return</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">backtrack</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">concat</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">n</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki has-highlighted-lines"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">permute</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;">[][] </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#F07178;">[][] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">backtrack</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u56DE\u6EAF + \u9012\u5F52</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">backtrack</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#F07178;">[][]</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#F07178;">[]</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#F07178;">[]</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u7EC8\u6B62\u6761\u4EF6</span></span>
<span class="line highlighted"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">temp</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line highlighted"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">([</span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">])</span></span>
<span class="line highlighted"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// \u627E\u5230\u4E00\u4E2A\u4E0D\u5728 temp \u4E2D\u7684\u6570\u5B57</span></span>
<span class="line highlighted"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">temp</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">includes</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">])) </span><span style="color:#89DDFF;">continue</span></span>
<span class="line highlighted"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">temp</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// \u9012\u5F52 ( \u7EE7\u7EED\u627E\u7B26\u5408\u8981\u6C42\u7684\u6570\u5B57 )</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">backtrack</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// \u56DE\u6EAF ( \u5C06\u5DF2\u7ECF\u64CD\u4F5C\u5B8C\u7684\u6570\u5B57\u5F39\u51FA )</span></span>
<span class="line highlighted"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">temp</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">pop</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u603B\u7ED3\uFF1A</p><ol><li>\u4E0D\u65AD\u6DF1\u5165\u5BFB\u627E\u6EE1\u8DB3\u6761\u4EF6\u5730\u503C ( \u6DF1\u5EA6\u4F18\u5148 )</li><li>\u8981\u83B7\u53D6\u6240\u6709\u53EF\u80FD\u7ED3\u679C ( \u5168\u6392\u5217 )\uFF0C\u6240\u4EE5\u9700\u8981\u4E00\u4E2A\u5BB9\u5668\u53BB\u88C5\u5404\u79CD\u7ED3\u679C ( result )</li></ol>`,7),e=[o];function t(c,r,F,y,D,A){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{i as __pageData,u as default};
