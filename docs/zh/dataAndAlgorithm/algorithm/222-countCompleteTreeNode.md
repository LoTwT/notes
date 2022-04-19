# [222-完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)

思路：递归

```ts
function countNodes(root: TreeNode | null): number {
  return traverse(root)

  function traverse(node: TreeNode | null) {
    if (node === null) return 0

    // 底层节点集中在左边若干位置
    // 从左往右
    const leftNum = traverse(node.left)
    const rightNum = traverse(node.right)

    return leftNum + rightNum + 1
  }
}
```
