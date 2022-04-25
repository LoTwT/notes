# [701-二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

思路：二分 + 递归

```ts
function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  // 是叶子节点，或只有一个子节点，生成节点
  if (root === null) return new TreeNode(val)

  // 找到符合的父节点
  if (root.val > val) root.left = insertIntoBST(root.left, val)
  else if (root.val < val) root.right = insertIntoBST(root.right, val)

  return root
}
```
