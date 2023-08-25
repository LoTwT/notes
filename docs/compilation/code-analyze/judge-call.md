# 判定 API 调用

## 遍历 Identifier 节点

```ts
const tsCompiler = require("typescript") // TS编译器

// ImportItems 是上一节课程中Import节点分析的结果Map
// ast 表示代码文件解析后的ast
// checker 编译代码文件时创建的checker
function _dealAST(ImportItems, ast, checker, baseLine = 0) {
  const ImportItemNames = Object.keys(ImportItems) // 获取所有导入API信息的名称

  // 遍历AST
  function walk(node) {
    // console.log(node);
    tsCompiler.forEachChild(node, walk)

    // 判定当前遍历的节点是否为isIdentifier类型节点，
    // 判断从Import导入的API中是否存在与当前遍历节点名称相同的API
    if (
      tsCompiler.isIdentifier(node) &&
      node.escapedText &&
      ImportItemNames.length > 0 &&
      ImportItemNames.includes(node.escapedText)
    ) {
      // 过滤掉不相干的 Identifier 节点后
    }
  }

  walk(ast)
}
```

以上简化版的 `_dealAST` 存在 3 个问题：

1. 无法排除 Import 中同名节点的干扰
1. 无法排除局部声明的同名节点的干扰
1. 无法检测 API 属于链式调用还是直接调用

## 排除 Import 中同名节点干扰

在遍历所有 Identifier 节点时，如果发现当前节点的 `pos` 和 `end` 属性值与 Import 节点分析后得到的 API 信息中的 `identifierPos` 和 `identifierEnd` 属性值一致，则说明遍历到了 Import 中的同名节点，跳过即可：

```ts
const tsCompiler = require("typescript") // TS编译器

// ImportItems 是上一节中Import节点分析的结果Map
// ast 表示代码文件解析后的ast
// checker 编译代码文件时创建的checker
function _dealAST(ImportItems, ast, checker, baseLine = 0) {
  const ImportItemNames = Object.keys(ImportItems) // 获取所有导入API信息的名称

  // 遍历AST
  function walk(node) {
    // console.log(node);
    tsCompiler.forEachChild(node, walk)

    // 判定当前遍历的节点是否为isIdentifier类型节点，
    // 判断从Import导入的API中是否存在与当前遍历节点名称相同的API
    if (
      tsCompiler.isIdentifier(node) &&
      node.escapedText &&
      ImportItemNames.length > 0 &&
      ImportItemNames.includes(node.escapedText)
    ) {
      // 过滤掉不相干的 Identifier 节点后
      const matchImportItem = ImportItems[node.escapedText]
      // console.log(matchImportItem);
      if (
        node.pos !== matchImportItem.identifierPos &&
        node.end !== matchImportItem.identifierEnd
      ) {
        // 排除 Import 语句中同名节点干扰后
      }
    }
  }

  walk(ast)
}
```

## 排除局部声明的同名节点干扰

使用 Import 节点分析后所收集的 API 信息中的 `symbolPos` 和 `symbolEnd`。

`pos` 和 `end` 可用来标识节点唯一性，所以在判定当前节点是否由 Import 导入的 API 声明时，只需要判断 `Symbol` 指向的声明节点 `pos`、`end` 属性值与同名 API 的 `symbolPos`、`symbolEnd` 属性值是否一致即可。

AST 节点对应的 `Symbol` 对象可以通过 `check.getSymbolAtlocation(node)` 方法获取。

```ts
const tsCompiler = require("typescript") // TS编译器

// ImportItems 是上一节课程中Import节点分析的结果Map
// ast 表示代码文件解析后的ast
// checker 编译代码文件时创建的checker
function _dealAST(ImportItems, ast, checker, baseLine = 0) {
  const ImportItemNames = Object.keys(ImportItems) // 获取所有导入API信息的名称

  // 遍历AST
  function walk(node) {
    // console.log(node);
    tsCompiler.forEachChild(node, walk)

    // 判定当前遍历的节点是否为isIdentifier类型节点，
    // 判断从Import导入的API中是否存在与当前遍历节点名称相同的API
    if (
      tsCompiler.isIdentifier(node) &&
      node.escapedText &&
      ImportItemNames.length > 0 &&
      ImportItemNames.includes(node.escapedText)
    ) {
      // 过滤掉不相干的 Identifier 节点后
      const matchImportItem = ImportItems[node.escapedText]
      // console.log(matchImportItem);
      if (
        node.pos !== matchImportItem.identifierPos &&
        node.end !== matchImportItem.identifierEnd
      ) {
        // 排除 Import 语句中同名节点干扰后
        const symbol = checker.getSymbolAtLocation(node)
        // console.log(symbol);
        if (symbol && symbol.declarations && symbol.declarations.length > 0) {
          // 存在声明
          const nodeSymbol = symbol.declarations[0]
          if (
            matchImportItem.symbolPos === nodeSymbol.pos &&
            matchImportItem.symbolEnd === nodeSymbol.end
          ) {
            // 语义上下文声明与从Import导入的API一致, 属于导入API声明
          } else {
            // 同名Identifier干扰节点
          }
        }
      }
    }
  }

  walk(ast)
}
```

## 检测链式调用

```ts
// 链式调用示例代码
app
app.get
app.set.isWell
app.set.isWell.info
```

链式调用会在一个 `PropertyAccessExpression` 结构下，且每增加一级链式就多一层 `PropertyAccessExpression` 结构。

![PropertyAccessExpression](/compilation/code-analyze/property-access-expression.png)

可以通过判断当前 `Identifier` 节点的父节点是否为 `PropertyAccessExpression` 来判断是否存在链式调用。如果存在，则继续递归其父节点，持续检查到最外层 `PropertyAccessExpression` 就可以搞清楚链式调用的具体情况了。

```ts
const tsCompiler = require("typescript") // TS编译器

// 链式调用检查，找出链路顶点node
function _checkPropertyAccess(node, index = 0, apiName = "") {
  if (index > 0) {
    apiName = `${apiName}.${node.name.escapedText}`
  } else {
    apiName = apiName + node.escapedText
  }
  if (tsCompiler.isPropertyAccessExpression(node.parent)) {
    index++

    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    return this._checkPropertyAccess(node.parent, index, apiName)
  } else {
    return {
      baseNode: node,
      depth: index,
      apiName,
    }
  }
}

// AST分析
// ImportItems 是上一节课程中Import节点分析的结果Map
// ast 表示代码文件解析后的ast，在这里可以理解成上面待分析demo代码的ast
// checker 编译代码文件时创建的checker
function _dealAST(ImportItems, ast, checker, baseLine = 0) {
  const ImportItemNames = Object.keys(ImportItems)

  // 遍历AST
  function walk(node) {
    // console.log(node);
    tsCompiler.forEachChild(node, walk)
    const line =
      ast.getLineAndCharacterOfPosition(node.getStart()).line + baseLine + 1

    // 判定是否命中Target Api Name
    if (
      tsCompiler.isIdentifier(node) &&
      node.escapedText &&
      ImportItemNames.length > 0 &&
      ImportItemNames.includes(node.escapedText)
    ) {
      const matchImportItem = ImportItems[node.escapedText]
      // console.log(matchImportItem);
      if (
        node.pos !== matchImportItem.identifierPos &&
        node.end !== matchImportItem.identifierEnd
      ) {
        // 排除ImportItem Node自身后
        const symbol = checker.getSymbolAtLocation(node)
        // console.log(symbol);
        if (symbol && symbol.declarations && symbol.declarations.length > 0) {
          // 存在上下文声明
          const nodeSymbol = symbol.declarations[0]
          if (
            matchImportItem.symbolPos === nodeSymbol.pos &&
            matchImportItem.symbolEnd === nodeSymbol.end
          ) {
            // 语义上下文声明与Import item匹配, 符合API调用
            if (node.parent) {
              // 获取基础分析节点信息
              const { baseNode, depth, apiName } =
                that._checkPropertyAccess(node)
              // 分析 API 用途（下一节讲解）
              // isApiCheck(baseNode, depth, apiName, ...)
              // isMethodCheck(baseNode, depth, apiName, ...)
              // isTypeCheck(baseNode, depth, apiName, ...)
              // ......
            } else {
              // Identifier节点如果没有parent属性，说明AST节点语义异常，不存在分析意义
            }
          } else {
            // 同名Identifier干扰节点
          }
        }
      }
    }
  }

  walk(ast)
}
```

如果是链式调用，`BaseNode` 表示的是最顶层节点；如果不存在链式调用，`BaseNode` 表示 `Identifier` 节点本身，`apiName` 为完整的 API 调用名，`depth` 表示链式调用深度。`BaseNode` 是基准节点，它是后续 API 用途分析的入口节点。

## 自上而下 vs 自下而上

做 Import 节点分析时，采用的是`自上而下`的分析模式：

![top to bottom](/compilation/code-analyze/top-to-bottom.png)

即先找到所有的 Import 节点，然后通过观察不同导入方式下 AST 极其子节点结构特征，总结出了各种导入方式的唯一性判断条件，然后根据这些判定条件完成了逻辑分析。

自上而下的好处是聚焦，因为分析目标是 API 导入情况，把 `ImportDeclaration` 类型节点作为基准节点来分析自然是最好的切入点。另外，导入相关的语义特征可以通过它及它的子节点来体现。

在判定 API 调用的分析场景中，是以 identifier 这种处于 AST 末端的节点作为切入点来实现判定逻辑，采用的是`自下而上`的分析模式：

![bottom to top](/compilation/code-analyze/bottom-to-top.png)

因为 AST 是树状结构，从最末端的叶子节点着手遍历，可以覆盖到全部 `identifier` 节点，防止遗漏。自下而上分析像是一种导向漏斗的筛选模式，在经过一轮一轮的分析筛选后，就能全面且准确地定位到目标节点。

采用自上而下还是自下而上，完全取决于分析目的。
