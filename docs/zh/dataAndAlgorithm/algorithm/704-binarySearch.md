# [704-二分查找](https://leetcode-cn.com/problems/binary-search/)

思路：二分

```ts
function search(nums: number[], target: number): number {
  // 左右指针
  let left = 0
  let right = nums.length - 1

  // 注意等号，左右指针指向同一个值
  while (left <= right) {
    // 两种计算方法都有可能越界
    // todo 更安全的位运算
    let mid = (left + right) >> 1
    // let mid = left  + ((right - left) >> 1)

    // 当前范围的中间值
    const val = nums[mid]

    // 值比目标值小，就从 mid + 1 位往后
    if (val < target) left = mid + 1
    // 值比目标值大，就从 mid - 1 位往前
    else if (val > target) right = mid - 1
    // 找到值，返回下标
    else return mid
  }

  return -1
}
```
