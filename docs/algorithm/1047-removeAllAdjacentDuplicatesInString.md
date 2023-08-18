# [1047-删除字符串中的所有相邻重复项](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string/)

思路：栈

```ts
function removeDuplicates(s: string): string {
  const stack = []

  for (const x of s) {
    // 当前字母和 stack 最后一个字母相同时，弹出
    if (stack.length && stack[stack.length - 1] === x) stack.pop()
    // 不相同时，字母进栈
    else stack.push(x)
  }

  return stack.join("")
}
```
