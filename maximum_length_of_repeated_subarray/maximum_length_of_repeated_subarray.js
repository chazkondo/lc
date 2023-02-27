/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function(n1, n2) {
    
    const memo = {}
    
    function dfs(i, j) {
        if (i === n1.length || j === n2.length) return 0
        
        const memostr = `${i}, ${j}`
        if (memostr in memo) return memo[memostr]
        
        if (n1[i] === n2[j]) return 1 + dfs(i + 1, j + 1)
        
        return Math.max(dfs(i + 1, j), dfs(i, j + 1))
    }
    
    return dfs(0, 0)
};
