# [977-有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

思路：双指针 (头尾指针)

时间复杂度 `O(n)`

有序数组，正负值，头尾指针对比平方值，大的值放在结果数组靠后的位置即可。

```ts
function sortedSquares(nums: number[]): number[] {
  let head = 0
  let tail = nums.length - 1
  // 结果数组
  const result = Array.from({length: nums.length})
  // 结果数组当前位的下标
  let cur = tail

  while (head <= tail) {
    const h = nums[head] * nums[head]
    const t = nums[tail] * nums[tail]

    // 比较平方值，大的放进结果数组
    if (h < t) {
      result[cur] = t
      tail--
    } else {
      result[cur] = h
      head++
    }

    cur--
  }

  return result
}
```
