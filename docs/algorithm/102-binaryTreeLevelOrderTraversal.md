# [102-二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

思路：遍历

层序遍历：逐层地从左到右访问所有节点

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return []

  // 结果
  const ret = []
  // 遍历过程中使用的队列
  const queue = [root]

  while (queue.length) {
    // 当前层的节点数
    let len = queue.length
    // 当前层的节点值
    let currLevel = []

    while (len > 0) {
      // 按照从左往右的顺序，取出节点
      const node = queue.shift()
      // 处理节点值
      currLevel.push(node.val)

      // 如果取出的节点有子节点，推入队列
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)

      // 控制节点数 (控制循环次数)
      len--
    }

    // 处理完一层后，将该层结果推入结果数组
    ret.push(currLevel)
  }

  return ret
}
```
