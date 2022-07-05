# [232-用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

```ts
class MyQueue {
  stackIn: number[]
  stackOut: number[]

  constructor() {
    this.stackIn = []
    this.stackOut = []
  }

  push(x: number): void {
    this.stackIn.push(x)
  }

  pop(): number {
    if (this.stackOut.length) return this.stackOut.pop()

    while (this.stackIn.length) {
      this.stackOut.push(this.stackIn.pop())
    }

    return this.stackOut.pop()
  }

  peek(): number {
    const x = this.pop()
    this.stackOut.push(x)
    return x
  }

  empty(): boolean {
    return !this.stackIn.length && !this.stackOut.length
  }
}
```
