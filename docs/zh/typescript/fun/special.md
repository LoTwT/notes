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
