# [572-另一棵树的子树](https://leetcode-cn.com/problems/subtree-of-another-tree/)

思路：递归

```ts
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // 不停地比较，某一个子树，是不是和 subRoot 一样
  if (root === null) return false

  // 值相同时，有可能符合要求
  // 借用 isSameTree 进行比较
  if (root.val === subRoot.val && isSameTree(root, subRoot)) return true

  // 递归
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)

  function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) return true
    if (p === null || q === null) return false
    if (p.val !== q.val) return false

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  }
}
```
