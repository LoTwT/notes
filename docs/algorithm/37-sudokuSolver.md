# [37-解数独](https://leetcode-cn.com/problems/sudoku-solver/)

思路：回溯

```ts
function solveSudoku(board: string[][]) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== ".") continue

      // 放数字
      for (let k = 1; k <= 9; k++) {
        const v = k.toString()

        // 判断数字放完后，数独是否合理
        if (isValid(board, i, j, v)) {
          // 放入数字
          board[i][j] = v
          // 放下一个数字
          if (solveSudoku(board)) return true
          // 不符合条件，取出数字
          board[i][j] = "."
        }
      }

      return false
    }
  }

  return true

  function isValid(board: string[][], row: number, col: number, v: string) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === v || board[i][col] === v) return false
    }

    const x = Math.floor(row / 3) * 3
    const y = Math.floor(col / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[x + i][y + j] === v) return false
      }
    }

    return true
  }
}
```
