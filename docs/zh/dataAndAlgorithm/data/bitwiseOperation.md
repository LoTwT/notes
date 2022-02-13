# 位运算

计算机的世界只有 0 和 1 吖...

## 基础运算

- `<<`: **左移** `4 << 1` 是 `8`，末位加一位 0
- `>>`: **右移** `4 >> 1` 是 `2`，末位去尾，会有精度损失，`5 >> 1` 也是 `2`
- `&`: **与** 两边都是 1 才为 1，否则是 0
- `|`: **或** 两边都是 0 才为 0，否则是 1

## 应用

**& 与运算**用来鉴权

**| 或运算**用来授权