# traverse

源码 parse 成 AST 后，需要进行 AST 的遍历和增删改 ( transform ) .

Babel 会递归遍历 AST ，遍历过程中处理到不同的 AST 会调用不同的 visitor 函数来实现 transform 。

## visitor 模式

visitor 模式 ( 访问者模式 ) 是 23 种经典设计模式中的一种。

当被操作的对象结构比较稳定，而操作对象的逻辑经常变化时，通过分离逻辑和对象结构，使得它们能独立扩展，这就是 visitor 模式的思想。

Element 和 Visitor 分别代表对象结构和操作逻辑，两者可以独立扩展，在 Client 里面组合两者，使用 visitor 操作 element，这就是 visitor 模式。

![](/babel/visitor-tree.jpg)

可以把要操作的对象看作公寓，每个字段看作一个房间，而房间内住的人就是 visitor 。

对应到 Babel traverse 的实现，就是 AST 和 visitor 分离，在 tarverse ( 遍历 ) AST 的时候，调用注册的 visitor 对其进行处理。

这样使得 AST 的结构和遍历算法固定，visitor 可以通过插件独立扩展。
