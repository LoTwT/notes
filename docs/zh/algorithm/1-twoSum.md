# [1-两数之和](https://leetcode-cn.com/problems/two-sum/)

思路: 将**需要的数**存入缓存，判断后续的数是否命中缓存

```typescript
function twoSum(nums: number[], target: number): number[] {
  // 缓存容器
  const container: Record<number, number> = {}

  for (let i = 0; i < nums.length; i++) {
    // 当前的数
    const curr = nums[i]
    // 需要的数
    const need = target - curr

    // 判断当前的数是否命中缓存
    if (curr in container) {
      // 命中即返回结果
      return [i, container[curr]]
    } else {
      // 未命中即存入需要的数
      container[need] = i
    }
  }
}
```
