# [46-全排列](https://leetcode-cn.com/problems/permutations/)

思路：回溯 + 递归

[回溯算法](https://baike.baidu.com/item/%E5%9B%9E%E6%BA%AF%E7%AE%97%E6%B3%95/9258495?fr=aladdin) 是深度优先的。

```ts
function permute(nums: number[]): number[][] {
  const res: number[][] = []
  backtrack([]) // 从空路径开始
  return res

  // 回溯
  function backtrack(path: number[]) {
    if (path.length === nums.length) res.push(path)

    // 递归
    nums.forEach((n) => {
      if (path.includes(n)) return
      backtrack(path.concat(n))
    })
  }
}
```

```ts{9-11,15-16,22}
function permute(nums: number[]): number[][] {
  const result: number[][] = []
  backtrack(result, [], nums)
  return result

  // 回溯 + 递归
  function backtrack(result: number[][], temp: number[], nums: number[]) {
    // 终止条件
    if (temp.length === nums.length) {
      return result.push([...temp])
    }

    for (let i = 0; i < nums.length; i++) {
      // 找到一个不在 temp 中的数字
      if (temp.includes(nums[i])) continue
      temp.push(nums[i])

      // 递归 ( 继续找符合要求的数字 )
      backtrack(result, temp, nums)

      // 回溯 ( 将已经操作完的数字弹出 )
      temp.pop()
    }
  }
}
```

总结：

1. 不断深入寻找满足条件地值 ( 深度优先 )
1. 要获取所有可能结果 ( 全排列 )，所以需要一个容器去装各种结果 ( result )
