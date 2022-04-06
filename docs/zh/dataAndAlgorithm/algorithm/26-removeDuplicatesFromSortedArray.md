# [26-删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

思路：双指针 (快慢指针)

O(1) 删除重复项 => 重复项尽可能往后移 => 有效项尽可能往前移

```ts
function removeDuplicates(nums: number[]): number {
  // 有效项的下标
  let slow = 0
  let fast = 0

  while (fast < nums.length) {
    // 快指针指向的值 不等于 慢指针指向的值
    // 找到有效项
    if (nums[fast] !== nums[slow]) {
      slow++
      // 有效项前移
      nums[slow] = nums[fast]
    }

    // 快指针无论如何都会 +1
    fast++
  }

  // 要求返回长度，有效项下标 + 1
  return slow + 1
}
```
