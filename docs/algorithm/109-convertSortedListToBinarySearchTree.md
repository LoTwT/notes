# [109-有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/)

思路：

1. 快慢指针 (找到中间节点) + 递归
1. 先遍历，得到有序数组，用 108 题的方法解决

```ts
// 快慢指针 + 递归
function sortedListToBST(head: ListNode | null): TreeNode | null {
  // tail 是 null 的原因是尾节点 next 是 null
  // 快指针完成整个链表的遍历，而慢指针到达中间节点位置
  return traverse(head, null)

  function traverse(head: ListNode | null, tail: ListNode | null) {
    if (head === tail) return null

    let slow = head
    let fast = head

    // 找到中间节点
    while (fast !== tail && fast.next !== tail) {
      slow = slow.next
      fast = fast.next.next
    }

    // 生成节点
    const root = new TreeNode(slow.val)

    // 左子树从头结点到中间节点位置
    root.left = traverse(head, slow)
    // 右子树从中间节点的下一个节点到尾节点
    root.right = traverse(slow.next, tail)

    return root
  }
}

// 遍历 + 108
function sortedListToBST(head: ListNode | null): TreeNode | null {
  const arr = []
  let curr = head

  while (curr) {
    arr.push(curr.val)
    curr = curr.next
  }

  return sortedArrayToBST(arr)

  function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (!nums.length) return null

    const mid = Math.floor(nums.length / 2)
    const root = new TreeNode(nums[mid])
    root.left = sortedArrayToBST(nums.slice(0, mid))
    root.right = sortedArrayToBST(nums.slice(mid + 1))

    return root
  }
}
```
