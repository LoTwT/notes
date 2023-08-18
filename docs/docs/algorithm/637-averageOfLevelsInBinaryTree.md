# [637-二叉树的层平均值](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/)

思路：层序遍历

```ts
// for
function averageOfLevels(root: TreeNode | null): number[] {
  if (root === null) return []

  const ret = []
  const queue = [root]

  while (queue.length) {
    const len = queue.length
    let sum = 0

    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      sum += node.val
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }

    ret.push(sum / len)
  }

  return ret
}

// while
function averageOfLevels(root: TreeNode | null): number[] {
  if (root === null) return []

  const ret = []
  const queue = [root]

  while (queue.length) {
    let len = queue.length
    const currLevel = []

    while (len--) {
      const node = queue.shift()
      currLevel.push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }

    ret.push(currLevel.reduce((sum, i) => (sum += i), 0) / currLevel.length)
  }

  return ret
}
```
