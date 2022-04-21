# [199-二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)

思路：层序遍历

```ts
function rightSideView(root: TreeNode | null): number[] {
  if (root === null) return []

  const ret = []
  const queue = [root]

  while (queue.length) {
    let len = queue.length

    while (len--) {
      const node = queue.shift()

      // 节点顺序从左向右
      // 当遍历到该层最后一个节点时，即为最右边的节点
      if (len === 0) ret.push(node.val)

      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }

  return ret
}
```
