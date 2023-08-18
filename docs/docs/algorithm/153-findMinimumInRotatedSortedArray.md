# [153-寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

思路：二分

旋转后的结果有 1 段或 2 段递增序列，类似二分处理即可

```ts
function findMin(nums: number[]): number {
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    // 找到中间点 index
    const mid = left + ((right - left) >> 1)

    // 二分
    if (nums[mid] < nums[right]) right = mid
    else if (nums[mid] > nums[right]) left = mid + 1
  }

  return nums[left]
}
```
