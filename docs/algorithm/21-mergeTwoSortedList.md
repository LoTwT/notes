# [21-合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

```ts
function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  // 哨兵节点
  let dummy = new ListNode(undefined, null)
  let temp = dummy

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      temp.next = l1
      l1 = l1.next
    } else {
      temp.next = l2
      l2 = l2.next
    }

    temp = temp.next
  }

  // 将未遍历完的节点追加到合并完成的节点后
  temp.next = l1 !== null ? l1 : l2

  return dummy.next
}
```
