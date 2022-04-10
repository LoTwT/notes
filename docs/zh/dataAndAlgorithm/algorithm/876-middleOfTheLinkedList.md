# [876-链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

思路：双指针 (快慢指针)

```ts
function middleNode(head: ListNode | null): ListNode | null {
  let slow = head
  let fast = head

  // 快指针每次走两步
  // 满指针每次走一步
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }

  return slow
}
```
