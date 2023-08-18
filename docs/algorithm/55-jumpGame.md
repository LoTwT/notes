# [55-跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

思路：贪心

不断寻找能够到达的最远距离。

```ts
function canJump(nums: number[]): boolean {
  // 跳跃的范围
  let cover = 0
  for (let i = 0; i <= cover; i++) {
    // i + nums[i] 表示当前所在下标 + 能够跳跃的距离
    cover = Math.max(cover, i + nums[i])
    // cover 比 nums.length - 1 大认为可以到达
    if (cover >= nums.length - 1) return true
  }

  return false
}
```

总结

1. 根据题干，简化问题，这里只要能够达到即可 ( 即 >= )
1. 思路优先于实现
