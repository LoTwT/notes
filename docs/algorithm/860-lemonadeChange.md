# [860-柠檬水找零](https://leetcode-cn.com/problems/lemonade-change/)

思路：贪心

贪心，每步都是最优解。

有时，局部最优解，就是全局最优解。

常见问题，找零。

```ts
function lemonadeChange(bills: number[]): boolean {
  // 5 美元数量
  let fiveCount = 0
  // 10 美元数量
  let tenCount = 0

  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i]

    // 收 5 美元
    if (bill === 5) fiveCount += 1
    else if (bill === 10) {
      // 收 10 美元，只需 5 美元找零
      if (fiveCount > 0) {
        fiveCount -= 1
        tenCount += 1
      } else return false
    } else {
      // 收 20 美元
      // 找 10 + 5 或 5 * 3
      if (fiveCount > 0 && tenCount > 0) {
        fiveCount -= 1
        tenCount -= 1
      } else if (fiveCount > 2) {
        fiveCount -= 3
      } else return false
    }
  }

  return true
}
```
