# [429-N 叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)

思路：层序遍历

```ts
function levelOrder(root: Node | null): number[][] {
  if (root === null) return []

  const ret = []
  let queue = [root]

  while (queue.length) {
    let len = queue.length
    const currLevel = []

    while (len--) {
      const node = queue.shift()
      currLevel.push(node.val)

      if (node.children.length > 0) queue = queue.concat(node.children)
    }

    ret.push(currLevel)
  }

  return ret
}
```
