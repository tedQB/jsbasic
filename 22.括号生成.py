#
# @lc app=leetcode.cn id=22 lang=python
#
# [22] 括号生成
#
# https://leetcode-cn.com/problems/generate-parentheses/description/
#
# algorithms
# Medium (68.48%)
# Total Accepted:    14.8K
# Total Submissions: 21.6K
# Testcase Example:  '3'
#
# 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
# 
# 例如，给出 n = 3，生成结果为：
# 
# [
# ⁠ "((()))",
# ⁠ "(()())",
# ⁠ "(())()",
# ⁠ "()(())",
# ⁠ "()()()"
# ]
# 
# 
#
class Solution(object):
    def generateParenthesis(self, n):
        """
        :type n: int
        :rtype: List[str]
        """
        

