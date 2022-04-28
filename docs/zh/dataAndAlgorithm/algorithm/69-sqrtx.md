# [669- x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

思路：二分

`0 <= √x <= x`

```ts
function mySqrt(x: number): number {
  // 这里的值类似数组的index
  // 所以操作相同
  let left = 0
  let right = x

  while (left <= right) {
    const mid = left + ((right - left) >> 1)

    // 二分
    if (mid * mid < x) left = mid + 1
    else if (mid * mid > x) right = mid - 1
    else return mid
  }

  return right
}
```
