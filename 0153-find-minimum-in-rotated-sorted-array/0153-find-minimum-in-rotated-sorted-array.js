/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    if (nums.length === 1) return nums[0]
    let l = 0, r = nums.length - 1
    
    while (l <= r) {
        if (l === r - 1) return Math.min(nums[l], nums[l + 1])
        
        const m = l + Math.floor((r - l) / 2)
        
        if (nums[r] < nums[m]) {
            l = m
        } else {
            r = m
        }
    }
};