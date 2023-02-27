/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

// WA
var findLengthTD = function(n1, n2) {
    
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


// try to do Brute force and it worked.

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function(n1, n2) {
    
    let b = 0 // best
    for (let i = 0; i < n1.length; i++) {
        for (let j = 0; j < n2.length; j++) {
            if (n1[i] === n2[j]) {
                let c = 1
                for (let k = 1; k < Math.min(n1.length - i, n2.length - j); k++) {
                    if (n1[k + i] === n2[k + j]) {
                        c++
                    } else {
                        break
                    }
                }
                b = Math.max(c, b)
            }
        }
    }
    return b
};
