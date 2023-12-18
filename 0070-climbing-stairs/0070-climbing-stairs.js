/**
 * @param {number} n
 * @return {number}
 */
const memo = {}

var climbStairs = function(n) {
    if (n in memo) {
        return memo[n]
    }
    if (n === 0) {
        return 1
    }
    else if (n < 0) {
        return 0
    }
    else {
        memo[n] = climbStairs(n - 1) + climbStairs(n - 2)   
        return memo[n]
    }
};