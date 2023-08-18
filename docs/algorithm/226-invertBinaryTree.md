# [226-翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

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

function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return root
  }

  ;[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]

  return root
}
```

解法理解：

1. 每个节点递归左右翻转
1. 数组解构赋值，元素换位很方便
