/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let l = 0, r = nums.length - 1
    while (l <= r) {
        const m = l + Math.floor((r - l) / 2)

        if (nums[m] < target) {
            l = m + 1
        } 
        else if (nums[m] > target) {
            r = m - 1
        }
        else if (nums[m] === target) {
            return m
        }
    }
    return l
};
