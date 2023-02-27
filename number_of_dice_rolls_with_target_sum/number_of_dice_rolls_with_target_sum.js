/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */

// unsure why i am returning 0 here.. 
var numRollsToTarget = function(n, FACES, target) {
    if (n === 1) return target <= FACES ? 1 : 0 // base case
    
    let dp = Array(FACES + 1).fill(0)
    for (let i = 0; i < dp.length; i++) {
        dp[i] = i
    }
    
    let total = 0
    
    for (let i = 1; i < n; i++) {
        console.log('sanity')
        for (let j = 1; j < FACES + 1; j++) {
            for (let k = 1; k < FACES + 1; k++) {
                if (k + dp[j] === target) total++
            }
        }
    }
    
    return total
    
    
};
