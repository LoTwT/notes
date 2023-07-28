# [151-颠倒字符串中的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

思路：队列

```ts
function reverseWords(s: string): string {
  let left = 0
  let right = s.length - 1
  const queue = []
  let word = ""

  while (s.charAt(left) === " ") {
    left++
  }

  while (s.charAt(right) === " ") {
    right--
  }

  while (left <= right) {
    const ch = s.charAt(left)
    if (ch === " " && word) {
      queue.unshift(word)
      word = ""
    } else if (ch !== " ") word += ch

    left++
  }

  queue.unshift(word)

  return queue.join(" ")
}

function reverseWords(s: string): string {
  return s
    .trim()
    .split(" ")
    .reverse()
    .filter((i) => i)
    .join(" ")
}
```
