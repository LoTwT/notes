# 断言

- `describe` : 表示一组分组，测试套件
- `test` : 定义单个的用例，测试用例
- `it` : `test` 的别名

一个 `describe` 可以包含多组 `test` 。

## 常见断言场景

| 场景方向       | 涉及的断言 API                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 基础类型的比较 | `not` `toBe(value)` `toBeTruthy(value)` `toBeFalsy(value)` `toBeDefined()` `toBeUndefined()` `toBeCloseTo(value)` `toBeNaN()` |
| 引用类型的比较 | `toEqual(value)`                                                                                                              |
| 数字符号       | `toBeGreaterThan(value)` `toBeLessThan(value)` `toBeGreaterThanOrEqual(value)` `toBeLessThanOrEqual(value)`                   |
| 正则匹配       | `toMatch(value)` `toMatchObject(value)`                                                                                       |
| 表单验证       | `toContain(value)` `arrayContaining(value)` `toContainEqual(value)` `toHaveLength(value)` `toHaveProperty(value)`             |
| 错误抛出       | `toThrow()` `toThrowError()`                                                                                                  |

## 基础类型

```ts
describe("assertion", () => {
  test("primitive", () => {
    expect(1 + 1).toBe(2)
    expect(1 + 1).not.toBe(3)

    expect(true).toBe(true)
    expect(true).toBeTruthy()
    expect(false).toBeFalsy()

    expect(undefined).toBe(undefined)
    expect(undefined).not.toBeDefined()
    expect(undefined).toBeUndefined()

    const returnUndefined = () => {}
    expect(returnUndefined()).toBeUndefined()

    expect(0.2 + 0.1).not.toBe(0.3)
    expect(0.2 + 0.1).toBeCloseTo(0.3)

    expect(Number.NaN).toBeNaN()
    expect(Number.NaN).toBe(Number.NaN)

    expect(+0).not.toBe(-0)
  })
})
```
