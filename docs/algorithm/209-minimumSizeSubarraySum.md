# [209-长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

思路：双指针 (快慢指针)

```ts
function minSubArrayLen(target: number, nums: number[]): number {
  const len = nums.length
  let slow = 0
  let fast = 0
  let sum = 0
  let result = len + 1

  while (fast < len) {
    sum += nums[fast++]

    while (sum >= target) {
      const subLen = fast - slow
      result = result < subLen ? result : subLen
      sum -= nums[slow++]
    }
  }

  return result > len ? 0 : result
}
```
