# [654-最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)

思路：递归

最大二叉树：

- 创建一个根节点，其值为 nums 中的最大值。
- 递归地在最大值 左边 的 子数组前缀上 构建左子树。
- 递归地在最大值 右边 的 子数组后缀上 构建右子树。

```ts
function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  if (!nums.length) return null

  // 找到最大值
  const max = Math.max(...nums)
  // 获取最大值 index
  const maxIndex = nums.indexOf(max)

  // 生成节点
  const node = new TreeNode(max)

  // todo 优化
  // 递归
  node.left = constructMaximumBinaryTree(nums.slice(0, maxIndex))
  node.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1))

  return node
}
```
