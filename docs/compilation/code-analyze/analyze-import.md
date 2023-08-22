# 分析 Import 节点

Import 节点存在多种导入方式，需要正确区分它们。

## Import 导入方式

```ts
import api, { environment } from "framework"

// named import
import api from "framework"

// default import
import { request as req } from "framework"

// namespaced import
import * as APP from "framework" // namespaced imort
```

以上语句对应的 AST 节点都是 `ImportDeclaration` 类型节点，但因为导入方式不同，子节点结构存在很大差异。

观察以下四种导入方式的的 AST 结构和子节点信息，可以总结四条判断条件：

1. Import 语句 AST 对象都有 `importClause` 属性和 `moduleSpecifier` 属性，后者表示目标依赖名
1. `importClause` 对象如果只有 `name` 属性，没有 `namedBindings` 属性，表示默认全局导入
1. `importClause` 对象存在 `namedBindings` 属性，且类型为 `NamespaceImport`，表示命名空间导入
1. `importClause` 对象存在 `namedBindings` 属性，且类型为 `NamedImports`，且 `elements` 属性为数组，长度大于 0，遍历 `elements` 数组的每一个元素，如果该元素的类型是 `ImportSpecifier`，表示局部导入。
   - 如果它存在 `as` 别名，则需要判断其是否存在 `propertyName` 属性与 `name` 属性
   - 如果都存在，表示属于局部别名导入
   - 如果只有 `name`属性，表示常规局部导入

### 局部导入

```ts
import { environment } from "framework" // named import
```

![named import](/compilation/code-analyze/named-import.png)

AST 对象节点的属性名和类型名在命名上并非一致，在节点树状图中展示的是各个节点的类型名而不是属性名。

### 默认全局导入

```ts
import api from "framework" // default import
```

![default impot](/compilation/code-analyze/default-import.png)

### 局部别名导入

```ts
import { request as req } from "framework" // named import alias
```

![named import alias](/compilation/code-analyze/named-import-alias.png)

### 命名空间导入

```ts
import * as APP from "framework" // namespace imort
```

![namespace import](/compilation/code-analyze/namespace-import.png)

## 分析步骤

### Import 节点分析逻辑

第一步：遍历 AST，通过 `isImportDeclaration` API 判断各级节点类型，找到所有的 `ImportDeclaration` 节点
第二步：通过判断节点的 `moduleSpecifier.text` 属性是否为分析目标来过滤掉非目标依赖的 import 节点

### 判定导入类型

第三步：根据总结的四条判定条件判定导入类型

```ts
// 分析import导入
function _findImportItems(ast, filePath, baseLine = 0) {
  // 遍历AST寻找import节点
  function walk(node) {
    // console.log(node);
    tsCompiler.forEachChild(node, walk)
    const line =
      ast.getLineAndCharacterOfPosition(node.getStart()).line + baseLine + 1

    // 分析导入情况
    if (tsCompiler.isImportDeclaration(node)) {
      // 命中target
      if (
        node.moduleSpecifier &&
        node.moduleSpecifier.text &&
        node.moduleSpecifier.text == "framework"
      ) {
        // 存在导入项
        if (node.importClause) {
          // default直接导入场景
          if (node.importClause.name) {
            // 记录API相关信息
          }
          if (node.importClause.namedBindings) {
            // 局部导入场景，包含as
            if (tsCompiler.isNamedImports(node.importClause.namedBindings)) {
              if (
                node.importClause.namedBindings.elements &&
                node.importClause.namedBindings.elements.length > 0
              ) {
                // console.log(node.importClause.namedBindings.elements);
                const tempArr = node.importClause.namedBindings.elements
                tempArr.forEach((element) => {
                  if (tsCompiler.isImportSpecifier(element)) {
                    // 记录API相关信息
                  }
                })
              }
            }
            // * 全量导入as场景
            if (
              tsCompiler.isNamespaceImport(node.importClause.namedBindings) &&
              node.importClause.namedBindings.name
            ) {
              // 记录API相关信息
            }
          }
        }
      }
    }
  }
  walk(ast)
}
```

## 记录 API 信息

除了 `Symbol` 还需要记录 `as` 别名的映射关系

示例：

```ts
import { request as req } from "framework" // 存在别名的局部API导入
```

```ts
let temp = {
  name: "req", // 导入后在代码中真实调用使用的 API 名
  origin: "request", // API 别名。null则表示该非别名导入，name就是原本名字
  symbolPos: "9", // symbol指向的声明节点在代码字符串中的起始位置
  symbolEnd: "22", // symbol指向的声明节点在代码字符串中的结束位置
  identifierPos: "20", // API 名字信息节点在代码字符串中的起始位置
  identifierEnd: "22", // API 名字信息节点在代码字符串中的结束位置
  line: "1", // 导入 API 的import语句所在代码行信息
}
```

- `name`：记录在代码中被调用时所用的 API 名，`origin` 为 `null` 时，`name` 是 API 本名
- `origin`：从目标依赖导出的 API 本名，`null` 表示非别名导入，不需映射
- `symbolPos`、`symbolEnd`：API 声明节点在代码字符串中索引的起始位置和结束位置
  - 因为声明节点在代码字符流中的索引位置是唯一且确定的，所以不需要记录完整的 `Symbol` 对象，记录 `Symbol` 指向的声明节点的 `pos` 和 `end` 即可
  - 在后续步骤中，只需要对比 `Symbol` 对象指向的声明节点 `pos` 和 `end` 属性值，即可判断代码中的节点是否由 `Import` 语句中导入的 API 声明
- `identifierPos`、`identifierEnd`：API 名称对应的 `Identifier` 节点在代码字符串中索引的起始位置和结束位置，记录这两个索引位置是为了后续步骤在分析节点时做唯一性判定

```ts
// 分析import导入
function _findImportItems(ast, filePath, baseLine = 0) {
  let importItems = {}
  let that = this // this表示codeAnalysis实例

  // 记录导入的API及相关信息
  function dealImports(temp) {
    importItems[temp.name] = {}
    importItems[temp.name].origin = temp.origin
    importItems[temp.name].symbolPos = temp.symbolPos
    importItems[temp.name].symbolEnd = temp.symbolEnd
    importItems[temp.name].identifierPos = temp.identifierPos
    importItems[temp.name].identifierEnd = temp.identifierEnd
  }

  // 遍历AST寻找import节点
  function walk(node) {
    // console.log(node);
    tsCompiler.forEachChild(node, walk)
    const line =
      ast.getLineAndCharacterOfPosition(node.getStart()).line + baseLine + 1

    // 分析导入情况
    if (tsCompiler.isImportDeclaration(node)) {
      // 命中target
      if (
        node.moduleSpecifier &&
        node.moduleSpecifier.text &&
        node.moduleSpecifier.text == that._analysisTarget
      ) {
        // 存在导入项
        if (node.importClause) {
          // default直接导入场景
          if (node.importClause.name) {
            let temp = {
              name: node.importClause.name.escapedText,
              origin: null,
              symbolPos: node.importClause.pos,
              symbolEnd: node.importClause.end,
              identifierPos: node.importClause.name.pos,
              identifierEnd: node.importClause.name.end,
              line: line,
            }
            dealImports(temp)
          }
          if (node.importClause.namedBindings) {
            // 拓展导入场景，包含as情况
            if (tsCompiler.isNamedImports(node.importClause.namedBindings)) {
              if (
                node.importClause.namedBindings.elements &&
                node.importClause.namedBindings.elements.length > 0
              ) {
                // console.log(node.importClause.namedBindings.elements);
                const tempArr = node.importClause.namedBindings.elements
                tempArr.forEach((element) => {
                  if (tsCompiler.isImportSpecifier(element)) {
                    let temp = {
                      name: element.name.escapedText,
                      origin: element.propertyName
                        ? element.propertyName.escapedText
                        : null,
                      symbolPos: element.pos,
                      symbolEnd: element.end,
                      identifierPos: element.name.pos,
                      identifierEnd: element.name.end,
                      line: line,
                    }
                    dealImports(temp)
                  }
                })
              }
            }
            // * 全量导入as场景
            if (
              tsCompiler.isNamespaceImport(node.importClause.namedBindings) &&
              node.importClause.namedBindings.name
            ) {
              let temp = {
                name: node.importClause.namedBindings.name.escapedText,
                origin: "*",
                symbolPos: node.importClause.namedBindings.pos,
                symbolEnd: node.importClause.namedBindings.end,
                identifierPos: node.importClause.namedBindings.name.pos,
                identifierEnd: node.importClause.namedBindings.name.end,
                line: line,
              }
              dealImports(temp)
            }
          }
        }
      }
    }
  }
  walk(ast)
  // console.log(importItems);
  return importItems
}
```
