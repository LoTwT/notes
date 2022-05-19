# 模式匹配

模式匹配是数据结构中字符串的一种基本运算，给定一个子串，要求在某个字符串中找出与该子串相同的所有子串，这就是模式匹配。

TypeScript 的类型同样可以模式匹配：

```ts
type JiTui = Promise<"鸡腿">

type GetValueType<P> = P extends Promise<infer V> ? V : never

type ValueType = GetValueType<JiTui> // 鸡腿
```

解释：通过 `extends` 对传入的类型参数 P 做模式匹配，要提取的是值的类型，通过 `infer` 声明一个局部变量 V 来保存，如果匹配，就返回匹配到的 V ，否则返回 never 。

## 数组类型

### First

提取数组第一个元素的类型

```ts
type First<A extends unknown[]> = A extends [infer F, ...infer Rest] ? F : never

type Res1 = First<[1, 2]> // 1
type Res2 = First<[]> // never
```

类型参数 A 通过 extends 约束为数组类型，数组元素是 unknown 或任何值。

any 和 unknown 的区别：

- 都代表任意类型
- unknown 可以接收任意类型的值；而 any 既可以接收任意类型的值，也可以赋值给任意类型 ( 除了 never )
- 类型体操中常用 unknown 接收和匹配任何类型，但很少把任意类型赋值给某个类型变量

extends ：

- 在等号左侧，为类型约束 ( Type Constraint ) ，限定类型参数满足的最低要求
- 在等号右侧，为条件类型 ( Conditional Type ) ，类似 if / else 进行条件判断

### Last

提取数组最后一个元素的类型

```ts
type Tail<A extends unknown[]> = A extends [...infer Rest, infer T] ? T : never

type Res1 = Tail<[1, 2]> // 2
type Res2 = Tail<[]> // never
```

### PopArr

提取数组去除最后一个元素的类型后，剩余元素的类型

```ts
type PopArr<A extends unknown[]> = A extends []
  ? []
  : A extends [...infer Rest, unknown]
  ? Rest
  : never

type Res1 = PopArr<[1, 2, 3]> // [1, 2]
type Res2 = PopArr<[1]> // []
type Res3 = PopArr<[]> // []
```

上面对空数组做了特殊处理。

### ShiftArr

提取数组去除第一个元素的类型后，剩余元素的类型

```ts
type ShiftArr<A extends unknown[]> = A extends []
  ? []
  : A extends [unknown, ...infer Rest]
  ? Rest
  : never

type Res1 = ShiftArr<[1, 2, 3]> // [2, 3]
type Res2 = ShiftArr<[1]> // []
type Res3 = ShiftArr<[]> // []
```

## 字符串类型

### StartsWith

判断字符串类型是否以某个前缀开头

```ts
type StartsWith<
  S extends string,
  Prefix extends string,
> = S extends `${Prefix}${string}` ? true : false

type Res1 = StartsWith<"jitui", "j"> // true
type Res2 = StartsWith<"jitui", "i"> // false
type Res3 = StartsWith<"jitui", ""> // true
type Res4 = StartsWith<"", ""> // true
type Res5 = StartsWith<"", "j"> // false
```

### Replace

字符串替换

```ts
type Replace<
  S extends string,
  From extends string,
  To extends string,
> = S extends `${infer Head}${From}${infer Tail}` ? `${Head}${To}${Tail}` : S

type Res = Replace<"jitui zhen hao chi!", "jitui", "pizza">
```

### Trim

去除空白字符

不确定有多少个空白字符，需要递归去除

```ts
// 空白字符的 union
type Blank = " " | "\n" | "\t"

// 去除尾部空白字符
type TrimEnd<S extends string> = S extends `${infer Rest}${Blank}`
  ? TrimEnd<Rest>
  : S

// 去除头部空白字符
type TrimStart<S extends string> = S extends `${Blank}${infer Rest}`
  ? TrimStart<Rest>
  : S

type Trim<S extends string> = TrimEnd<TrimStart<S>>

type Res = Trim<" \t\njitui\n \t"> // jitui
```