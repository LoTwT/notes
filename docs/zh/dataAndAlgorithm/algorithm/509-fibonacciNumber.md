# [509-斐波那切数](https://leetcode-cn.com/problems/fibonacci-number/)

思路：动态规划

动态规划 (递推公式)：每一步的状态，是前一步推导而来

1. 推导中间值 `dp[i]`
1. 确定推导公式
1. 确定初始化条件
1. 确定遍历顺序

```ts
function fib(n: number): number {
  // 初始值
  const dp = [0, 1]

  // 遍历顺序
  for (let i = 2; i <= n; i++) {
    // 推导公式
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}
```
