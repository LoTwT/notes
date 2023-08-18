import { type DefaultTheme } from "vitepress"

export const algorithm: DefaultTheme.SidebarMulti = {
  "/algorithm/": [
    {
      text: "计算机基础",
      collapsed: true,
      items: [
        { text: "冒泡排序", link: "/algorithm/bubbleSort" },
        { text: "快速排序", link: "/algorithm/quickSort" },
        {
          text: "原地快排",
          link: "/algorithm/quickSortInPlace",
        },
        {
          text: "二分优化 leftpad",
          link: "/algorithm/leftpad",
        },
        { text: "1-两数之和", link: "/algorithm/1-twoSum" },
        { text: "15-三数之和", link: "/algorithm/15-3sum" },
        {
          text: "17-电话号码的字母组合",
          link: "/algorithm/17-letterCombinationsOfAPhoneNumber",
        },
        {
          text: "19-删除链表的倒数第 N 个结点",
          link: "/algorithm/19-removeNthNodeFromEndOfList",
        },
        {
          text: "20-有效的括号",
          link: "/algorithm/20-validParentheses",
        },
        {
          text: "21-合并两个有序链表",
          link: "/algorithm/21-mergeTwoSortedList",
        },
        {
          text: "26-删除有序数组中的重复项",
          link: "/algorithm/26-removeDuplicatesFromSortedArray",
        },
        {
          text: "27-移除元素",
          link: "/algorithm/27-removeElement",
        },
        {
          text: "37-解数独",
          link: "/algorithm/37-sudokuSolver",
        },
        {
          text: "39-组合总和",
          link: "/algorithm/39-combinationSum",
        },
        {
          text: "45-跳跃游戏 II",
          link: "/algorithm/45-jumpGameII",
        },
        {
          text: "46-全排列",
          link: "/algorithm/46-permutations",
        },
        {
          text: "47-全排列 II",
          link: "/algorithm/47-permutations-ii",
        },
        { text: "51-N 皇后", link: "/algorithm/51-nQueens" },
        {
          text: "55-跳跃游戏",
          link: "/algorithm/55-jumpGame",
        },
        {
          text: "69- x 的平方根",
          link: "/algorithm/69-sqrtx",
        },
        {
          text: "71-简化括号",
          link: "/algorithm/71-simplifyPath",
        },
        {
          text: "77-组合",
          link: "/algorithm/77-combinations",
        },
        { text: "78-子集", link: "/algorithm/78-subsets" },
        {
          text: "79-单词搜索",
          link: "/algorithm/79-wordSearch",
        },
        {
          text: "92-反转链表 II",
          link: "/algorithm/92-reverseLinkedList2",
        },
        {
          text: "93-复原 IP 地址",
          link: "/algorithm/93-restoreIpAddresses",
        },
        {
          text: "94-二叉树的中序遍历",
          link: "/algorithm/94-binaryTreeInorderTraversal",
        },
        {
          text: "98-验证二叉搜索树",
          link: "/algorithm/98-validateBinarySearchTree",
        },
        {
          text: "99-恢复二叉搜索树",
          link: "/algorithm/99-recoverBinarySearchTree",
        },
        {
          text: "100-相同的树",
          link: "/algorithm/100-sameTree",
        },
        {
          text: "101-对称二叉树",
          link: "/algorithm/101-symmetricTree",
        },
        {
          text: "102-二叉树的层序遍历",
          link: "/algorithm/102-binaryTreeLevelOrderTraversal",
        },
        {
          text: "104-二叉树的最大深度",
          link: "/algorithm/104-maximumDepthOfBinaryTree",
        },
        {
          text: "107-二叉树的层序遍历 II",
          link: "/algorithm/107-binaryTreeLevelOrderTravsal2",
        },
        {
          text: "108-将有序数组转换为二叉搜索树",
          link: "/algorithm/108-convertSortedArrayToBinarySearchTree",
        },
        {
          text: "109-有序链表转换二叉搜索树",
          link: "/algorithm/109-convertSortedListToBinarySearchTree",
        },
        {
          text: "110-平衡二叉树",
          link: "/algorithm/110-balancedBinaryTree",
        },
        {
          text: "111-二叉树的最小深度",
          link: "/algorithm/111-minimunDepthOfBinaryTree",
        },
        {
          text: "112-路径总和",
          link: "/algorithm/112-pathSum",
        },
        {
          text: "114-二叉树展开为链表",
          link: "/algorithm/114-flattenBinaryTreeToLinkedList",
        },
        {
          text: "116-填充每个节点的下一个右侧节点指针",
          link: "/algorithm/116-populatingNextRightPointersInEachNode",
        },
        {
          text: "117-填充每个节点的下一个右侧节点指针 II",
          link: "/algorithm/117-populatingNextRightPointersInEachNode2",
        },
        {
          text: "125-验证回文串",
          link: "/algorithm/125-validPalindrome",
        },
        {
          text: "131-分割回文串",
          link: "/algorithm/131-palindromePartitioning",
        },
        {
          text: "136-只出现一次的数字",
          link: "/algorithm/136-singleNumber",
        },
        {
          text: "141-环形链表",
          link: "/algorithm/141-linkedListCycle",
        },
        {
          text: "142-环形链表 II",
          link: "/algorithm/142-linkedListCycle2",
        },
        {
          text: "144-二叉树的前序遍历",
          link: "/algorithm/144-binaryTreePreorderTraversal",
        },
        {
          text: "145-二叉树的后序遍历",
          link: "/algorithm/145-binaryTreePostorderTraversal",
        },
        {
          text: "146-LRU 缓存",
          link: "/algorithm/146-LRUCache",
        },
        {
          text: "150-逆波兰表达式求值",
          link: "/algorithm/150-evaluateReversePolishNotation",
        },
        {
          text: "151-颠倒字符串中的单词",
          link: "/algorithm/151-reverseWordsInAString",
        },
        {
          text: "153-寻找旋转排序数组中的最小值",
          link: "/algorithm/153-findMinimumInRotatedSortedArray",
        },
        {
          text: "160-相交链表",
          link: "/algorithm/160-intersectionOfTwoLinkedList",
        },
        {
          text: "167-两数之和 II - 输入有序数组",
          link: "/algorithm/167-twoSum2InputIsSortedArray",
        },
        {
          text: "199-二叉树的右视图",
          link: "/algorithm/199-binaryTreeRightSideView",
        },
        {
          text: "203-移除链表元素",
          link: "/algorithm/203-removeLinkedListElements",
        },
        {
          text: "206-反转链表",
          link: "/algorithm/206-reverseLinkedList",
        },
        {
          text: "209-长度最小的子数组",
          link: "/algorithm/209-minimumSizeSubarraySum",
        },
        {
          text: "222-完全二叉树的节点个数",
          link: "/algorithm/222-countCompleteTreeNode",
        },
        {
          text: "225-用队列实现栈",
          link: "/algorithm/225-implementStackUsingQueues",
        },
        {
          text: "226-翻转二叉树",
          link: "/algorithm/226-invertBinaryTree",
        },
        {
          text: "230-二叉搜索树中第 K 小的元素",
          link: "/algorithm/230-kthSmallestElementInABst",
        },
        {
          text: "231- 2 的幂",
          link: "/algorithm/231-powerOfTwo",
        },
        {
          text: "232-用栈实现队列",
          link: "/algorithm/232-implementQueueUsingStacks",
        },
        {
          text: "234-回文链表",
          link: "/algorithm/234-palindromeLinkedList",
        },
        {
          text: "236-二叉树的最近公共祖先",
          link: "/algorithm/236-lowestCommonAncestorOfABinaryTree",
        },
        {
          text: "257-二叉树的所有路径",
          link: "/algorithm/257-binaryTreePaths",
        },
        {
          text: "283-移动零",
          link: "/algorithm/283-moveZeros",
        },
        {
          text: "300-最长递增子序列",
          link: "/algorithm/300-longestIncreasingSubsequence",
        },
        {
          text: "322-零钱兑换",
          link: "/algorithm/322-coinChange",
        },
        {
          text: "344-反转字符串",
          link: "/algorithm/344-reverseString",
        },
        {
          text: "404-左叶子之和",
          link: "/algorithm/404-sumOfLeftLeaves",
        },
        {
          text: "429-N 叉树的层序遍历",
          link: "/algorithm/429-nAryTreeLevelOrderTraversal",
        },
        {
          text: "435-无重叠区间",
          link: "/algorithm/435-nonOverlappingIntervals",
        },
        {
          text: "452-用最少数量的箭引爆气球",
          link: "/algorithm/452-minimumNumberOfArrowsToBurstBalloons",
        },
        {
          text: "455-分发饼干",
          link: "/algorithm/455-assignCookies",
        },
        {
          text: "509-斐波那切数",
          link: "/algorithm/509-fibonacciNumber",
        },
        {
          text: "515-在每个树行中找最大值",
          link: "/algorithm/515-findLargestValueInEachTreeRow",
        },
        {
          text: "543-二叉树的直径",
          link: "/algorithm/543-diameterOfBinaryTree",
        },
        {
          text: "572-另一棵树的子树",
          link: "/algorithm/572-subtreeOfAnotherTree",
        },
        {
          text: "617-合并二叉树",
          link: "/algorithm/617-mergeTwoBinaryTrees",
        },
        {
          text: "637-二叉树的层平均值",
          link: "/algorithm/637-averageOfLevelsInBinaryTree",
        },
        {
          text: "654-最大二叉树",
          link: "/algorithm/654-maximumBinaryTree",
        },
        {
          text: "700-二叉搜索树中的搜索",
          link: "/algorithm/700-searchInABinarySearchTree",
        },
        {
          text: "701-二叉搜索树中的插入操作",
          link: "/algorithm/701-insertIntoABinarySearchTree",
        },
        {
          text: "704-二分查找",
          link: "/algorithm/704-binarySearch",
        },
        {
          text: "860-柠檬水找零",
          link: "/algorithm/860-lemonadeChange",
        },
        {
          text: "876-链表的中间结点",
          link: "/algorithm/876-middleOfTheLinkedList",
        },
        {
          text: "977-有序数组的平方",
          link: "/algorithm/977-squaresOfASortedArray",
        },
        {
          text: "1047-删除字符串中的所有相邻重复项",
          link: "/algorithm/1047-removeAllAdjacentDuplicatesInString",
        },
      ],
    },
  ],
}
