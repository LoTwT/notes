# [78-子集](https://leetcode.cn/problems/subsets/)

思路：回溯

```ts
function subsets(nums: number[]): number[][] {
  const ret: number[][] = []
  const path: number[] = []

  // 回溯
  backtrack(0)

  return ret

  function backtrack(index: number) {
    ret.push([...path])

    for (let i = index; i < nums.length; i++) {
      const num = nums[i]

      path.push(num)
      backtrack(i + 1)
      path.pop()
    }
  }
}
```
