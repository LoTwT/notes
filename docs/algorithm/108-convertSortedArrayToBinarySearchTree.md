# [108-将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

思路：中序遍历

**高度平衡** 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

```ts
function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (!nums.length) return null

  // 二叉搜索树的中序遍历，就是升序列表
  // 数组的中间位置作为树的根节点
  const mid = Math.floor(nums.length / 2)

  const root = new TreeNode(nums[mid])

  // 递归
  // 以同样的方式操作左右子节点
  root.left = sortedArrayToBST(nums.slice(0, mid))
  root.right = sortedArrayToBST(nums.slice(mid + 1))

  return root
}
```
