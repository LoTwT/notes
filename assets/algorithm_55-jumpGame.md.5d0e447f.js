import{_ as s,c as a,o as n,a as l}from"./app.a067e1d4.js";const i=JSON.parse('{"title":"55-\u8DF3\u8DC3\u6E38\u620F","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/55-jumpGame.md","lastUpdated":1669599731000}'),p={name:"algorithm/55-jumpGame.md"},o=l(`<h1 id="_55-\u8DF3\u8DC3\u6E38\u620F" tabindex="-1"><a href="https://leetcode-cn.com/problems/jump-game/" target="_blank" rel="noreferrer">55-\u8DF3\u8DC3\u6E38\u620F</a> <a class="header-anchor" href="#_55-\u8DF3\u8DC3\u6E38\u620F" aria-hidden="true">#</a></h1><p>\u601D\u8DEF\uFF1A\u8D2A\u5FC3</p><p>\u4E0D\u65AD\u5BFB\u627E\u80FD\u591F\u5230\u8FBE\u7684\u6700\u8FDC\u8DDD\u79BB\u3002</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">canJump</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u8DF3\u8DC3\u7684\u8303\u56F4</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">cover</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">cover</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// i + nums[i] \u8868\u793A\u5F53\u524D\u6240\u5728\u4E0B\u6807 + \u80FD\u591F\u8DF3\u8DC3\u7684\u8DDD\u79BB</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">cover</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">max</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">cover</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// cover \u6BD4 nums.length - 1 \u5927\u8BA4\u4E3A\u53EF\u4EE5\u5230\u8FBE</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">cover</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u603B\u7ED3</p><ol><li>\u6839\u636E\u9898\u5E72\uFF0C\u7B80\u5316\u95EE\u9898\uFF0C\u8FD9\u91CC\u53EA\u8981\u80FD\u591F\u8FBE\u5230\u5373\u53EF ( \u5373 &gt;= )</li><li>\u601D\u8DEF\u4F18\u5148\u4E8E\u5B9E\u73B0</li></ol>`,6),e=[o];function t(c,r,F,y,D,C){return n(),a("div",null,e)}const _=s(p,[["render",t]]);export{i as __pageData,_ as default};
