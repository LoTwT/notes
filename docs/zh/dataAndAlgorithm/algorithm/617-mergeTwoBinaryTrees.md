# [617-合并二叉树](https://leetcode-cn.com/problems/merge-two-binary-trees/)

```ts
function mergeTrees(
  root1: TreeNode | null,
  root2: TreeNode | null,
): TreeNode | null {
  return dfs(root1, root2)

  function dfs(root1: TreeNode | null, root2: TreeNode | null) {
    if (root1 === null) return root2
    if (root2 === null) return root1

    root1.val += root2.val
    root1.left = dfs(root1.left, root2.left)
    root1.right = dfs(root1.right, root2.right)

    return root1
  }
}
```
