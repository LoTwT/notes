# [452-用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)

思路：贪心

```ts
function findMinArrowShots(points: number[][]): number {
  points.sort((a, b) => a[0] - b[0])

  // 气球重叠的部分，一起用一支箭
  let result = 1
  // 开始的部分就有一支箭
  for (let i = 1; i < points.length; i++) {
    // 两者没有交叉
    if (points[i][0] > points[i - 1][1]) result++
    // 尽可能找重叠层数多的
    else points[i][1] = Math.min(points[i - 1][1], points[i][1])
  }

  return result
}
```
