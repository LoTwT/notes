# [344-反转字符串](https://leetcode-cn.com/problems/reverse-string/)

思路：双指针 (头尾指针)

```ts
function reverseString(s: string[]): void {
  let head = 0
  let tail = s.length - 1

  while (head <= tail) {
    ;[s[head], s[tail]] = [s[tail], s[head]]
    head++
    tail--
  }
}
```
