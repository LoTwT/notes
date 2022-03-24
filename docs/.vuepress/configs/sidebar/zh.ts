import type { SidebarConfig } from "@vuepress/theme-default"

export const zh: SidebarConfig = {
  "/zh/dataAndAlgorithm": [
    {
      text: "数据结构和算法",
      link: "/zh/dataAndAlgorithm/README.md",
      children: [
        {
          text: "数据结构",
          children: [
            "/zh/dataAndAlgorithm/data/linkedList.md",
            "/zh/dataAndAlgorithm/data/bitwiseOperation.md",
          ],
        },
        {
          text: "算法",
          children: [
            "/zh/dataAndAlgorithm/algorithm/README.md",
            "/zh/dataAndAlgorithm/algorithm/bubbleSort.md",
            "/zh/dataAndAlgorithm/algorithm/quickSort.md",
            "/zh/dataAndAlgorithm/algorithm/quickSortInPlace.md",
            "/zh/dataAndAlgorithm/algorithm/leftpad.md",
            "/zh/dataAndAlgorithm/algorithm/1-twoSum.md",
            "/zh/dataAndAlgorithm/algorithm/15-3sum.md",
            "/zh/dataAndAlgorithm/algorithm/20-validParentheses.md",
            "/zh/dataAndAlgorithm/algorithm/46-permutations.md",
            "/zh/dataAndAlgorithm/algorithm/71-simplifyPath.md",
            "/zh/dataAndAlgorithm/algorithm/79-wordSearch.md",
            "/zh/dataAndAlgorithm/algorithm/100-sameTree.md",
            "/zh/dataAndAlgorithm/algorithm/104-maximumDepthOfBinaryTree.md",
            "/zh/dataAndAlgorithm/algorithm/136-singleNumber.md",
            "/zh/dataAndAlgorithm/algorithm/141-linkedListCycle.md",
            "/zh/dataAndAlgorithm/algorithm/146-LRUCache.md",
            "/zh/dataAndAlgorithm/algorithm/203-removeLinkedListElements.md",
            "/zh/dataAndAlgorithm/algorithm/226-invertBinaryTree.md",
            "/zh/dataAndAlgorithm/algorithm/231-powerOfTwo.md",
            "/zh/dataAndAlgorithm/algorithm/860-lemonadeChange.md",
          ],
        },
      ],
    },
  ],

  "/zh/tools": [
    {
      text: "构建工具",
      link: "/zh/tools/README.md",
    },
    {
      text: "Vite",
      children: ["/zh/tools/vite/README.md"],
    },
    {
      text: "Rollup",
      children: ["/zh/tools/rollup/README.md", "/zh/tools/rollup/tspackage.md"],
    },
  ],

  "/zh/others": [
    {
      text: "杂项",
      link: "/zh/others/README.md",
      children: ["/zh/others/docker.md"],
    },
  ],
}
