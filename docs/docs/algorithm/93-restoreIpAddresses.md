# [93-复原 IP 地址](https://leetcode.cn/problems/restore-ip-addresses/)

思路：回溯

```ts
function restoreIpAddresses(s: string): string[] {
  const ret: string[] = []
  const path: string[] = []

  backtrack(0)

  return ret

  function backtrack(i: number) {
    if (path.length > 4) return

    if (path.length === 4 && i === s.length) {
      ret.push(path.join("."))
      return
    }

    for (let j = i; j < s.length; j++) {
      // 判断是否符合 ip 的条件
      const str = s.substring(i, j + 1)

      if (Number(str) > 255) break

      if (str.length > 1 && str[0] === "0") break

      path.push(str)
      backtrack(j + 1)
      path.pop()
    }
  }
}
```
