/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    let max = nums[0], min = nums[0], gMax = nums[0]
    
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]
        let tMax = Math.max(num * max, num, num * min)
        min = Math.min(min * num, num, max * num)
        max = tMax
        gMax = Math.max(max, gMax)
    }
    
    return gMax
};