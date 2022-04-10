# [142-环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

```ts
function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null) return null

  let slow = head
  let fast = head

  while (fast !== null) {
    slow = slow.next

    if (fast.next !== null) fast = fast.next.next
    else return null

    if (fast === slow) {
      let curr = head
      while (curr !== slow) {
        curr = curr.next
        slow = slow.next
      }

      return curr
    }
  }

  return null
}
```
