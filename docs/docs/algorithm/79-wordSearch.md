# [79-单词搜索](https://leetcode-cn.com/problems/word-search/)

思路：回溯 + 递归

```ts{19,32,35,41,51}
function exist(board: string[][], word: string): boolean {
  // 参数边界条件
  if (board.length === 0) return false
  if (word.length === 0) return true

  // 行数
  const row = board.length
  // 列数
  const col = board[0].length

  // 开始循环查找
  // 每一个字母都可以作为起点搜索
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      // 查找结果
      // 0 是字母在 word 中的索引
      const ret = backtrack(r, c, 0)

      if (ret) return true
    }
  }

  return false

  // 回溯 + 递归
  function backtrack(r: number, c: number, index: number): boolean {
    // 边界条件
    if (r >= row || r < 0) return false
    if (c >= col || c < 0) return false

    // 不符合条件，结束此次递归
    if (board[r][c] !== word[index]) return false

    // 最后一个字符也相同，查询成功
    if (index === word.length - 1) return true

    // 缓存当前位置字符
    const letter = board[r][c]
    // 将当前位置的值置为一个与 borad 中不交叉的字符串，防止查询路径重复
    // 因为 ts，无法在此处将值置为 null
    board[r][c] = "__has__check__"

    // 向上下左右四个方向查找，根据题意，只要找到一个就返回 true
    const ret =
      backtrack(r + 1, c, index + 1) ||
      backtrack(r - 1, c, index + 1) ||
      backtrack(r, c + 1, index + 1) ||
      backtrack(r, c - 1, index + 1)

    // 复原当前位置字符
    board[r][c] = letter

    return ret
  }
}
```

总结：

1. 回溯时避免路径重复
1. 题意不需要所有路径时，递归结果只需要 `||` 即可
