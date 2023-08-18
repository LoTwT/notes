# [206-反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

```ts
function reverseList(head: ListNode | null): ListNode | null {
  // 边界条件
  if (!head || !head.next) return head

  let prev = null
  // 当前节点
  let curr = head

  while (curr) {
    // 取出下一个节点
    const next = curr.next
    // 将当前节点指向原本的前一个节点 (反转)
    curr.next = prev
    // 将反转完的当前节点赋值给 prev
    prev = curr
    // 将之前取出的下一个节点赋值给 curr，继续循环
    curr = next
  }

  return prev
}
```
