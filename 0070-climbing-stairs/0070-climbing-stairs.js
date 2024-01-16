/**
 * @param {number} n
 * @return {number}
 */
const memo = {}

var climbStairsTD = function(n) {
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

function climbStairs(n) {
    if (!n) return 0
    if (n === 1) return 1
    let [a, b, t] = [1, 2, -1]
    for (let i = 2; i < n; i++) {
        t = b + a
        a = b
        b = t
    }
    return b
}