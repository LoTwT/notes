# [144-二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

思路：遍历 / 迭代

```ts
// 遍历
function preorderTraversal(root: TreeNode | null): number[] {
  const arr = []
  traverse(root)
  return arr

  function traverse(root: TreeNode | null) {
    if (root == null) return

    arr.push(root.val)
    traverse(root.left)
    traverse(root.right)
  }
}

// 迭代
function preorderTraversal(root: TreeNode | null): number[] {
  const res = []
  if (root === null) return res

  // 栈
  const stack = [root]
  while (stack.length) {
    const curr = stack.pop()

    // 处理子节点之前处理值，就是前序遍历
    res.push(curr.val)
    // 栈 => 先进后出 => 先操作 right ，再操作 left
    curr.right && stack.push(curr.right)
    curr.left && stack.push(curr.left)
  }

  return res
}
```
