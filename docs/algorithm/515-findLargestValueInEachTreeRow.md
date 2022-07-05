# [515-在每个树行中找最大值](https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/)

思路：层序遍历

```ts
function largestValues(root: TreeNode | null): number[] {
  if (root === null) return []

  const ret = []
  const queue = [root]

  while (queue.length) {
    let len = queue.length
    let max = queue[0].val

    while (len--) {
      const node = queue.shift()
      max = Math.max(max, node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }

    ret.push(max)
  }

  return ret
}
```
