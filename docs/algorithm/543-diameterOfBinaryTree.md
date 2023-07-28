# [543-二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

```ts
function diameterOfBinaryTree(root: TreeNode | null): number {
  let len = 0
  dfs(root)
  return len

  function dfs(root: TreeNode | null) {
    if (root === null) return 0

    const left = dfs(root.left)
    const right = dfs(root.right)

    len = Math.max(len, left + right)

    return Math.max(left, right) + 1
  }
}
```
