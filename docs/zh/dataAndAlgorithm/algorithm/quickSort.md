# 快速排序

采用二分的思想，给数组找一个标志位，满足条件的元素放到标志位的一边，不满足条件的放到另一边，递归这个过程。

时间复杂度：`O(n * lgn)`

空间复杂度：`O(n * lgn)`

```ts
function quickSort<T>(arr: T[]): T[] {
  // 递归终止条件
  if (arr.length < 2) return arr

  // 选择一个标志位
  const flag = arr[0]

  // 存放标志位两侧元素的容器
  const left: T[] = []
  const right: T[] = []

  // 因为 flag 选择了 arr 的第一个元素，所以 i 从 1 开始即可
  for (let i = 1; i < arr.length; i++) {
    const el = arr[i]

    if (el > flag) right.push(el)
    else left.push(el)
  }

  return quickSort(left).concat(flag, quickSort(right))
}
```
