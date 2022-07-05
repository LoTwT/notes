# [39-组合总和](https://leetcode-cn.com/problems/combination-sum/)

思路：回溯

```ts
function combinationSum(candidates: number[], target: number): number[][] {
  const ret = []
  const path = []

  // 排序的复杂度是 n*lgn
  candidates.sort()

  // 回溯
  backtrack(0, 0)

  return ret

  function backtrack(i: number, sum: number) {
    if (sum > target) return

    // 找到一个组合，推入结果数组
    if (sum === target) {
      ret.push([...path])
      return
    }

    for (let j = i; j < candidates.length; j++) {
      const n = candidates[j]

      if (n + sum > target) continue

      path.push(n)
      sum += n

      backtrack(j, sum)

      path.pop()
      sum -= n
    }
  }
}
```
