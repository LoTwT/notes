# [20-有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

思路：栈 (先进后出，后进先出)

```typescript{8,16,20}
function isValid(s: string): boolean {
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
  }

  const stack: string[] = []

  for (let i = 0; i < s.length; i++) {
    const curr = s[i]

    if (curr in map) {
      stack.push(curr)
    } else {
      if (curr !== map[stack.pop()]) return false
    }
  }

  return !stack.length
}
```

解法思路：

1. 生成一个左右括号的映射
1. 生成一个模拟栈的数组 (只使用 push 和 pop)
1. 左括号入栈，遇到右括号时，弹出栈的最后一个左括号
1. 通过映射得到对应的右括号，与当前右括号进行比较，不同则返回 false
1. 当循环结束，如果栈内仍有左括号，也返回 false
