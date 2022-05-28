# 综合实战

类型编程的意义：需要动态生成类型的场景，必然要用类型编程做一些运算。有的场景下可以不用类型编程，但是用了能够有更精确的类型提示和检查。

### ParseQueryString

```ts
type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Value}`
    ? {
        [K in Key]: Value
      }
    : Record<string, unknown>

type MergeValues<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other]

type MergeParams<
  OneParam extends Record<string, unknown>,
  OtherParam extends Record<string, unknown>,
> = {
  readonly [Key in
    | keyof OneParam
    | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never
}

type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>

function parseQueryString<Str extends string>(
  queryStr: Str,
): ParseQueryString<Str> {
  if (!queryStr || !queryStr.length) {
    return {} as any
  }
  const queryObj = {} as any
  const items = queryStr.split("&")
  items.forEach((item) => {
    const [key, value] = item.split("=")
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value)
      } else {
        queryObj[key] = [queryObj[key], value]
      }
    } else {
      queryObj[key] = value
    }
  })
  return queryObj
}

const res = parseQueryString("a=1&b=2&c=3")

res.a // 获得类型提示
```

### Promise.all

```ts
interface PromiseConstructor {
  all<T extends readonly unknown[] | []>(
    values: T,
  ): Promise<{
    -readonly [P in keyof T]: Awaited<T[P]>
  }>

  race<T extends readonly unknown[] | []>(
    values: T,
  ): Promise<Awaited<T[number]>>
}
```

T 的类型约束是 `unknown[] | []` 的原因是为了正确处理 `as const` 。

### Currying

柯里化

```ts
type CurriedFunc<Args, R> = Args extends [infer F, ...infer Rest]
  ? (arg: F) => CurriedFunc<Rest, R>
  : R

declare function currying<F>(
  fn: F,
): F extends (...args: infer Args) => infer R ? CurriedFunc<Args, R> : never
```
