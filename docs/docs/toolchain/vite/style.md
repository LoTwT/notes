# 样式方案

## 意义

原生方案的问题：

1. 开发体验欠佳，不支持选择器嵌套
1. 样式污染
1. 浏览器兼容
1. 代码体积

解决方案：

1. CSS 预处理器：

   - Sass / Scss
   - Less
   - Stylus

   解决原生 CSS 开发体验问题

1. CSS Modules：将 CSS 类名处理成哈希值，避免样式污染

1. CSS 后处理器 `PostCSS` ，解析和处理 CSS 代码

1. `CSS in JS`：主流包括 emotion 、styled-components 等，直接在 JS 中写样式代码

1. 原子化 CSS ，如 Tailwind CSS 、Uno CSS ，通过类名指定样式，简化了样式写法
