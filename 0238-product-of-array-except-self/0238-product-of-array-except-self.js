/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let l = 1, r = 1
    let ans = Array(nums.length).fill(1)
    
    for (let i = 0; i < nums.length; i++) {
        ans[i] = l
        l *= nums[i]
    }
    
    for (let j = nums.length - 1; j >= 0; j--) {
        ans[j] *= r
        r *= nums[j]
    }

    return ans
};