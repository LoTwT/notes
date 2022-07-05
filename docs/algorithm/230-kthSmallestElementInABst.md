# [230-二叉搜索树中第 K 小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

思路：栈 + 特定顺序遍历

```ts
function kthSmallest(root: TreeNode | null, k: number): number {
  // 遍历次数
  let count = 0
  // 栈
  // 根据二叉搜索树的特点，值最小的节点在左下
  // 遍历需要先进后出
  const stack = []

  // root 可能为节点的右子节点 与 栈内有值两种情况，都可以继续遍历
  while (root || stack.length) {
    // 朝着左下角，一路找到左下角节点
    while (root) {
      stack.push(root)
      root = root.left
    }

    // 弹出值较小的节点
    root = stack.pop()
    // 遍历次数++
    count++

    // 符合条件，返回
    if (count === k) return root.val

    // 档次不符合时，比较右子节点
    root = root.right
  }
}
```
