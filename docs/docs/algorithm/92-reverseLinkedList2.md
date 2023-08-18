# [92-反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

```ts
function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number,
): ListNode | null {
  // 哨兵节点
  const dummy = new ListNode(undefined, head)
  let temp = dummy

  // 先遍历到 left 的前一个位置 (因为使用了哨兵节点)
  for (let i = 0; i < left - 1; i++) {
    temp = temp.next
  }

  // 要反转的起始节点
  let prev = temp.next
  let curr = prev.next

  // 反转节点
  // 注意循环次数 ( 3 个节点反转 2 次)
  for (let j = 0; j < right - left; j++) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }

  temp.next.next = curr
  temp.next = prev

  return dummy.next
}
```
