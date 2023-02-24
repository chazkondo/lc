/**
 * @param {number} n
 * @return {number}
 */

// brute force - incorrect*
var countVowelPermutationBF = function(n) {
    
    // cl -> current length
    // ld -> last digit
    function dfs(cl, ld) {
        if (cl === n - 1) {
            if (ld === 0 || ld === 3) return 2
            if (ld === 1 || ld === 4) return 1
            if (ld === 2) return 4
            if (ld === -1) return 5
        }
        
        let total = 0
        for (let i = 0; i < 5; i++) {
            total += dfs(cl + 1, i)
        }
        
        return total
    }
    
    return dfs(0, -1)
};

// Top Down - AC
var countVowelPermutationTD = function(n) {
    
    const memo = {}
    
    // cl -> current length
    // ld -> last digit
    function dfs(cl, ld) {
        if (cl === n - 1) return 1
        
        const memostr = `${cl}, ${ld}`
        if (memostr in memo) return memo[memostr]
        
        if (ld === 0) memo[memostr] = dfs(cl + 1, 1)
        if (ld === 1) memo[memostr] = dfs(cl + 1, 0) + dfs(cl + 1, 2)
        if (ld === 2) {
            memo[memostr] = 0
            for (let i = 0; i < 5; i++) 
                if (i !== 2) memo[memostr] += dfs(cl + 1, i)
        }
        if (ld === 3) memo[memostr] = dfs(cl + 1, 2) + dfs(cl + 1, 4)
        if (ld === 4) memo[memostr] = dfs(cl + 1, 0)
        
        return memo[memostr] % (10 ** 9 + 7)
    }
    
    let ans = 0
    for (let i = 0; i < 5; i++) {
        ans += dfs(0, i)
    }
    return ans % (10 ** 9 + 7)
};

/* thought process */

// I struggled trying to find the base case here
// It eventually became apparent that the for loop I was doing in the 
// brute force solution was wrong because for each letter, I had to 
// explicitly call dfs on a specific digit (or letter) because of it's
// specific case - which likely makes this question slightly harder than a medium

// After I listed out the cases, I was still getting the wrong answer.
// This is when I started to realize that calling -1 on the most top level
// dfs was wrong - I actually needed to dfs on all digits/letters iteratively.

// Finally, I was getting a larger number than what was expected. Now that I 
// was going through each possible option, I suspected my base case to be wrong.
// Sure enough, this was due to my base case trying to give the number of 
// potential options based on the `last digit` which is wrong because if you have
// one only digit left to fill, you can only provide one letter. Since all of the digits 
// allow to have at least one 'following digit', we simply return 1 and leave it to the 
// parent caller to aggregate the total amount of letters that should be summed up on 
// the bottom-of-tree level.

// The last caveat is to remmeber to modulo each memoized dfs return
// so we have a cosistency. 


// Top Down Reversed Staircase - AC
var countVowelPermutationTDR = function(n) {
    
    const memo = {}
    function dfs(cl, ld) {
        if (cl === 1) return 1
        
        const memostr = `${cl}, ${ld}`
        if (memostr in memo) return memo[memostr]
        
        if (ld === 0) memo[memostr] = dfs(cl - 1, 1)
        if (ld === 1) memo[memostr] = dfs(cl - 1, 0) + dfs(cl - 1, 2)
        if (ld === 2) {
            memo[memostr] = 0
            for (let i = 0; i < 5; i++) 
                if (i !== 2) memo[memostr] += dfs(cl - 1, i)
        }
        if (ld === 3) memo[memostr] = dfs(cl - 1, 2) + dfs(cl - 1, 4)
        if (ld === 4) memo[memostr] = dfs(cl - 1, 0)
        
        return memo[memostr] % (10 ** 9 + 7)
    }
    
    let ans = 0
    for (let i = 0; i < 5; i++) {
        ans += dfs(n, i)
    }
    return ans % (10 ** 9 + 7)
};

// Top Down Reversed Staircase Revised - AC
var countVowelPermutation = function(n) {
    
    const memo = {}
    function dfs(cl, ld) {
        if (cl === 0) return 1
        
        const memostr = `${cl}, ${ld}`
        if (memostr in memo) return memo[memostr]
        
        if (ld === 0) memo[memostr] = dfs(cl - 1, 1)
        if (ld === 1) memo[memostr] = dfs(cl - 1, 0) + dfs(cl - 1, 2)
        if (ld === 2) {
            memo[memostr] = 0
            for (let i = 0; i < 5; i++) 
                if (i !== 2) memo[memostr] += dfs(cl - 1, i)
        }
        if (ld === 3) memo[memostr] = dfs(cl - 1, 2) + dfs(cl - 1, 4)
        if (ld === 4) memo[memostr] = dfs(cl - 1, 0)
        
        return memo[memostr] % (10 ** 9 + 7)
    }
    
    let ans = 0
    for (let i = 0; i < 5; i++) {
        ans += dfs(n - 1, i)
    }
    return ans % (10 ** 9 + 7)
};


// Bottom Up DP,
var countVowelPermutation = function(n) {

    // it seems like a 2 dimensional dp based on my previous memostr
    // my base case for the dp will be when the current length is 0
    // (revised to 0 from 1)

    // so in the first example, we have n = 0 (revised to 0)
    // it looks like we would have a loop that goes through
    // each of the five letters, and aggregates the amounts

    // dp might look something like
    // [[1], [1], [1], [1], [1]]
    // this would sum up to 5

    // in the second example, n = 2
    // and we should get an output of 10

    // dp might be initialized to
    // [[1, 0], [1, 0], [1, 0], [1, 0], [1, 0]]

    // the first loop would iterate through the arrays
    // the second loop would iterate through the letters
    // in the previous example where we only had the base case,
    // the second loop may not have run due to there being no room in dp

    // so dp is generally reflecting current length ->
    // meaning, at each index, go through the possible outcomes
    // and count them up
    
    // there for we must initialize the dp to have an inner array
    // for each of the possible starting numbers
    // and the inner for loop will just help us count as we go on
    
    // something is still wrong with my logic here.
    // spent time on codespaces so I didn't have enough time here
    // I'll come back tomorrow

    const dp = Array(n).fill().map(() => Array(6).fill(0))
    dp.map(arr => arr[0] = 1)

    for (let i = 0; i < n; i++) {
        for (let j = 1; j < 6; j++) {
            if (j === 0) dp[i][j] = dp[i - 1][1]
            if (j === 1) dp[i][j] = dp[i - 1][0] + dp[i - 1][2]
            if (j === 2) {
                for (let k = 0; i < 5; k++)
                    if (k !== 2) dp[i][j] += dp[i - 1][k]
            }
            if (j === 3) dp[i][j] = dp[i - 1][2] + dp[i - 1][4]
            if (j === 4) dp[i][j] = dp[i - 1][0]

            dp[i][j] = dp[i][j] % (10 ** 9 + 7)
        }
    }
    
    console.log(dp, 'sanity')
};
