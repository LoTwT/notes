# [144-二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

思路：递归

```ts
function preorderTraversal(root: TreeNode | null): number[] {
  const arr = []
  traverse(root)
  return arr

  function traverse(root: TreeNode | null) {
    if (root == null) return

    arr.push(root.val)
    traverse(root.left)
    traverse(root.right)
  }
}
```
