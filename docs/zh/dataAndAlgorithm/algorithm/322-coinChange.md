# [322-零钱兑换](https://leetcode-cn.com/problems/coin-change/)

思路：动态规划

分析：以 `coins = [1, 2, 5]`，`amount = 11` 为例

1. 选择 1 ，dp[11] = 一个 1 + dp[11 - 1]
1. 选择 2 ，dp[11] = 一个 2 + dp[11 - 2]
1. 选择 5 ，dp[11] = 一个 5 + dp[11 - 5]

最小 dp[11] = min(dp[10], dp[9], dp[6])

i 为 coins 下标，易得 dp[amount] = 1 + dp[amount - coins[i]]

dp[amount] 的最优解 ( 所有情况的最小值 ) 代表最少的硬币个数

```ts
function coinChange(coins: number[], amount: number): number {
  // 边界条件
  if (!amount) return 0

  // amount 为 0 时，不能由硬币组成，最少硬币个数为 0
  // 所以 dp[0] 是一个特殊情况，dp 长度为 amount + 1
  // Infinity 是一个特殊的占位符
  let dp = Array(amount + 1).fill(Infinity)
  // 当所需面值和硬币面值相同时，会用到 dp[0]
  dp[0] = 0

  // 每一种硬币
  for (let i = 0; i < coins.length; i++) {
    // 硬币面值比 j 大时，不符合，只能是 0，没有修改必要
    // 硬币面值 <= j <= amount
    for (let j = coins[i]; j <= amount; j++) {
      // dp[j - coins[i]] + 1 当前循环时的解
      // dp[j] 之前的解
      // 两者取小值，为当前最优解 (局部最优解)，循环结束时的结果为全局最优解
      dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j])
      // console.log(`i => ${i} | j => ${j} | dp => ${dp}`)
    }
  }

  // 如果有符合的解，占位符会被替换为最少硬币个数
  return dp[amount] === Infinity ? -1 : dp[amount]
}
```

---

`coins = [1, 2, 5], amount = 12` 时的输出

选定一个面值的硬币后，在`[当前硬币面值, 总金额]` 的闭区间内，求换用当前面值硬币后，每个金额值的最优解

| i   | j   | dp                                                                                                     |
| --- | --- | ------------------------------------------------------------------------------------------------------ |
| 0   | 1   | 0,1,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity |
| 0   | 2   | 0,1,2,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity        |
| 0   | 3   | 0,1,2,3,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity               |
| 0   | 4   | 0,1,2,3,4,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity                      |
| 0   | 5   | 0,1,2,3,4,5,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity                             |
| 0   | 6   | 0,1,2,3,4,5,6,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity                                    |
| 0   | 7   | 0,1,2,3,4,5,6,7,Infinity,Infinity,Infinity,Infinity,Infinity                                           |
| 0   | 8   | 0,1,2,3,4,5,6,7,8,Infinity,Infinity,Infinity,Infinity                                                  |
| 0   | 9   | 0,1,2,3,4,5,6,7,8,9,Infinity,Infinity,Infinity                                                         |
| 0   | 10  | 0,1,2,3,4,5,6,7,8,9,10,Infinity,Infinity                                                               |
| 0   | 11  | 0,1,2,3,4,5,6,7,8,9,10,11,Infinity                                                                     |
| 0   | 12  | 0,1,2,3,4,5,6,7,8,9,10,11,12                                                                           |
| 1   | 2   | 0,1,1,3,4,5,6,7,8,9,10,11,12                                                                           |
| 1   | 3   | 0,1,1,2,4,5,6,7,8,9,10,11,12                                                                           |
| 1   | 4   | 0,1,1,2,2,5,6,7,8,9,10,11,12                                                                           |
| 1   | 5   | 0,1,1,2,2,3,6,7,8,9,10,11,12                                                                           |
| 1   | 6   | 0,1,1,2,2,3,3,7,8,9,10,11,12                                                                           |
| 1   | 7   | 0,1,1,2,2,3,3,4,8,9,10,11,12                                                                           |
| 1   | 8   | 0,1,1,2,2,3,3,4,4,9,10,11,12                                                                           |
| 1   | 9   | 0,1,1,2,2,3,3,4,4,5,10,11,12                                                                           |
| 1   | 10  | 0,1,1,2,2,3,3,4,4,5,5,11,12                                                                            |
| 1   | 11  | 0,1,1,2,2,3,3,4,4,5,5,6,12                                                                             |
| 1   | 12  | 0,1,1,2,2,3,3,4,4,5,5,6,6                                                                              |
| 2   | 5   | 0,1,1,2,2,1,3,4,4,5,5,6,6                                                                              |
| 2   | 6   | 0,1,1,2,2,1,2,4,4,5,5,6,6                                                                              |
| 2   | 7   | 0,1,1,2,2,1,2,2,4,5,5,6,6                                                                              |
| 2   | 8   | 0,1,1,2,2,1,2,2,3,5,5,6,6                                                                              |
| 2   | 9   | 0,1,1,2,2,1,2,2,3,3,5,6,6                                                                              |
| 2   | 10  | 0,1,1,2,2,1,2,2,3,3,2,6,6                                                                              |
| 2   | 11  | 0,1,1,2,2,1,2,2,3,3,2,3,6                                                                              |
| 2   | 12  | 0,1,1,2,2,1,2,2,3,3,2,3,3                                                                              |
