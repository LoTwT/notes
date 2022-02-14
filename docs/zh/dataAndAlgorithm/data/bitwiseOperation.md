# 位运算

计算机的世界只有 0 和 1 吖...

## 基础运算

- `<<`: **左移** `4 << 1` 是 `8`，末位加一位 0
- `>>`: **右移** `4 >> 1` 是 `2`，末位去尾，会有精度损失，`5 >> 1` 也是 `2`
- `&`: **与** 两值都是 1 才为 1，否则是 0
- `|`: **或** 两值都是 0 才为 0，否则是 1
- `^`: **异或** 两值相同为 0，不同为 1

## 应用

**& 与运算**用来鉴权

**| 或运算**用来授权

## 例子

举个🌰：组合权限认证

```typescript
// 以虚拟 DOM 为例
// 一个虚拟 DOM 有可能很多属性是动态的，每一个状态标记一个二进制位
const STYLE = 1         // 001
const CLASS = 1 << 1    // 010
const CHILDREN = 1 << 2 // 100

// 授权 |
let vnodeType = STYLE | CLASS // 011

// 鉴权 &
console.log("isSTYLE", !!(vnodeType & STYLE))       // 001 true
console.log("isCLASS", !!(vnodeType & CLASS))       // 010 true
console.log("isCHILDREN", !!(vnodeType & CHILDREN)) // 000 false

// 取消授权 ^
vnodeType = vnodeType ^ CLASS // 001

console.log("isSTYLE", !!(vnodeType & STYLE))       // 001 true
console.log("isCLASS", !!(vnodeType & CLASS))       // 010 false
console.log("isCHILDREN", !!(vnodeType & CHILDREN)) // 000 false
```
