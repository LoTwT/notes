# [231- 2 的幂](https://leetcode-cn.com/problems/power-of-two/)

思路：位运算

```typescript
function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0
}
```

位运算解法理解：

设是 2 的幂的数为 n : `0b1000`，则 n - 1 : `0b0111`，用 & 与运算判断是否为 0 即可
