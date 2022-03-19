# 冒泡排序

每个元素和右边元素进行比较，如果满足条件则交换位置，否则不动。

时间复杂度：`O(n²)`

```ts
function bubbleSort<T>(arr: T[]) {
  const len = arr.length - 1

  for (let j = 0; j < len; j++) {
    // len - j 已经冒泡过的元素不再冒泡
    for (let i = 0; i < len - j; i++) {
      if (arr[i] > arr[i + 1]) {
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }

  return arr
}
```
