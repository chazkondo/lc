/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoinsTD = function(nums) {
    nums = [1, ...nums, 1]
    
    const memo = {}
    
    function dfs(l, r)  {
        if (l > r) return 0

        const memostr = `${l}, ${r}`
        if (memostr in memo) return memo[memostr]

        memo[memostr] = 0

        for (let i = l; i < r + 1; i++) {
            let coins = nums[l - 1] * nums[i] * nums[r + 1]
            coins += dfs(l, i - 1) + dfs(i + 1, r)

            memo[memostr] = Math.max(memo[memostr], coins)
        }

        return memo[memostr]
    }

    return dfs(1, nums.length - 2)

};


// tabulation
var maxCoinsTabulation = function(nums) {
    const n = nums.length + 2
    nums = [1, ...nums, 1]
    // dp[i][j] represents
    // maximum if we burst all nums[left]...nums[right], inclusive
    const dp = Array(n).fill().map(() => Array(n).fill(0))


    /* when left shifts down, while filling up the dp matrix,
     * right starts at left, then shifts right
     * but when left !== right, we increment through i,
     * which gives us all the different possibilities of that left to right interval
     * and obviously saves the best result in dp
     */
    for (let left = 1; left < nums.length - 1; left++) {
        for (let right = left; right <= n - 2; right++) {
            // find the last burst one in newNums[left]...newNums[right]
            for (let i = left; i <= right; i++) {
                // newNums[i] is the last burst one
                const gain = nums[left - 1] * nums[i] * nums[right + 1]
                // recursively call left side and right side
                const remaining = dp[left][i - 1] + dp[i + 1][right]
                // update
                if (left === n - 4) console.log(remaining + gain, 'check3')
                dp[left][right] = Math.max(remaining + gain, dp[left][right])
                if (left === n - 4) console.log(dp, 'check3')
            }
        }
    }

    // burst newNums[1]...newNums[n-2], excluding the first one and the last one
    return dp[1][n - 2]
};


// flip dp tabulation
var maxCoins = function(nums) {
    const n = nums.length + 2
    nums = [1, ...nums, 1]
    // dp[i][j] represents
    // maximum if we burst all nums[left]...nums[right], inclusive
    const dp = Array(n).fill().map(() => Array(n).fill(0))

    for (let right = 1; right < nums.length - 1; right++) {
        for (let left = 1; left <= right; left++) {
            // find the last burst one in newNums[left]...newNums[right]
            for (let i = left; i <= right; i++) {
                // newNums[i] is the last burst one
                const gain = nums[left - 1] * nums[i] * nums[right + 1]
                // recursively call left side and right side
                const remaining = dp[left][i - 1] + dp[i + 1][right]
                // update
                if (right === 2) console.log(remaining + gain, 'check3')
                dp[left][right] = Math.max(remaining + gain, dp[left][right])
                if (right === 2) console.log(dp, 'check3')
            }
        }
    }

    // burst newNums[1]...newNums[n-2], excluding the first one and the last one
    return dp[1][n - 2]
};
