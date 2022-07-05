# [257-二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

思路：遍历

```ts
function binaryTreePaths(root: TreeNode | null): string[] {
  const ret = []
  preTraverse(root, "")
  return ret

  // 前序遍历
  function preTraverse(node: TreeNode | null, path: string) {
    if (node === null) return null

    // 到达叶子节点，该次遍历结束
    if (node.left === null && node.right === null)
      ret.push(`${path}${node.val}`)

    // 遍历时带上要拼接的字符串格式
    preTraverse(node.left, `${path}${node.val}->`)
    preTraverse(node.right, `${path}${node.val}->`)
  }
}
```
