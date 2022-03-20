# 二分优化 leftpad

Javascript 已经内置了 leftpad：[String.prototype.padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

这里仅作为学习，自行实现。

```ts
function leftpad(str: string, length: number, ch = " ") {
  let len = length - str.length

  if (len <= 0) return str

  // 要拼接在左侧的字符串
  let total = ""

  while (true) {
    // 与运算，len 不被 2 整除时，单独加上 ch 字符
    if (len & 1) {
      total += ch
    }

    // 只剩最后一位时，命中上方与运算，直接返回要拼接的 total + str 即可
    if (len === 1) {
      return total + str
    }

    // 二分增长的要拼接的单个单位 ch 字符串
    ch += ch
    // 右移 1 位：除以 2
    len = len >> 1
  }
}
```

todo: 继续优化
