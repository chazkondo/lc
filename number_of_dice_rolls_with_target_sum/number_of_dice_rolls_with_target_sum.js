/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */

// unsure why i am returning 0 here.. 
// ^update:
// now that I think about it, we are probably not adding up to
// target because I am not keeping a running DP that changes when
// the outer loop increments

// to do:
// create a dp that either has all levels of n
// or update dp in a way that reflects the last sums

// * may need to approach from a top down brute force to 
// fully understand the complexity of the problem

// [7-1=6, 7-2=5, 7-3=4, 7-4=3, 7-5=2, 7-6=1]

// it seems that on each level down, i'll need to keep track of k times k more states 
// to iterate through. 

var numRollsToTargetAttemptToDP = function(n, FACES, target) {
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

var numRollsToTarget = function(n, FACES, target) {
    // try top down
    
    
};
