# [700-二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)

思路：二分 + 递归

```ts
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) return null

  // 找到目标值
  if (root.val === val) return root
  // 节点值 > 目标值，向左侧查找
  else if (root.val > val) return searchBST(root.left, val)
  // 节点值 < 目标值，向右侧查找
  else return searchBST(root.right, val)
}
```
