# [150-逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

思路：栈

```ts
function evalRPN(tokens: string[]): number {
  // 策略模式
  // 对应不同的操作符
  const operator = {
    "+": (a: number, b: number) => b + a,
    "-": (a: number, b: number) => b - a,
    "*": (a: number, b: number) => b * a,
    "/": (a: number, b: number) => (b / a) | 0, // 去尾
  }

  // 存储计算值的栈
  const stack = []

  for (let i = 0; i < tokens.length; i++) {
    // 取出每一位值
    let t = tokens[i]

    // 当值是预设的操作符时，进行对应的操作
    // 栈先进后出
    // 参数 1 是被操作数
    // 参数 2 是操作数
    if (t in operator) t = operator[t](stack.pop(), stack.pop())

    // 将计算值或 token 值存入栈，以便下一次计算
    stack.push(+t)
  }

  // 最后剩下的，就是整个过程的答案
  return stack.pop()
}
```
