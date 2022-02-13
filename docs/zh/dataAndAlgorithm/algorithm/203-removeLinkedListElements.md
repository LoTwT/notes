# [203-移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

思路：

1. 递归
2. 循环

```typescript
// Definition for singly-linked list.
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

/** ================================= 循环 ================================= */
function removeElements(head: ListNode | null, val: number): ListNode | null {
  // 边界条件判断
  if (head == null) return null

  // 设置哨兵元素，循环时不用再考虑 head 节点不存在时的情况
  // 哨兵元素 => 1 => 2
  // 返回时返回哨兵元素的 next
  const sentry = new ListNode(undefined, head)
  // 遍历时的临时变量
  let p = sentry

  while (p.next) {
    if (p.next.val === val) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }

  return sentry.next
}

/** ================================= 递归 ================================= */
function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (head == null) return null

  head.next = removeElements(head.next, val)
  return head.val === val ? head.next : head
}
```

递归解法的理解：

1. 递归找到了整个链表的尾节点
2. 从尾节点开始，向前删除符合条件的节点
3. 可以参考 koa 中间件的洋葱模型

模拟的执行结果：

```javascript
// 在 return 前输出整个链表

// 1 => 2 => 6 => 3 => 4 => 5 => 6  // 第一次 return 前
// 1 => 2 => 6 => 3 => 4 => 5  // 第一次的执行结果，第二次 return 前
// 1 => 2 => 6 => 3 => 4 => 5
// 1 => 2 => 6 => 3 => 4 => 5
// 1 => 2 => 6 => 3 => 4 => 5
// 1 => 2 => 3 => 4 => 5
// 1 => 2 => 3 => 4 => 5

// 最后输出整个链表
// 1 => 2 => 3 => 4 => 5
```
