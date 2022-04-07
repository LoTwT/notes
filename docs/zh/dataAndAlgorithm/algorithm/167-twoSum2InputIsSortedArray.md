# [167-两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

思路：双指针 (头尾指针)

```ts
function twoSum(numbers: number[], target: number): number[] {
  let head = 0
  let tail = numbers.length - 1

  // 头尾指针所在位值的和
  let sum

  while (head < tail) {
    sum = numbers[head] + numbers[tail]

    // 题意说明必定会有一个答案
    // 题意要求从下标 1 开始，所以结果 + 1
    if (sum === target) return [head + 1, tail + 1]
    else if (sum > target) tail--
    else head++
  }
}
```
