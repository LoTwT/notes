# [225-用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

```ts
class MyStack {
  queue1: number[]
  // 备份
  queue2: number[]

  constructor() {
    this.queue1 = []
    this.queue2 = []
  }

  push(x: number): void {
    this.queue1.push(x)
  }

  pop(): number {
    if (!this.queue1.length) {
      ;[this.queue1, this.queue2] = [this.queue2, this.queue1]
    }

    while (this.queue1.length > 1) {
      this.queue2.push(this.queue1.shift())
    }

    // 1. 队列 1 有数据，队列 1 清空，备份到队列 2
    // 2. 队列 1 没有数据，两个队列交换后，弹出数据
    return this.queue1.shift()
  }

  top(): number {
    const x = this.pop()
    this.queue1.push(x)
    return x
  }

  empty(): boolean {
    return !this.queue1.length && !this.queue2.length
  }
}
```
