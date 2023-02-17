  /* alluding to what clayton wong once said,
  * you don't want to be procedural in your code.
  * aka, leave the 'how' to the language
  * since there will be performance benefits under the hood
  */

 // example of a top speed submission for JS
 var maxCoins = (nums) => {
    const tabu = initTabu(nums);/* Time O(N * N)     | Space O(N * N) */

    search(nums, tabu);         /* Time O(N * N * N) | Space O(N * N) */

    return tabu[1][(nums.length)];
}

var initTabu = (nums) => new Array(nums.length + 2).fill()/* Time O(N) | Space O(N) */
    .map(() => new Array(nums.length + 2).fill(0))            /* Time O(N) | Space O(N) */

var search = (nums, tabu) => {
    const _nums = [ 1, ...nums, 1 ];                         /* Time O(N) | Space O(N) */
    
    for (let left = nums.length; (1 <= left); left--) {      /* Time O(N) */
        for (let right = left; (right <= nums.length); right++) {/* Time O(N) */
            for (let i = left; (i <= right); i++) {
                const gain = ((_nums[left - 1] * _nums[i]) * _nums[right + 1]);
                const remaining = (tabu[left][i - 1] + tabu[i + 1][right]);

                tabu[left][right] =                                  /*   | Space O(N * N) */
                    Math.max(remaining + gain, tabu[left][right]);
            }
        }
    }
}

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

    /* *important* need to change function names to `maxCoins` 
     *  in order to run each function
     */

    // console.log(dp) // see flip compared to next version
    return dp[1][n - 2]
};


// flip dp tabulation
var maxCoinsFlippedTabulation = function(ON, nums = [1, ...ON, 1]) { // `ON` for original nums

    const dp = Array(nums.length).fill().map(() => Array(nums.length).fill(0))

    for (let right = 1; right < nums.length - 1; right++) {
        for (let left = right; left > 0; left--) {
            for (let i = right; i >= left; i--) {
                const gain = nums[left - 1] * nums[i] * nums[right + 1]
                const remaining = dp[i - 1][left] + dp[right][i + 1]

                dp[right][left] = Math.max(remaining + gain, dp[right][left])
            }
        }
    }

    /* *important* need to change function names to `maxCoins` 
     *  in order to run each function
     */

    // console.log(dp) // see flip compared to previous version

    return dp[nums.length - 2][1]
};


/* I thought that cutting off the sentinals and removing the extra 0s from
 * dp would make the algorithm more space efficient and potentially faster
 * however, it was about the same as the previous version.
 * Based on other solutions, it seems it is faster to just push the sentinals
 * and keep the array the same. I did see a small performance boost when
 * keeping a local max (as illustrated in the next solution), however
 * the original solution of keeping the sentinals and original dp seems the best
 */

// flip dp tabulation
var maxCoinsNoPerformanceBoost = function(n) {

    const dp = Array(n.length).fill().map(() => Array(n.length).fill(0))

    for (let right = 0; right < n.length; right++) {
        for (let left = right; left >= 0; left--) {
            for (let i = right; i >= left; i--) {
                const lg = left - 1 >= 0 ? n[left - 1] : 1 // left gain
                const rg = right + 1 < n.length ? n[right + 1] : 1 // right gain
                const gain = lg * n[i] * rg

                const dpl = i - 1 >= 0 ? dp[i - 1][left] : 0
                const dpr = i + 1 < n.length ? dp[right][i + 1] : 0

                dp[right][left] = Math.max(dpl + dpr + gain, dp[right][left])
            }
        }
    }

    return dp[n.length - 1][0]
};

var maxCoinsLocalMax = function(n) {

    const dp = Array(n.length).fill().map(() => Array(n.length).fill(0))

    for (let right = 0; right < n.length; right++) {
        let max = 0
        for (let left = right; left >= 0; left--) {
            for (let i = right; i >= left; i--) {
                const lg = left - 1 >= 0 ? n[left - 1] : 1 // left gain
                const rg = right + 1 < n.length ? n[right + 1] : 1 // right gain
                const gain = lg * n[i] * rg

                const dpl = i - 1 >= 0 ? dp[i - 1][left] : 0
                const dpr = i + 1 < n.length ? dp[right][i + 1] : 0

                max = Math.max(dpl + dpr + gain, max)
            }
            dp[right][left] = max
        }
    }

    return dp[n.length - 1][0]
};
