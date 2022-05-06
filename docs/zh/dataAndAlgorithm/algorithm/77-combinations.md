# [77-组合](https://leetcode-cn.com/problems/combinations/)

思路：回溯

```ts
function combine(n: number, k: number): number[][] {
  // 结果数组
  const ret: number[][] = []
  // 每一个结果的容器
  const path: number[] = []

  // 回溯
  backtrack(n, k, 1)

  return ret

  /**
   * @param i 当前数值区间的起始值
   */
  function backtrack(n: number, k: number, i: number) {
    const len = path.length

    if (len === k) {
      ret.push([...path])
      return
    }

    for (let j = i; j <= n; j++) {
      path.push(j)
      backtrack(n, k, j + 1)
      path.pop()
    }
  }
}
```
