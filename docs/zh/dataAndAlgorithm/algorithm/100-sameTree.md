# [100-相同的树](https://leetcode-cn.com/problems/same-tree/)

思路：递归

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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) return true
  if (p === null || q === null) return false
  if (p.val !== q.val) return false

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}
```

解法理解：

1. 递归比较，左子树和左子树比较，右子树和右子树比较
1. 终止条件

   1. 都没有子树
   1. 一边有子树，一边没子树
   1. 值不相同
