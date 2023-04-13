/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if (nums.length === 1) {
        if (target === nums[0]) return 0  
        return -1
    }

    let left = 0
    let right = nums.length - 1

while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) return mid
    if (nums[right] === target) return right
    if (nums[left] === target) return left
    if (left === right - 1) break
    if (nums[right] > nums[mid]) { // increasing side from midpoint
        if (target > nums[mid] && target < nums[right]) {
            left = mid
        } else {
            right = mid
        }
    } else {
        if (target > nums[left] && target < nums[mid]) {
            right = mid
        } else { 
            left = mid
        }
    }
    
    
}

    return -1
};