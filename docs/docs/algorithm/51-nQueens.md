# [51-N 皇后](https://leetcode-cn.com/problems/n-queens/)

思路：回溯

```ts
function solveNQueens(n: number): string[][] {
  const ret: string[][] = []
  const path: number[] = []

  // 回溯
  backtrack(0, path)

  return ret

  /**
   * @param row 第几行
   */
  function backtrack(row: number, tmp: number[]) {
    if (row === n) {
      ret.push(
        tmp.map((t) => {
          const arr = Array.from({ length: n }).fill(".")
          arr[t] = "Q"
          return arr.join("")
        }),
      )
    }

    for (let col = 0; col < n; col++) {
      const canNotSet = tmp.some((c, r) => {
        return c === col || r - c === row - col || r + c === row + col
      })

      if (canNotSet) continue

      backtrack(row + 1, [...tmp, col])
    }
  }
}
```
