# 联合类型

## 分布式条件类型

当类型参数为联合类型，并且在条件类型左边直接引用该类型参数时，TypeScript 会把每一个元素单独传入进行类型运算，最后再合并成联合类型，这种语法叫分布式条件类型。

```ts
type U = "a" | "b" | "c"

type Res = `${U}~~` // "a~~" | "b~~" | "c~~"
```

### IsUnion

判断联合类型

```ts
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never

type Res = IsUnion<"a" | "b">
type Res1 = IsUnion<["a" | "b"]>
```

- `A extends A` 触发分布式条件类型，让 A 的每个类型单独传入
- `[B] extends [A]` 避免触发 B 的分布式条件类型，和单个类型的 A 比较

进一步理解

- 当 A 是联合类型时：
  - `A extends A` 只是为了触发分布式条件类型，让每个类型单独传入
  - `A extends A` 和 `[A] extends [A]` 不同
    - 前者是单个类型和整个类型做判断
    - 后者两边都是整个联合类型
    - 只有 extends 左边直接是类型参数才会触发分布式条件类型
