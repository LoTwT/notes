# [111-二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。

思路：递归 / 遍历

```ts
// 递归
function minDepth(root: TreeNode | null): number {
  if (root === null) return 0
  // 没有子节点，代表是叶子节点
  if (root.left === null && root.right === null) return 1
  // 有右子节点
  if (root.left === null) return minDepth(root.right) + 1
  // 有左子节点
  if (root.right === null) return minDepth(root.left) + 1
  // 有左右子节点
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}

// 遍历
function minDepth(root: TreeNode | null): number {
  if (root === null) return 0

  // 记录层级
  let dep = 0
  const stack = [root]

  while (true) {
    // 当前层级的节点个数
    let size = stack.length
    dep++

    // 精确控制遍历的个数
    while (size--) {
      const node = stack.shift()

      // 找到叶子节点即返回当前层级
      if (!node.left && !node.right) return dep

      node.left && stack.push(node.left)
      node.right && stack.push(node.right)
    }
  }
}
```
