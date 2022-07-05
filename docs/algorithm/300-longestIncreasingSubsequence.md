# [300-最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

思路一：动态规划

时间复杂度：`O(n²)`

与 [322-零钱兑换](./322-coinChange.md) 类似

思路二：贪心 + 二分

时间复杂度：`O(n * log(n))`

要使递增子序列尽可能长，就要让序列上升的尽可能慢

速度快，获得的最长递增子序列的**长度正确**，但值不一定正确

```ts
// 动态规划
function lengthOfLIS(nums: number[]): number {
  let n = nums.length
  if (n === 0) return 0

  // dp[i] = 第 i 位的最长子序列的长度
  // 每一位自己本身就是一个子序列，所以默认值为 1
  const dp = Array(n).fill(1)

  // 取一位
  for (let i = 0; i < n; i++) {
    // 与所取位之前的位进行比较
    for (let j = i - 1; j >= 0; j--) {
      // 找到第一个比当前位小的位
      if (nums[i] > nums[j]) {
        // 两者取大
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  // 每一位的最长子序列取最大值
  return Math.max(...dp)
}

// 贪心 + 二分
function lengthOfLIS(nums: number[]): number {
  let n = nums.length
  if (n === 0) return 0

  // 存放递增子序列的容器
  // 此处选择将第一个值放入 (也可以不放)，下面循环的 i 随之改变即可
  const arr = [nums[0]]

  // 去一个值
  for (let i = 1; i < n; i++) {
    // 当前的值大于容器中最后一个值时 (比容器里所有值都大)
    // 将该值放到容器最后
    if (nums[i] > arr[arr.length - 1]) arr.push(nums[i])
    else {
      // 找到 arr 中第一个比 nums[i] 大的值，修改它
      let left = 0
      let right = arr.length - 1

      while (left < right) {
        // 使用位运算进行二分
        let mid = (left + right) >> 1
        if (arr[mid] < nums[i]) left = mid + 1
        else right = mid
      }

      arr[left] = nums[i]
    }
  }

  return arr.length
}
```
