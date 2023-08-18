# [45-跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)

思路：贪心

```ts
function jump(nums: number[]): number {
  let curIndex = 0
  let nextIndex = 0
  let step = 0

  for (let i = 0; i < nums.length - 1; i++) {
    nextIndex = Math.max(nums[i] + i, nextIndex)

    if (i === curIndex) {
      curIndex = nextIndex
      step++
    }
  }

  return step
}
```
