# [234-回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

思路：反转前半链表，然后比较

```ts
function isPalindrome(head: ListNode | null): boolean {
  let slow = head
  let fast = head
  let prev

  // 寻找中间节点，并反转前半链表
  while (fast && fast.next) {
    fast = fast.next.next

    const next = slow.next
    slow.next = prev
    prev = slow
    slow = next
  }

  // 链表奇偶性
  if (fast) slow = slow.next

  // 是否回文的比较
  while (prev && slow) {
    if (prev.val !== slow.val) return false

    prev = prev.next
    slow = slow.next
  }

  return true
}

// 遍历链表，取出节点值，判断数组是否回文
function isPalindrome(head: ListNode | null): boolean {
  const vals = []

  while (head) {
    vals.push(head.val)
    head = head.next
  }

  let h = 0
  let t = vals.length - 1

  while (h <= t) {
    if (vals[h] !== vals[t]) return false
    h++
    t--
  }

  return true
}
```
