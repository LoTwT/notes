import{_ as s,c as n,o as a,a as l}from"./app.a067e1d4.js";const A=JSON.parse('{"title":"chmod / chown","description":"","frontmatter":{},"headers":[{"level":2,"title":"chown","slug":"chown","link":"#chown","children":[]},{"level":2,"title":"EACESS","slug":"eacess","link":"#eacess","children":[]},{"level":2,"title":"chmod","slug":"chmod","link":"#chmod","children":[]}],"relativePath":"devops/linux/file-system/5-chmod-chown.md","lastUpdated":1669599731000}'),o={name:"devops/linux/file-system/5-chmod-chown.md"},e=l(`<h1 id="chmod-chown" tabindex="-1">chmod / chown <a class="header-anchor" href="#chmod-chown" aria-hidden="true">#</a></h1><h2 id="chown" tabindex="-1">chown <a class="header-anchor" href="#chown" aria-hidden="true">#</a></h2><p><code>chown</code>\uFF0Cchange owner \u3002\u66F4\u6539\u6587\u4EF6\u7684\u6240\u5C5E\u7528\u6237\u53CA\u7EC4\u3002</p><p>\u901A\u8FC7 <code>ls</code> \u547D\u4EE4\uFF0C\u7B2C\u4E09\u7B2C\u56DB\u5217\u4FBF\u662F\u6587\u4EF6\u6240\u5C5E\u7528\u6237\u53CA\u7528\u6237\u7EC4\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ ls -lah </span><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">total 1.2M</span></span>
<span class="line"><span style="color:#A6ACCD;">drwxr-xr-x 11 shanyue shanyue 4.0K Jun 22 18:42 </span><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">drwxr-xr-x  5 root    root    4.0K Jun 24 11:06 ..</span></span>
<span class="line"><span style="color:#A6ACCD;">drwxr-xr-x  2 shanyue shanyue 4.0K Jun 10 15:45 .circleci</span></span>
<span class="line"><span style="color:#A6ACCD;">drwxr-xr-x  2 shanyue shanyue 4.0K Jun 10 15:45 .codesandbox</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 shanyue shanyue  294 May 22  2021 .editorconfig</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 shanyue shanyue  759 Jun 10 15:45 .eslintignore</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 shanyue shanyue 8.4K Jun 10 15:45 .eslintrc.js</span></span>
<span class="line"><span style="color:#A6ACCD;">drwxr-xr-x  7 shanyue shanyue 4.0K Jun 14 19:06 .git</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 shanyue shanyue   12 May 22  2021 .gitattributes</span></span>
<span class="line"></span></code></pre></div><p>\u901A\u8FC7 <code>chown -R</code>\uFF0C\u53EF\u4E00\u5E76\u5C06\u5B50\u6587\u4EF6\u6240\u5C5E\u7528\u6237\u53CA\u7528\u6237\u7EC4\u8FDB\u884C\u4FEE\u6539\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># \u5C06 . \u6587\u4EF6\u5939\u4E0B\u5F53\u524D\u76EE\u5F55\u7684\u7528\u6237\u53CA\u7528\u6237\u7EC4\u8BBE\u4E3A shanyue</span></span>
<span class="line"><span style="color:#676E95;"># -R : \u904D\u5386\u5B50\u6587\u4EF6\u4FEE\u6539</span></span>
<span class="line"><span style="color:#A6ACCD;">$ chown -R shanyue:shanyue </span><span style="color:#82AAFF;">.</span></span>
<span class="line"></span></code></pre></div><h2 id="eacess" tabindex="-1">EACESS <a class="header-anchor" href="#eacess" aria-hidden="true">#</a></h2><p>\u524D\u7AEF\u4F7F\u7528 <code>yarn</code> \u5B89\u88C5\u4F9D\u8D56\u65F6\uFF0C\u53EF\u80FD\u4F1A\u9047\u5230 <code>EACCES: permission denied, unlink ...</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ yarn</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">error An unexpected error occurred: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">EACCES: permission denied, unlink &#39;/home/train/Documents/react/node_modules/@babel/cli/node_modules/commander/CHANGELOG.md&#39;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">info If you think this is a bug, please open a bug report with the information provided </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/home/train/Documents/react/packages/react/yarn-error.log</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">info Visit https://yarnpkg.com/en/docs/cli/install </span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> documentation about this command.</span></span>
<span class="line"></span></code></pre></div><p>\u4E0A\u8FF0\u95EE\u9898\u7684\u53EF\u80FD\u539F\u56E0\u662F\uFF1A\u975E\u8BE5\u6587\u4EF6\u7684\u6240\u5C5E\u7528\u6237\u53BB\u4FEE\u6539\u6587\u4EF6\u5185\u5BB9\u3002\u6BD4\u5982\u5176\u4E2D\u4E00\u79CD\u53EF\u80FD\u662F\uFF0C<code>node_modules</code> \u6240\u5C5E\u7528\u6237\u5E94\u8BE5\u4E3A <code>train</code> \u8FD9\u4E2A\u666E\u901A\u7528\u6237\uFF0C\u4F46\u5B9E\u9645\u4E0A\u4E3A <code>root</code>\uFF0C\u4ECE\u800C\u5BFC\u81F4\u6CA1\u6709\u6743\u9650\u3002</p><p>\u800C\u5B9E\u9645\u4E0A\uFF0C\u5F53\u6587\u4EF6\u7684 owner \u53CA mode \u4E0D\u5339\u914D\u65F6\uFF0C\u5747\u4F1A\u62A5\u6B64\u9519\u8BEF\u3002\u5982\u975E root \u7528\u6237\u64CD\u4F5C root \u7528\u6237\u7684\u6587\u4EF6\uFF0C\u5BF9\u53EF\u8BFB\u6587\u4EF6\u8FDB\u884C\u5199\u64CD\u4F5C\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># \u6B64\u65F6\u53D1\u73B0 node_modules \u4E3A root:root\uFF0C\u56E0\u6B64\u5BFC\u81F4\u7684\u95EE\u9898</span></span>
<span class="line"><span style="color:#A6ACCD;">$ ls -lah </span><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">drwxr-xr-x  3 root  root  4.0K Jun 27 22:19 node_modules</span></span>
<span class="line"><span style="color:#A6ACCD;">drwxr-xr-x  2 train train 4.0K Jun 10 15:45 npm</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--  1 train train 1.1K Jun 10 15:45 package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">drwxr-xr-x  5 train train 4.0K Jun 10 15:45 src</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u6B64\u65F6\u901A\u8FC7 chown \u5373\u53EF\u89E3\u51B3\u95EE\u9898</span></span>
<span class="line"><span style="color:#A6ACCD;">$ chown -R train:train node_modules</span></span>
<span class="line"></span></code></pre></div><h2 id="chmod" tabindex="-1">chmod <a class="header-anchor" href="#chmod" aria-hidden="true">#</a></h2><p><code>chmod</code>\uFF0Cchange mode\u3002\u66F4\u6539\u6587\u4EF6\u7684\u8BFB\u5199\u6743\u9650\u3002</p><p><code>mode</code> \u6307 Linux \u4E2D\u5BF9\u67D0\u4E2A\u6587\u4EF6\u7684\u8BBF\u95EE\u6743\u9650\u3002</p><p>\u901A\u8FC7 <code>stat</code> \u53EF\u83B7\u53D6\u67D0\u4E2A\u6587\u4EF6\u7684 mode \u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># -c: --format</span></span>
<span class="line"><span style="color:#676E95;"># %a: \u83B7\u5F97\u6570\u5B57\u7684 mode</span></span>
<span class="line"><span style="color:#A6ACCD;">$ stat -c %a README.md</span></span>
<span class="line"><span style="color:#A6ACCD;">644</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># %A: \u83B7\u5F97\u53EF\u8BFB\u5316\u7684 mode</span></span>
<span class="line"><span style="color:#A6ACCD;">$ stat -c %A README.md</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--</span></span>
<span class="line"></span></code></pre></div><p>\u6587\u4EF6\u7684\u6743\u9650:</p><ul><li><code>r</code> : \u53EF\u8BFB\uFF0C\u4E8C\u8FDB\u5236\u4E3A 100\uFF0C\u4E5F\u5C31\u662F 4</li><li><code>w</code> : \u53EF\u5199\uFF0C\u4E8C\u8FDB\u5236\u4E3A 010\uFF0C\u4E5F\u5C31\u662F 2</li><li><code>x</code> : \u53EF\u6267\u884C\uFF0C\u4E8C\u8FDB\u5236\u4E3A 001\uFF0C\u4E5F\u5C31\u662F 1</li><li><code>s</code> : \u5F3A\u5236\u4F4D\uFF0C\u5728\u6267\u884C\u9636\u6BB5\u62FF\u5230\u6240\u6709\u6743\u9650</li><li><code>t</code> : \u7C98\u6EDE\u4F4D\uFF0C\u6743\u9650\u9897\u7C92\u5EA6\u66F4\u7EC6\uFF0C\u53EA\u80FD\u5220\u9664\u81EA\u5DF1\u521B\u5EFA\u7684\u6587\u6863</li></ul><p>\u800C Linux \u4E3A\u591A\u7528\u6237\u7CFB\u7EDF\uFF0C\u53EF\u5BF9\u7528\u6237\u8FDB\u884C\u4EE5\u4E0B\u5206\u7C7B:</p><ul><li><code>user</code> : \u6587\u4EF6\u5F53\u524D\u7528\u6237</li><li><code>group</code> : \u6587\u4EF6\u5F53\u524D\u7528\u6237\u6240\u5C5E\u7EC4</li><li><code>other</code> : \u5176\u4ED6\u7528\u6237</li></ul><p>\u521A\u624D <code>644</code> \u4EE3\u8868\u7684\u91CA\u4E49:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># rw- : \u5F53\u524D\u7528\u6237\u53EF\u5199\u53EF\u8BFB\uFF0C110\uFF0C\u5373\u5341\u8FDB\u5236 6</span></span>
<span class="line"><span style="color:#676E95;"># r-- : \u5F53\u524D\u7528\u6237\u7EC4\u53EF\u8BFB\uFF0C100\uFF0C\u5373\u5341\u8FDB\u5236 4</span></span>
<span class="line"><span style="color:#676E95;"># r-- : \u5176\u4ED6\u7528\u6237\u53EF\u8BFB\uFF0C100\uFF0C\u5373\u5341\u8FDB\u5236 4</span></span>
<span class="line"><span style="color:#676E95;"># \u6240\u4EE5\u7ED3\u679C\u662F 644</span></span>
<span class="line"><span style="color:#A6ACCD;">-rw-r--r--</span></span>
<span class="line"></span></code></pre></div><p>\u901A\u8FC7 <code>chmod</code> \u4E0E\u6570\u5B57\u6240\u4EE3\u8868\u7684\u6743\u9650\uFF0C\u5373\u53EF\u4FEE\u6539\u67D0\u4E2A\u6587\u4EF6\u7684\u6743\u9650\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 777\uFF0C\u5373 rwx\u3001rwx\u3001rwx\uFF0C\u4EE3\u8868\u6240\u6709\u7528\u6237\u53EF\u8BFB\u53EF\u5199\u53EF\u6267\u884C</span></span>
<span class="line"><span style="color:#A6ACCD;">$ chmod 777 yarn.lock</span></span>
<span class="line"></span></code></pre></div><p>\u4E5F\u53EF\u4EE5\u901A\u8FC7\u53EF\u8BFB\u5316\u5F62\u5F0F\u6DFB\u52A0\u6743\u9650\uFF0C\u5982\u4E0B\u6240\u793A:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># u : user</span></span>
<span class="line"><span style="color:#676E95;"># g : group</span></span>
<span class="line"><span style="color:#676E95;"># o : other</span></span>
<span class="line"><span style="color:#676E95;"># a : all</span></span>
<span class="line"><span style="color:#676E95;"># +-= :: \u589E\u52A0\u51CF\u5C11\u590D\u5236</span></span>
<span class="line"><span style="color:#676E95;"># perms : \u6743\u9650</span></span>
<span class="line"><span style="color:#A6ACCD;">$ chmod </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">ugoa...</span><span style="color:#89DDFF;">][[</span><span style="color:#A6ACCD;">+-</span><span style="color:#89DDFF;">=][</span><span style="color:#A6ACCD;">perms...</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">...]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u4E3A yarn.lock \u6587\u4EF6\u7684\u7528\u6237\u6240\u6709\u8005\u6DFB\u52A0\u53EF\u8BFB\u6743\u9650</span></span>
<span class="line"><span style="color:#A6ACCD;">$ chmod u+r yarn.lock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u4E3A\u6240\u6709\u7528\u6237\u6DFB\u52A0 yarn.lock \u7684\u53EF\u8BFB\u6743\u9650</span></span>
<span class="line"><span style="color:#A6ACCD;">$ chmod a+r yarn.lock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u4E3A\u6240\u6709\u7528\u6237\u5220\u9664 yarn.lock \u7684\u53EF\u8BFB\u6743\u9650</span></span>
<span class="line"><span style="color:#A6ACCD;">$ chmod a-r yarn.lock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u4E0D\u6307\u5B9A ugoa \u65F6\uFF0C\u9ED8\u8BA4\u5C31\u662F a</span></span>
<span class="line"><span style="color:#676E95;"># \u4EE5\u4E0B\u4E24\u4E2A\u547D\u4EE4\u64CD\u4F5C\u7ED3\u679C\u76F8\u540C</span></span>
<span class="line"><span style="color:#A6ACCD;">$ chmod +x a.js</span></span>
<span class="line"><span style="color:#A6ACCD;">$ chmod a+x a.js</span></span>
<span class="line"></span></code></pre></div>`,28),p=[e];function c(r,t,i,d,y,h){return a(),n("div",null,p)}const u=s(o,[["render",c]]);export{A as __pageData,u as default};
