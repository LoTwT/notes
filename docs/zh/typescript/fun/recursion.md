# 递归复用

递归是把问题分解为一系列相似的小问题，通过函数不断调用自身来解决一个个小问题，直到满足终止条件，完成问题的求解。

TypeScript 类型系统不支持循环，但支持递归。当处理数量 ( 个数、长度、层数 ) 不固定类型的时候，可以只处理一个类型，然后递归的调用自身处理下一个类型，直到结束条件也就是所有的类型都处理完了，就完成了不确定数量的类型变成，达到循环的效果。

## Promise

### DeepPromiseValueType

提取不确定层数的 Promise 中的 value 类型。

```ts
type DeepPromiseValueType<T> = T extends Promise<infer R>
  ? DeepPromiseValueType<R>
  : T

type Res = DeepPromiseValueType<Promise<Promise<Promise<string>>>> // string
```

## 数组类型

### ReverseArr

```ts
type ReverseArr<Arr extends unknown[]> = Arr extends [infer F, ...infer R]
  ? [...ReverseArr<R>, F]
  : Arr

// 尾递归
type ReverseArr1<
  Arr extends unknown[],
  Res extends unknown[] = [],
> = Arr extends [infer F, ...infer R] ? ReverseArr1<R, [F, ...Res]> : Res

type Res = ReverseArr<[1, 2, 3]> // [3, 2, 1]
type Res1 = ReverseArr1<[1, 2, 3]> // [3, 2, 1]
```

### Includes

```ts
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)

type Includes<Arr extends unknown[], T> = Arr extends [infer F, ...infer R]
  ? IsEqual<F, T> extends true
    ? true
    : Includes<R, T>
  : false

type Res = Includes<[1, 2, 3], 1> // true
type Res1 = Includes<[1, 2, 3], 4> // false
```

### RemoveItem

```ts
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)

type RemoveItem<
  Arr extends unknown[],
  T,
  Res extends unknown[] = [],
> = Arr extends [infer F, ...infer R]
  ? IsEqual<F, T> extends true
    ? RemoveItem<R, T, Res>
    : RemoveItem<R, T, [...Res, F]>
  : Res

type RemoveItem1<
  Arr extends unknown[],
  T,
  Res extends unknown[] = [],
> = Arr extends [infer F, ...infer R]
  ? RemoveItem1<R, T, IsEqual<F, T> extends true ? Res : [...Res, F]>
  : Res

type Res = RemoveItem<[1, 2, 3, 3], 3> // [1, 2]
type Res1 = RemoveItem1<[1, 2, 3, 3], 3> // [1, 2]
```

### ConstructTuple

```ts
type ConstructTuple<
  T extends number,
  Res extends unknown[] = [],
> = T extends Res["length"] ? Res : ConstructTuple<T, [...Res, unknown]>

type Res = ConstructTuple<3> // [unknown, unknown, unknown]
```

## 字符串类型

### ReplaceAll

```ts
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string,
> = S extends `${infer F}${From}${infer R}`
  ? `${F}${To}${ReplaceAll<R, From, To>}`
  : S

// 尾递归
type ReplaceAll1<
  S extends string,
  From extends string,
  To extends string,
  Res extends string = "",
> = S extends `${infer F}${From}${infer R}`
  ? ReplaceAll1<R, From, To, `${Res}${F}${To}`>
  : Res

type Res = ReplaceAll<"a a a", "a", "b"> // "b b b"
type Res1 = ReplaceAll1<"a a a", "a", "b"> // "b b b"
```

### StringToUnion

```ts
type StringToUnion<S extends string> = S extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never

// 尾递归
type StringToUnion1<
  S extends string,
  Res extends string = never,
> = S extends `${infer F}${infer R}` ? StringToUnion1<R, Res | F> : Res

type Res = StringToUnion<"hello"> // "h" | "e" | "l" | "o"
type Res1 = StringToUnion1<"hello"> // "h" | "e" | "l" | "o"
```

### ReverseStr

```ts
type ReverseStr<S extends string> = S extends `${infer F}${infer R}`
  ? `${ReverseStr<R>}${F}`
  : S

// 尾递归
type ReverseStr1<
  S extends string,
  Res extends string = "",
> = S extends `${infer F}${infer R}` ? ReverseStr1<R, `${F}${Res}`> : Res

type Res = ReverseStr<"abcd"> // "dcba"
type Res1 = ReverseStr1<"abcd"> // "dcba"
```

## 对象类型

### DeepReadonly

```ts
type DeepReadonly<O extends Record<string, any>> = O extends any
  ? {
      readonly [P in keyof O]: O[P] extends object
        ? O[P] extends Function
          ? O[P]
          : DeepReadonly<O[P]>
        : O[P]
    }
  : never

type Res = DeepReadonly<{
  a: { b: { c: { f: () => "hello"; d: { e: { g: "hi" } } } } }
}>

// {
//   readonly a: {
//     readonly b: {
//       readonly c: {
//         readonly f: () => "hello"
//         readonly d: {
//           readonly e: {
//             readonly g: "hi"
//           }
//         }
//       }
//     }
//   }
// }
```

`O extends any` 用来触发 TypeScript 的类型计算，并且可以处理联合类型。
