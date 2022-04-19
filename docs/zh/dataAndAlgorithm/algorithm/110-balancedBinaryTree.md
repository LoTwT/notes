# [110-平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

思路：递归

```ts
function isBalanced(root: TreeNode | null): boolean {
  return traverse(root) !== -1

  function traverse(node: TreeNode | null) {
    if (node === null) return 0

    // 左子树深度
    const leftDepth = traverse(node.left)
    if (leftDepth === -1) return -1

    // 右子树深度
    const rightDepth = traverse(node.right)
    if (rightDepth === -1) return -1

    // 高度差 > 1，返回 -1
    if (Math.abs(leftDepth - rightDepth) > 1) return -1
    else return Math.max(leftDepth, rightDepth) + 1
  }
}
```
