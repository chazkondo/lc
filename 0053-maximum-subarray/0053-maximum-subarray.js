/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let cur = nums[0], max = nums[0]
    for (let i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], nums[i] + cur)
        max = Math.max(max, cur)
    }
    return max
};