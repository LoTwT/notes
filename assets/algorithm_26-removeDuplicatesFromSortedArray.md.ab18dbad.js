import{_ as s,c as a,o as n,a as l}from"./app.a067e1d4.js";const i=JSON.parse('{"title":"26-\u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/26-removeDuplicatesFromSortedArray.md","lastUpdated":1669599731000}'),p={name:"algorithm/26-removeDuplicatesFromSortedArray.md"},o=l(`<h1 id="_26-\u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879" tabindex="-1"><a href="https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/" target="_blank" rel="noreferrer">26-\u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879</a> <a class="header-anchor" href="#_26-\u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879" aria-hidden="true">#</a></h1><p>\u601D\u8DEF\uFF1A\u53CC\u6307\u9488 (\u5FEB\u6162\u6307\u9488)</p><p>O(1) \u5220\u9664\u91CD\u590D\u9879 =&gt; \u91CD\u590D\u9879\u5C3D\u53EF\u80FD\u5F80\u540E\u79FB =&gt; \u6709\u6548\u9879\u5C3D\u53EF\u80FD\u5F80\u524D\u79FB</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">removeDuplicates</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u6709\u6548\u9879\u7684\u4E0B\u6807</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">slow</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fast</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">fast</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u5FEB\u6307\u9488\u6307\u5411\u7684\u503C \u4E0D\u7B49\u4E8E \u6162\u6307\u9488\u6307\u5411\u7684\u503C</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u627E\u5230\u6709\u6548\u9879</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">fast</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">slow</span><span style="color:#F07178;">]) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">slow</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// \u6709\u6548\u9879\u524D\u79FB</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">slow</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">fast</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u5FEB\u6307\u9488\u65E0\u8BBA\u5982\u4F55\u90FD\u4F1A +1</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">fast</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u8981\u6C42\u8FD4\u56DE\u957F\u5EA6\uFF0C\u6709\u6548\u9879\u4E0B\u6807 + 1</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">slow</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,4),e=[o];function t(r,c,y,F,D,C){return n(),a("div",null,e)}const _=s(p,[["render",t]]);export{i as __pageData,_ as default};
