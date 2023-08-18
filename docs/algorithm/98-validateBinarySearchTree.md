# [98-验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

思路：中序遍历

**有效**二叉搜索树定义如下：

- 节点的左子树只包含 小于 当前节点的数。
- 节点的右子树只包含 大于 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

```ts
function isValidBST(root: TreeNode | null): boolean {
  if (root === null) return false
  let prev = Number.NEGATIVE_INFINITY
  return traverse(root)

  function traverse(node: TreeNode | null) {
    // 到达叶子节点，前面验证都已通过
    if (node === null) return true

    const left = traverse(node.left)

    // 破坏了二叉搜索树的定义
    // 应该递增 ( 从下往上 )
    if (prev >= node.val) return false

    prev = node.val
    const right = traverse(node.right)

    return left && right
  }
}
```
