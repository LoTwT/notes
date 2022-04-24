# [117-填充每个节点的下一个右侧节点指针 II](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

进阶：

- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

思路：层序遍历

```ts
// 因为使用了递归，所以和 116 一致
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
