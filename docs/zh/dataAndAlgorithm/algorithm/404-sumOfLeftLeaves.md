# [404-左叶子之和](https://leetcode-cn.com/problems/sum-of-left-leaves/)

思路：递归

```ts
function sumOfLeftLeaves(root: TreeNode | null): number {
  let sum = 0
  traverse(root)
  return sum

  function traverse(node: TreeNode | null) {
    if (node === null) return

    const left = node.left

    // node.left 是单独的节点时
    if (left && !left.left && !left.right) sum += left.val

    // left 仍有子节点，继续递归
    traverse(left)
    traverse(node.right)
  }
}
```
