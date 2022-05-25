# 重新构造

TypeScript 支持 type 、infer 、类型参数来保存任意类型，但它们是不可变的。想要变化就需要重新构造新的类型，并且可以在构造新类型的过程中对原类型做一些过滤和变换。

对于索引类型，这种操作叫做映射类型，对索引做修改的 `as` 叫做重映射。

## 数组类型

### Push

```ts
type Push<Arr extends unknown[], X> = [...Arr, X]

type Res = Push<[1, 2, 3], 4> // [1, 2, 3, 4]
```

### Unshift

```ts
type Unshift<Arr extends unknown[], X> = [X, ...Arr]

type Res = Unshift<[1, 2, 3], 4> // [4, 1, 2, 3]
```

### Zip

```ts
type Zip<A extends unknown[], B extends unknown[]> = A extends [
  infer AF,
  ...infer AR,
]
  ? B extends [infer BF, ...infer BR]
    ? [[AF, BF], ...Zip<AR, BR>]
    : []
  : []

// 尾递归
type Zip1<
  A extends unknown[],
  B extends unknown[],
  R extends unknown[][] = [],
> = A extends [infer AF, ...infer AR]
  ? B extends [infer BF, ...infer BR]
    ? Zip1<AR, BR, [...R, [AF, BF]]>
    : R
  : R

type Res = Zip<[1, 2], [3, 4]> // [[1, 3], [2, 4]]
type Res1 = Zip1<[1, 2], [3, 4]> // [[1, 3], [2, 4]]
```
