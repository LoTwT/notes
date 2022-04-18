# twoSum

两数之和类型体操版

```ts
type ConstructTuple<
  T extends number,
  R extends any[] = [],
> = R["length"] extends T ? R : ConstructTuple<T, [...R, 1]>

type Sub<A extends number, B extends number> = ConstructTuple<A> extends [
  ...arr1: ConstructTuple<B>,
  ...arr2: infer Rest,
]
  ? Rest["length"]
  : -1

type Tail<T> = T extends [infer F, ...infer R] ? R : []

type TwoSum<
  A extends number[],
  T extends number,
  Set = never,
> = A["length"] extends 0
  ? false
  : Sub<T, A[0]> extends Set
  ? true
  : TwoSum<Tail<A>, T, Set | A[0]>
```
