# [141-环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

思路：

1. 使用 `Set` 判断节点是否再次出现
2. 双指针 (快慢指针)

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

/** =================== Set ===================== */
function hasCycle(head: ListNode | null): boolean {
  const container = new Set()

  while (head) {
    if (container.has(head)) {
      return true
    } else {
      container.add(head)
    }
    head = head.next
  }

  return false
}

/** =================== 双指针 ===================== */
function hasCycle(head: ListNode | null): boolean {
  let fast = head
  let slow = head

  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) return true
  }

  return false
}
```

双指针解法的理解：相同起点、不同速度、同向运动，如果有环，则会再次相遇。
