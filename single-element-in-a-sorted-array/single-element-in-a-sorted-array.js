/**
 * https://leetcode.com/problems/single-element-in-a-sorted-array/solution/
 * @param {number[]} nums
 * @return {number}
 */

// inefficient time
// O(n) time | O(1) space
var singleNonDuplicate1 = function(nums, m = 0) {
    nums.forEach(n => m ^= n)
    return m
};

/* ** efficient time 
 * O(lg n) | O(1) space
 * binary search
 * find mid and check if the right side is even
 * we know the left side is even because we do a floor on the mid point
 * if both halves are even, we simply need to check if the duplicate
 * of nums[mid] is on the left or the right
 *
 * if there is no duplicate we can return that number otherwise,
 * we return the side that is odd and iterate until left is greater or equal to right
 * at which point, we the remaining index is the single num we are looking for
 */
var singleNonDuplicate = function(nums, l = 0, r = nums.length - 1) {
    while (l < r) {
        const m = l + Math.floor((r - l) / 2)
        const evenHalves = !((r - m) % 2) // or assert (r - m) % 2 === 0
        if (nums[m] === nums[m + 1]) {
            if (evenHalves) {
                l = m + 2
            } else {
                r = m - 1
            }
        } 
        else if (nums[m - 1] === nums[m]) {
            if (evenHalves) {
                r = m - 2
            } else {
                l = m + 1
            }
        }
        else {
            return nums[m]
        }
    }
    return nums[l]
};

// efficient time
// O(lg n / 2) -> O(lg n) time | O(1) space
var singleNonDuplicate3 = function(nums, l = 0, r = nums.length - 1) {
    while (l < r) {
        let m = l + Math.floor((r - l) / 2)
        if (m % 2) m--
        if (nums[m] === nums[m + 1])
            l = m + 2
        else
            r = m
    }
    return nums[l]
};
