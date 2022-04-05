# [94-二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

思路：递归

```ts
function inorderTraversal(root: TreeNode | null): number[] {
  const arr = []
  traverse(root)
  return arr

  function traverse(root: TreeNode | null) {
    if (!root) return

    traverse(root.left)
    arr.push(root.val)
    traverse(root.right)
  }
}
```
