# 特殊特性

TypeScript 类型系统中有的类型比较特殊，比如 `any` 、`never` 、联合类型，比如类有 `public` 、`private` 、`protected` 的属性，索引类型有具体的索引和可索引签名，对于索引还有可选和非可选，等等。

### IsAny

判断一个类型是否是 any 类型。

any 类型与任何类型的交叉都是 any 。

```ts
type IsAny<T> = "__ANY__" extends "__ANY__VALUE__" & T ? true : false

type Res = IsAny<any> // true
type Res1 = IsAny<never> // false
```

### IsEqual

更精确的 IsEqual 。

```ts
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false
```

注意优先级，`T extends A ? 1 : 2` 的结果是函数的返回值类型。

### IsUnion

```ts
type IsUnion<T, U = T> = T extends T ? ([U] extends [T] ? false : true) : never
```

### IsNever

```ts
type IsNever<T> = [T] extends [never] ? true : false
```

### IsTuple

```ts
type IsTuple<T> = T extends readonly [...infer R]
  ? number extends R["length"]
    ? false
    : true
  : false

type Res = IsTuple<[1, 2]> // true
type Res1 = IsTuple<number[]> // false
```

### UnionToIntersection

类型之间有父子关系，更具体的是子类型，比如 A 和 B 的交叉类型 `A & B` 就是联合类型 `A | B` 的子类型。

父类型，字段更少，更不具体，范围更小。

如果允许父类型赋值给子类型，叫做逆变。

如果允许子类型赋值给父类型，叫做协变。

在 TypeScript 中函数参数具有逆变的性质，也就是说，如果函数参数可能是多个类型，参数类型会是它们的交叉类型。

```ts
type UnionToIntersection<T> = (
  T extends T ? (arg: T) => unknown : never
) extends (arg: infer R) => unknown
  ? R
  : never
```

函数的逆变一般只用于联合类型转交叉类型。

### GetOptional

提取索引类型中的可选索引

可选索引的值为 undefined 和值类型的联合类型

```ts
type GetOptional<O extends Record<string, unknown>> = {
  [P in keyof O as {} extends Pick<O, P> ? P : never]: O[P]
}
```

- 约束类型参数 O 的类型为索引是 string 类型，值是任意类型的对象类型
- 重映射 O 的索引，用 `Pick` 提取对应索引的值类型
- 可选的含义是可以没有这个字段
- 判断空对象 `{}` 是否是对应索引的值类型的子类型
- 构造出新的类型

另一种解法

```ts
type GetOptional<T> = {
  [P in keyof T as Omit<T, P> extends T ? P : never]: T[P]
}
```

### GetRequired

```ts
type GetRequired<T> = {
  [P in keyof T as Omit<T, P> extends T ? never : P]: T[P]
}
```

### RemoveIndexSignature

索引签名不能构造成字符串字面量类型，因为它没有具体的名字，而其他索引可以。

```ts
type RemoveIndexSignature<O extends Record<string, unknown>> = {
  [P in keyof O as P extends `${infer R}` ? R : never]: O[P]
}
```

### ClassPublicProps

keyof 可以拿到 class 的 public 索引。

```ts
type ClassPublicProps<O extends Record<string, unknown>> = {
  [P in keyof O]: O[P]
}
```

### 总结

1. any 类型与任何类型交叉都是 any
1. 联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并结果
1. never 作为类型参数出现在条件类型左侧时，直接返回 never
1. any 作为类型参数出现在条件类型左侧时，会返回 trueType 和 falseType 的联合类型
1. 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number
1. 函数参数的位置会发生逆变，可以用来实现联合类型转交叉类型
1. 可选索引的值为 undefined 和值类型的联合类型，可选意味着可以没有这个字段
1. 索引类型的索引为字符串字面量类型，而索引签名不是
1. keyof 只能拿到 class 的 public 索引
