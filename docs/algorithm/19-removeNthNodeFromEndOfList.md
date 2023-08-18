# [19-删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

思路：双指针

```ts
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // 哨兵节点
  const dummy = new ListNode(null, head)

  let slow = dummy
  let fast = dummy

  // fast 先移动 n 个节点
  // fast 和 slow 间隔了 n 个节点
  // fast.next 不存在时，fast 为尾节点
  while (n--) {
    fast = fast.next
  }

  // fast 和 slow 共同移动，直到 fast 到达尾节点
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }

  // 删除目标节点
  // 因为使用了哨兵节点，所以 slow.next 才是目标节点
  slow.next = slow.next.next

  // 返回头结点
  return dummy.next
}
```
