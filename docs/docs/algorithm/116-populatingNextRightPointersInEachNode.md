# [116-填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

思路：层序遍历

```ts
function connect(root: Node | null): Node | null {
  if (root === null) return root

  // leetcode typescript 解法类型 bug
  const queue: any[] = [root]

  while (queue.length) {
    let len = queue.length

    while (len--) {
      const node = queue.shift()

      // 题意中要求右侧没有节点时赋值 NULL
      // 根据类型，实际赋值 undefined，所以以下判断即可
      if (len > 0) node.next = queue[0]

      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }

  return root
}
```
