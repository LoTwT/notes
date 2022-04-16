# [114-二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)

思路：前序遍历，节点缓存到 stack 中，操作 stack 生成链表

```ts
function flatten(root: TreeNode | null): void {
  const stack = []
  // 前序遍历
  preTraverse(root)

  // stack[0] 就是 root
  // 从第二个节点开始，按照题意，挂到前一个节点的右节点上
  for (let i = 1; i < stack.length; i++) {
    const prev = stack[i - 1]
    const curr = stack[i]
    prev.left = null
    prev.right = curr
  }

  function preTraverse(root: TreeNode | null) {
    if (root === null) return
    stack.push(root)
    preTraverse(root.left)
    preTraverse(root.right)
  }
}
```
