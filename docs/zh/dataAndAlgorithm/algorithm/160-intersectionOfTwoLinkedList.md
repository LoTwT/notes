# [160-相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

思路：将链表 A 拼接到链表 B 后，链表 B 拼接到链表 A 后，构造两个长度相同的链表进行比较

```ts
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  let currA = headA
  let currB = headB

  // 链表拼接需要找到尾节点
  // 为了提高效率，判断单个链表到尾节点后，直接遍历另一个链表即可
  while (currA !== currB) {
    currA = currA === null ? headB : currA.next
    currB = currB === null ? headA : currB.next
  }

  return currA
}
```
