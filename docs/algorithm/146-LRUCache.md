# [146-LRU 缓存](https://leetcode-cn.com/problems/lru-cache/)

LRU: least recent use (最近最少使用)

将使用频率更高的数据放在前面，而当储存数据的容器空间不够时，淘汰末位 (使用频率最低) 的数据。

vue3：

- runtime-core/src/components/KeepAlive.ts 中的 pruneCacheEntry() 方法是一个定制的 LRU Cache 实现。
- compiler-sfc/src/cache.ts 使用了第三方的 LRU Cache 实现

```typescript
class LRUCache {
  cache: Map<number, number>
  max: number

  constructor(capacity: number) {
    this.cache = new Map()
    this.max = capacity
  }

  get(key: number): number {
    if (this.cache.has(key)) {
      const temp = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, temp)
      return temp
    }

    return -1
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.max) {
      // 淘汰 最近最少使用 的那个数据
      this.cache.delete(this.cache.keys().next().value)
    }

    this.cache.set(key, value)
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

解法理解：

1. ES6 新增的 Map 有 Iterator 可以模拟链表的实现
2. Map.set() 的结果在最后，所以认为最后的那个数据是最近被使用的 (形如 [很久前被使用，刚才被使用，最新被使用])
3. 当需要淘汰时，要淘汰的数据是第一个
