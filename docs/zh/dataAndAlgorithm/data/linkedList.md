# 链表

[链表 - 百度百科](https://baike.baidu.com/item/%E9%93%BE%E8%A1%A8/9794473?fr=aladdin)

## 链表和数组

javascript 中自带数组，而链表需要自行实现。

复杂度比较:

|              | 数组 | 链表 |
| ------------ | ---- | ---- |
| 查(随机访问) | O(1) | O(n) |
| (仅)增       | O(n) | O(1) |
| (仅)删       | O(n) | O(1) |

对于有顺序的数据，或随机访问操作多的数据，建议使用数组。
对于插入删除操作多，而随机访问操作少的数据，建议使用链表。

## 实现

用 typescript 实现简单的链表

```typescript
type Nullable<T> = T | null

class Node<T> {
  value: T
  next: Nullable<Node<T>>

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

class LinkedList<T> {
  head: Nullable<Node<T>>
  length: number

  constructor() {
    this.head = null
    this.length = 0
  }

  append(value: T) {
    const node = new Node<T>(value)
    // 缓存 head 节点
    let p = this.head

    // 判断 head 结点是否存在
    if (p) {
      // 遍历找到链表的最后一个节点 (双向链表的 tail)，将要创建的 node 赋值给最后一个节点的 next
      while (p.next) {
        p = p.next
      }
      p.next = node
    } else {
      // 如果没有 head 节点，链表为空，将要创建的 node 赋值给 head
      this.head = node
    }

    this.length++
  }

  toString() {
    let p = this.head
    let ret = "empty"

    if (p) {
      ret = String(p.value)
      while (p.next) {
        p = p.next
        ret += " => " + String(p.value)
      }
    }

    return ret
  }
}

const linkedList = new LinkedList()
linkedList.append(1)
linkedList.append(true)
linkedList.append(3)
linkedList.append("4")
console.log(linkedList.toString())
console.log(linkedList.length)
```
