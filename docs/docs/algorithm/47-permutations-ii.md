# [47-全排列 II](https://leetcode.cn/problems/permutations-ii/)

思路：回溯

```ts
function permuteUnique(nums: number[]): number[][] {
  // 数字有重复，排列不能重复
  nums.sort((a, b) => b - a)

  const ret: number[][] = []
  const path: number[] = []

  backtrack([])

  return ret

  function backtrack(used: boolean[]) {
    if (path.length === nums.length) {
      ret.push([...path])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i]

      if (num === nums[i - 1] && !used[i - 1]) continue

      if (!used[i]) {
        used[i] = true
        path.push(num)
        backtrack(used)
        path.pop()
        used[i] = false
      }
    }
  }
}
```
