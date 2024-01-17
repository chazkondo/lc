/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// January 17, 2024
var merge = function(nums1, m, nums2, n) {
    let x = m - 1, y = n - 1
    for (let i = m + n - 1; i > -1; i--) {
        if (y < 0) break
        if (nums1[x] > nums2[y]) {
            nums1[i] = nums1[x--] // decrease after loop
        } else {
            nums1[i] = nums2[y--] // decrease after loop
        }
    }
};

// Slightly Cleaner
