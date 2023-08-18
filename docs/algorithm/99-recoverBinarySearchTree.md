# [99-恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/)

思路：中序遍历

```ts
function recoverTree(root: TreeNode | null): void {
  // 存放中序遍历的结果
  // 因为是二叉搜索树，所以应该是递增的
  // 不符合时，就找到了错误节点
  const arr: TreeNode[] = []

  // 出错的两个节点
  let n1: TreeNode
  let n2: TreeNode

  // 中序遍历
  traverse(root)

  for (let i = 0; i < arr.length - 1; i++) {
    // 找到出错的节点
    if (arr[i].val > arr[i + 1].val) {
      if (!n1) {
        n1 = arr[i]
      }
      n2 = arr[i + 1]
    }
  }

  // 交换错误节点值
  ;[n1.val, n2.val] = [n2.val, n1.val]

  function traverse(node: TreeNode | null) {
    if (node === null) return

    traverse(node.left)
    arr.push(node)
    traverse(node.right)
  }
}
```
