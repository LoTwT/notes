# [112-路径总和](https://leetcode-cn.com/problems/path-sum/)

思路：递归

```ts
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (root === null) return false

  // 到达叶子节点
  if (root.left === null && root.right === null) return root.val === targetSum

  // 目标值 - 当前节点值
  // 以便下个节点比较
  const rest = targetSum - root.val

  // 递归，只要有符合条件的即可
  return hasPathSum(root.left, rest) || hasPathSum(root.right, rest)
}
```
