# [131-分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)

思路：回溯

```ts
function partition(s: string): string[][] {
  const ret: string[][] = []
  const path: string[] = []

  backtrack(0)

  return ret

  function backtrack(i: number) {
    if (i >= s.length) {
      ret.push([...path])
      return
    }

    for (let j = i; j <= s.length; j++) {
      if (!isPalindrome(s, i, j)) continue

      // 截取字符串的一部分
      path.push(s.substring(i, j + 1))
      backtrack(j + 1)
      path.pop()
    }
  }
}

function isPalindrome(s: string, l: number, r: number) {
  while (l <= r) {
    if (s[l] !== s[r]) return false

    l++
    r--
  }

  return true
}
```
