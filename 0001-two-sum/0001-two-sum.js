/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// 3-30-2023 
var twoSum = function(nums, target) {

    const map = {}
    
    for (let i = 0; i < nums.length; i++) {
        let val = target - nums[i]
        if (val in map) return [i, map[val]]
        map[nums[i]] = i
    }
    
};