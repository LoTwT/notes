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
            "/zh/dataAndAlgorithm/algorithm/19-removeNthNodeFromEndOfList.md",
            "/zh/dataAndAlgorithm/algorithm/20-validParentheses.md",
            "/zh/dataAndAlgorithm/algorithm/21-mergeTwoSortedList.md",
            "/zh/dataAndAlgorithm/algorithm/26-removeDuplicatesFromSortedArray.md",
            "/zh/dataAndAlgorithm/algorithm/27-removeElement.md",
            "/zh/dataAndAlgorithm/algorithm/46-permutations.md",
            "/zh/dataAndAlgorithm/algorithm/55-jumpGame.md",
            "/zh/dataAndAlgorithm/algorithm/71-simplifyPath.md",
            "/zh/dataAndAlgorithm/algorithm/79-wordSearch.md",
            "/zh/dataAndAlgorithm/algorithm/92-reverseLinkedList2.md",
            "/zh/dataAndAlgorithm/algorithm/94-binaryTreeInorderTraversal.md",
            "/zh/dataAndAlgorithm/algorithm/100-sameTree.md",
            "/zh/dataAndAlgorithm/algorithm/101-symmetricTree.md",
            "/zh/dataAndAlgorithm/algorithm/102-binaryTreeLevelOrderTraversal.md",
            "/zh/dataAndAlgorithm/algorithm/104-maximumDepthOfBinaryTree.md",
            "/zh/dataAndAlgorithm/algorithm/107-binaryTreeLevelOrderTravsal2.md",
            "/zh/dataAndAlgorithm/algorithm/110-balancedBinaryTree.md",
            "/zh/dataAndAlgorithm/algorithm/111-minimunDepthOfBinaryTree.md",
            "/zh/dataAndAlgorithm/algorithm/114-flattenBinaryTreeToLinkedList.md",
            "/zh/dataAndAlgorithm/algorithm/116-populatingNextRightPointersInEachNode.md",
            "/zh/dataAndAlgorithm/algorithm/136-singleNumber.md",
            "/zh/dataAndAlgorithm/algorithm/141-linkedListCycle.md",
            "/zh/dataAndAlgorithm/algorithm/142-linkedListCycle2.md",
            "/zh/dataAndAlgorithm/algorithm/144-binaryTreePreorderTraversal.md",
            "/zh/dataAndAlgorithm/algorithm/145-binaryTreePostorderTraversal.md",
            "/zh/dataAndAlgorithm/algorithm/146-LRUCache.md",
            "/zh/dataAndAlgorithm/algorithm/160-intersectionOfTwoLinkedList.md",
            "/zh/dataAndAlgorithm/algorithm/167-twoSum2InputIsSortedArray.md",
            "/zh/dataAndAlgorithm/algorithm/199-binaryTreeRightSideView.md",
            "/zh/dataAndAlgorithm/algorithm/203-removeLinkedListElements.md",
            "/zh/dataAndAlgorithm/algorithm/206-reverseLinkedList.md",
            "/zh/dataAndAlgorithm/algorithm/209-minimumSizeSubarraySum.md",
            "/zh/dataAndAlgorithm/algorithm/222-countCompleteTreeNode.md",
            "/zh/dataAndAlgorithm/algorithm/226-invertBinaryTree.md",
            "/zh/dataAndAlgorithm/algorithm/231-powerOfTwo.md",
            "/zh/dataAndAlgorithm/algorithm/234-palindromeLinkedList.md",
            "/zh/dataAndAlgorithm/algorithm/236-lowestCommonAncestorOfABinaryTree.md",
            "/zh/dataAndAlgorithm/algorithm/257-binaryTreePaths.md",
            "/zh/dataAndAlgorithm/algorithm/283-moveZeros.md",
            "/zh/dataAndAlgorithm/algorithm/300-longestIncreasingSubsequence.md",
            "/zh/dataAndAlgorithm/algorithm/322-coinChange.md",
            "/zh/dataAndAlgorithm/algorithm/344-reverseString.md",
            "/zh/dataAndAlgorithm/algorithm/455-assignCookies.md",
            "/zh/dataAndAlgorithm/algorithm/509-fibonacciNumber.md",
            "/zh/dataAndAlgorithm/algorithm/543-diameterOfBinaryTree.md",
            "/zh/dataAndAlgorithm/algorithm/572-subtreeOfAnotherTree.md",
            "/zh/dataAndAlgorithm/algorithm/617-mergeTwoBinaryTrees.md",
            "/zh/dataAndAlgorithm/algorithm/637-averageOfLevelsInBinaryTree.md",
            "/zh/dataAndAlgorithm/algorithm/860-lemonadeChange.md",
            "/zh/dataAndAlgorithm/algorithm/876-middleOfTheLinkedList.md",
            "/zh/dataAndAlgorithm/algorithm/977-squaresOfASortedArray.md",
          ],
        },
      ],
    },
  ],

  "/zh/toolchain": [
    {
      text: "构建工具",
      link: "/zh/toolchain/README.md",
    },
    {
      text: "Vite",
      link: "/zh/toolchain/vite/README.md",
      children: [],
    },
    {
      text: "Rollup",
      link: "/zh/toolchain/rollup/README.md",
      children: ["/zh/toolchain/rollup/tspackage.md"],
    },
    {
      text: "Babel",
      link: "/zh/toolchain/babel/README.md",
      children: ["/zh/toolchain/babel/AST.md", "/zh/toolchain/babel/API.md"],
    },
  ],

  "/zh/others": [
    {
      text: "杂项",
      link: "/zh/others/README.md",
      children: ["/zh/others/docker.md"],
    },
  ],

  "/zh/typescript": [
    {
      text: "typescript",
      link: "/zh/typescript/README.md",
      children: [
        {
          text: "有趣的 typescript",
          children: ["/zh/typescript/fun/distributedDts.md"],
        },
        {
          text: "类型体操",
          children: [
            "/zh/typescript/challenges/README.md",
            "/zh/typescript/challenges/twoSum.md",
          ],
        },
      ],
    },
  ],

  "/zh/translate": [
    {
      text: "翻译",
      link: "/zh/translate/README.md",
      children: ["/zh/translate/v18-release-announce.md"],
    },
  ],
}
