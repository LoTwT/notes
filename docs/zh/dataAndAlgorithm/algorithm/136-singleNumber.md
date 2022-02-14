# [136-只出现一次的数字](https://leetcode-cn.com/problems/single-number/)

思路：位运算 (异或)

```typescript
function singleNumber(nums: number[]): number {
  let ret: number
  nums.forEach((num) => (ret ^= num))
  return ret
}
```

异或解法思路：

1. 异或，两值相同为 0，不同为 1
1. 任意值异或 0 都为其本身
1. 出现两次的数字在异或运算后为 0
