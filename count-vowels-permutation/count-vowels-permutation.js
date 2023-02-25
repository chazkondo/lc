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


// Bottom Up DP - AC
var countVowelPermutationBU = function(n) {

    // it seems like a 2 dimensional dp based on my previous memostr
    // my base case for the dp will be when the current length is 0
    // (revised to 0 from 1)

    // so in the first example, we have n = 0 (revised to 0)
    // it looks like we would have a loop that goes through
    // each of the five letters, and aggregates the amounts

    // dp might look something like
    // [[1], [1], [1], [1], [1]]
    // this would sum up to 5

    // ^ lets go back to this idea:
    // if i intialize dp length to be 5 + 1
    // I may get something like
    // [[1], [0], [0], [0], [0], [0]]
    // then the `total` would also be initialized to 0
    // lets see if the recurrence logic works here:
    // if I start at index 1 and check dp[i][j] -> dp[1][0]
    // does dp[i - 1][1] work? 
    // no, this doesn't work because index of j = 1 is out of bounds.

    // atmp2: maybe I need to initialize dp to be:
    // [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0,]]
    // aka: dp would have length of n + 1 w/ dp[0] having all values to 1
    // lets see if the recurrence logic works here:
    // if I start at index 1 and check dp[i][j] -> dp[1][0]
    // does dp[i - 1][1] work? 
    // yes, but is it right?
    // [ [ 1, 1, 1, 1, 1 ], [ 1, 2, 4, 2, 1 ] ] No ->
    // All logic in this section is outdated -> **please see below the problem
    // for AC insights

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
    
    // therefore* we must initialize the dp to have an inner array
    // for each of the possible starting numbers
    // and the inner for loop will just help us count as we go on
    
    // 
    if (n === 1) return 5

    const dp = Array(n).fill().map(() => Array(5).fill(0))
    dp[0] = [1, 1, 1, 1, 1]

    console.log(dp)

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < 5; j++) {
            if (j === 0) {
                dp[i][j] = dp[i - 1][1] % (10 ** 9 + 7)
                continue
            }
            if (j === 1) {
                dp[i][j] = (dp[i - 1][0] + dp[i - 1][2]) % (10 ** 9 + 7)
                continue
            }
            if (j === 2) {
                for (let k = 0; k < 5; k++)
                    if (k !== 2) dp[i][j] += dp[i - 1][k]
                dp[i][j] = dp[i][j] % (10 ** 9 + 7)
                continue
            }
            if (j === 3) {
                dp[i][j] = (dp[i - 1][2] + dp[i - 1][4]) % (10 ** 9 + 7)
                continue
            }
            if (j === 4) {
                dp[i][j] = dp[i - 1][0] % (10 ** 9 + 7)
                continue
            }

        }
    }

    return dp[n - 1].reduce((a, b) => a + b) % (10 ** 9 + 7)
    
};

// AC insights: What I needed to do in the above problem was
// handle a simple base case which is, if n is equal to 1,
// then I just return because I can either have an
// a, e, i, o, or u. That's five options that can fit in once space

// however, after that, I use the dp to keep track of the last row.
// I initialize dp length to reflect n -> the number of potential spaces
// we are given to fill
// and in each space, I have 5 potential spots. [_, _, _, _, _]

// since we know that if n is 1, we are given one spot, therefore we have a total of
// 5 choices -> this means that we can initialize our starting dp index with
// [1, 1, 1, 1, 1]

// 1 indicates that I can use 'a' once, 'e' once, etc...

// Finally, all we have to do is reuse our recurrence relation, and continue
// counting the previous 

// I inherently felt like I needed to keep a total count, may be useful,
// but all I needed to do was add the sums from the last array
// because each iterated array represents the max we can get if we use 
// each letter at that specific index

// for example: 
// [a, e, i, o, u] (remember this is represented by [1, 1, 1, 1, 1])
// the next array that builds off of this will be 
// [a, e, i, o, u], ['ae', 'ea' or 'ei', 'ia' or 'ie' or 'io' or 'iu', 'oi' or 'ou', 'ua']
// as we can see from above, this is ALL the options we can have, and we built it using
// the recursion relationship and the base case.

// Bottom Up Optimiazed - AC
var countVowelPermutation = function(n) {

    if (n === 1) return 5
    let dp = [1, 1, 1, 1, 1]
    let total = 0

    for (let i = 1; i < n; i++) {
        total = 0 // reset total
        const diff = [0, 0, 0, 0, 0] // create new dp
        for (let j = 0; j < 5; j++) {
            if (j === 0) total += diff[j] = dp[1] % (10 ** 9 + 7)
            if (j === 1) total += diff[j] = (dp[0] + dp[2]) % (10 ** 9 + 7)
            if (j === 2) {
                for (let k = 0; k < 5; k++)
                    if (k !== 2) diff[j] += dp[k]
                total += diff[j] = diff[j] % (10 ** 9 + 7)
            }
            if (j === 3) total += diff[j] = (dp[2] + dp[4]) % (10 ** 9 + 7)
            if (j === 4) total += diff[j] = dp[0] % (10 ** 9 + 7)
        }
        dp = diff
    }

    return total % (10 ** 9 + 7)
};
