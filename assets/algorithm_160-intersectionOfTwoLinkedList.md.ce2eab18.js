import{_ as s,c as n,o as a,a as l}from"./app.a067e1d4.js";const i=JSON.parse('{"title":"160-\u76F8\u4EA4\u94FE\u8868","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/160-intersectionOfTwoLinkedList.md","lastUpdated":1669599731000}'),p={name:"algorithm/160-intersectionOfTwoLinkedList.md"},o=l(`<h1 id="_160-\u76F8\u4EA4\u94FE\u8868" tabindex="-1"><a href="https://leetcode-cn.com/problems/intersection-of-two-linked-lists/" target="_blank" rel="noreferrer">160-\u76F8\u4EA4\u94FE\u8868</a> <a class="header-anchor" href="#_160-\u76F8\u4EA4\u94FE\u8868" aria-hidden="true">#</a></h1><p>\u601D\u8DEF\uFF1A\u5C06\u94FE\u8868 A \u62FC\u63A5\u5230\u94FE\u8868 B \u540E\uFF0C\u94FE\u8868 B \u62FC\u63A5\u5230\u94FE\u8868 A \u540E\uFF0C\u6784\u9020\u4E24\u4E2A\u957F\u5EA6\u76F8\u540C\u7684\u94FE\u8868\u8FDB\u884C\u6BD4\u8F83</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getIntersectionNode</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">headA</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ListNode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">headB</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ListNode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ListNode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currA</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">headA</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currB</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">headB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u94FE\u8868\u62FC\u63A5\u9700\u8981\u627E\u5230\u5C3E\u8282\u70B9</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u4E3A\u4E86\u63D0\u9AD8\u6548\u7387\uFF0C\u5224\u65AD\u5355\u4E2A\u94FE\u8868\u5230\u5C3E\u8282\u70B9\u540E\uFF0C\u76F4\u63A5\u904D\u5386\u53E6\u4E00\u4E2A\u94FE\u8868\u5373\u53EF</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">currA</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currB</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">currA</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currA</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">headB</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currA</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">currB</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currB</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">headA</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currB</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">currA</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,3),e=[o];function t(c,r,y,F,D,A){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
