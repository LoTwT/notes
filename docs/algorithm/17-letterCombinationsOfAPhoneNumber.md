# [17-电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

思路：回溯 + 遍历

```ts
function letterCombinations(digits: string): string[] {
  // 结果的长度
  const len = digits.length

  // 数字字母映射
  const arr = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]

  // 边界条件
  if (!len) return []
  if (len === 1) return arr[digits].split("")

  // 结果数组
  const ret = []
  // 单个结果
  const path = []

  // 回溯
  backtrack(digits, len, 0)

  return ret

  /**
   * 回溯
   * 从回溯的结果逆推，更好理解
   * @param digits 要映射的字符串
   * @param len 单个结果的长度
   * @param i 要映射的字符串的，已操作到的位置
   */
  function backtrack(digits: string, len: number, i: number) {
    if (path.length === len) {
      // 找到一个结果，推入结果数组
      ret.push(path.join(""))
      return
    }

    for (const v of arr[digits[i]]) {
      // 推入该次的值
      path.push(v)
      backtrack(digits, len, i + 1)
      // 弹出该次的值
      path.pop()
    }
  }
}
```
