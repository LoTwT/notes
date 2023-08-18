# [283-移动零](https://leetcode-cn.com/problems/move-zeroes/)

思路：双指针 (快慢指针)

O(1)

```ts
function moveZeroes(nums: number[]): void {
  let slow = 0
  let fast = 0

  while (fast < nums.length) {
    if (nums[fast] !== 0) {
      // 数组解构，交换值
      ;[nums[slow], nums[fast]] = [nums[fast], nums[slow]]
      slow++
    }

    fast++
  }
}
```
