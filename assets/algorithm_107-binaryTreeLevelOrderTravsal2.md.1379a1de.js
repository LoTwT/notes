import{_ as s,c as n,o as a,a as l}from"./app.a067e1d4.js";const i=JSON.parse('{"title":"107-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386 II","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/107-binaryTreeLevelOrderTravsal2.md","lastUpdated":1669599731000}'),p={name:"algorithm/107-binaryTreeLevelOrderTravsal2.md"},o=l(`<h1 id="_107-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386-ii" tabindex="-1"><a href="https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/" target="_blank" rel="noreferrer">107-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386 II</a> <a class="header-anchor" href="#_107-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386-ii" aria-hidden="true">#</a></h1><p>\u4E0E <a href="./102-binaryTreeLevelOrderTraversal.html">102</a> \u7C7B\u4F3C\uFF0C\u628A\u8BE5\u9898\u7B54\u6848 <code>reverse</code> \u4E5F\u662F\u6B63\u786E\u7B54\u6848\u3002</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">levelOrderBottom</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TreeNode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;">[][] </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u7ED3\u679C</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ret</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u904D\u5386\u4E2D\u7528\u7684\u961F\u5217</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">queue</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">root</span><span style="color:#F07178;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">queue</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u5F53\u524D\u5C42\u7684\u8282\u70B9\u6570</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">len</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">queue</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currLevel</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">len</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">node</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">queue</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">shift</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">currLevel</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">val</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">left</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">queue</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">left</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">right</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">queue</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">right</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">len</span><span style="color:#89DDFF;">--</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u6838\u5FC3</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u5C06\u6BCF\u5C42\u904D\u5386\u7684\u7ED3\u679C\u63D2\u5728\u7B2C\u4E00\u4E2A\u5373\u53EF</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">ret</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">unshift</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">currLevel</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ret</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,3),e=[o];function r(t,c,y,F,D,A){return a(),n("div",null,e)}const d=s(p,[["render",r]]);export{i as __pageData,d as default};
