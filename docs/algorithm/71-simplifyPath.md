# [71-简化括号](https://leetcode-cn.com/problems/simplify-path/)

思路：栈

```typescript
function simplifyPath(path: string): string {
  const stack: string[] = []

  const paths = path.split("/")

  for (let i = 0; i < paths.length; i++) {
    const p = paths[i]

    if (p === "..") {
      stack.pop()
    } else if (p && p !== ".") {
      stack.push(p)
    }
  }

  return "/" + stack.join("/")
}
```

解法思路

1. `..` 回到上一级 (pop)
1. `.` 当前目录 (什么都不做)
1. 其余为具体目录名 (push)
1. 生成一个模拟栈的数组完成上述操作
1. 最后按照要求拼接路径即可
