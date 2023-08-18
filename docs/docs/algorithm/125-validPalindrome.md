# [125-验证回文串](https://leetcode.cn/problems/valid-palindrome/)

思路：双指针

```ts
function isPalindrome(s: string): boolean {
  // 按照题意提取字符
  const str = s.replace(/[^a-z0-9]/gi, "").toLowerCase()

  let left = 0
  let right = str.length - 1

  while (left <= right) {
    if (str[left] !== str[right]) return false

    left++
    right--
  }

  return true
}
```
