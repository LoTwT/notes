# [27-移除元素](https://leetcode-cn.com/problems/remove-element/)

思路：双指针 (快慢指针)

O(1) => 有效项前移

```ts
function removeElement(nums: number[], val: number): number {
  // 有效项下标 +1，因为第一位也要比较
  let slow = 0
  let fast = 0

  while (fast < nums.length) {
    // 找到有效项
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]
      slow++
    }

    // 快指针无论如何都会 +1
    fast++
  }

  // 返回长度 = 有效项下标 +1
  return slow
}
```
