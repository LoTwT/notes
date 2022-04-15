# [100-相同的树](https://leetcode-cn.com/problems/same-tree/)

思路：递归 / 迭代

```typescript
// Definition for a binary tree node.
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

// 递归 1
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) return true
  if (p === null || q === null) return false
  if (p.val !== q.val) return false

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

// 递归 2
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  return traverse(p, q)

  function traverse(p: TreeNode | null, q: TreeNode | null) {
    if (p === null && q === null) return true
    if (p === null || q === null) return false

    const left = traverse(p.left, q.left)
    const right = traverse(p.right, q.right)

    if (p.val === q.val && left && right) return true

    return false
  }
}

// 迭代
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) return true
  if (p === null || q === null) return false

  const queueP = [p]
  const queueQ = [q]

  while (queueP.length && queueQ.length) {
    const nodeP = queueP.pop()
    const nodeQ = queueQ.pop()

    if (nodeP.val !== nodeQ.val) return false

    if (nodeP.left && nodeQ.left) {
      queueP.push(nodeP.left)
      queueQ.push(nodeQ.left)
    } else if (nodeP.left || nodeQ.left) return false

    if (nodeP.right && nodeQ.right) {
      queueP.push(nodeP.right)
      queueQ.push(nodeQ.right)
    } else if (nodeP.right || nodeQ.right) return false
  }

  return queueP.length === 0 && queueQ.length === 0
}
```

递归 1 解法理解：

1. 递归比较，左子树和左子树比较，右子树和右子树比较
1. 终止条件

   1. 都没有子树
   1. 一边有子树，一边没子树
   1. 值不相同
