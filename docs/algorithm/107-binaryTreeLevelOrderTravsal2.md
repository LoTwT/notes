# [107-二叉树的层序遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

与 [102](./102-binaryTreeLevelOrderTraversal.md) 类似，把该题答案 `reverse` 也是正确答案。

```ts
function levelOrderBottom(root: TreeNode | null): number[][] {
  if (root === null) return []

  // 结果
  const ret = []
  // 遍历中用的队列
  const queue = [root]

  while (queue.length) {
    // 当前层的节点数
    let len = queue.length
    const currLevel = []

    while (len > 0) {
      const node = queue.shift()
      currLevel.push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
      len--
    }

    // 核心
    // 将每层遍历的结果插在第一个即可
    ret.unshift(currLevel)
  }

  return ret
}
```
