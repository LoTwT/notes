# [101-对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

```ts
function isSymmetric(root: TreeNode | null): boolean {
  return traverse(root.left, root.right)

  function traverse(root1: TreeNode | null, root2: TreeNode | null) {
    if (root1 === null && root2 === null) return true
    if (root1 === null || root2 === null) return false

    if (root1.val === root2.val)
      // 对称二叉树
      // 左节点的左子节点 和 右节点的右子节点
      // 左节点的右子节点 和 右节点的左子节点
      return (
        traverse(root1.left, root2.right) && traverse(root1.right, root2.left)
      )

    return false
  }
}
```
