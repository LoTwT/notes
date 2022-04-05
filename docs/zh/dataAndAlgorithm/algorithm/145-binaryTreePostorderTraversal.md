# [145-二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

思路：遍历

```ts
function postorderTraversal(root: TreeNode | null): number[] {
  const arr = []
  traverse(root)
  return arr

  function traverse(root: TreeNode | null) {
    if (root == null) return

    traverse(root.left)
    traverse(root.right)
    arr.push(root.val)
  }
}
```
