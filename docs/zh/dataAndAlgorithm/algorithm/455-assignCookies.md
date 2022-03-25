# [455-分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

思路：排序 + 贪心

```ts
function findContentChildren(g: number[], s: number[]): number {
  // 排序
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)

  // 结果小朋友数
  let res = 0
  // 饼干下标 ( 倒序 )
  // 同一块饼干，尽可能满足胃口更大的小朋友
  let index = s.length - 1

  for (let i = g.length - 1; i >= 0; i--) {
    // 还有饼干 且 能满足小朋友胃口
    if (index >= 0 && s[index] >= g[i]) {
      res += 1
      index -= 1
    }
  }

  return res
}
```

总结

1. 合适的处理数据，更便于计算
1. 合理审题，没必要非得物尽其用 ( 多吃点也不是坏事... )
