// 88. Merge Sorted Array

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// Jan 16, 2024

/* first thought: two pointers */

// basically, if nums1[i] === 0, then we can just swap nums1[i] and nums2[j]
// AND increment i and j

// otherwise, if nums[i] <= nums[j] then we just increment i

// based on the criteria, we can also just loop until i is equal to m + n,
// since m + n represents all the numbers we must fit into nums1

var mergeFirstAttempt = function(nums1, m, nums2, n) {
    if (m === 0) nums1.map((num, i) => num = nums2[i])
    if (n === 0) return
    
    let i = 0, j = 0
    
    while (i < m + n) {
        if (nums1[i] === 0) {
            nums1[i] = nums2[j]
            i++
            j++
        }
        else if (nums1[i] <= nums2[j]) {
            i++
        } 
        else {
            const t = nums1[i]
            nums1[i] = nums2[j]
            nums2[j] = t
            i++
        }
    }
    
    // as per requirements, we do not need to return anything
};

// O(m + n) time 
// I believe O(1) space since we are swapping the integers in place.

/*  It turns out the answer above would not work because 
 *  I'd have to resort the nums2 array whenever I 
 *  swap.
 *  This would mean that, for each iteration (m + n), I 
 *  may have to do another iteration n, so the time complexity here
 *  would actually be (m + n)(n) = mn + n^2 = O(n^2) which is 
 *  quadtratic and less ideal than a m + n linear time complexity.
 */
 
 // Apparently, the trick here is to find the largest number, then reverse loop

// This ensures that the largest number in both arrays appear at the end of nums`.
// And while reversing, we will select the best and only biggest number in both
// arrays

var merge = function(nums1, m, nums2, n) {
    // we no longer need our base cases here
    // because our main logic will capture 
    
    // set i and j to m - 1 and n - 1 respectively
    let i = m - 1, j = n - 1
    
    let iterator = m + n - 1
    while (iterator >= 0) {
        if (i === -1) {
            nums1[iterator] = nums2[j]
            --j
            --iterator
            continue
        }
        if (j === -1) {
            nums2[iterator] = nums1[i]
            --i
            --iterator
            continue
        }
        if (nums1[i] > nums2[j]) {
            nums1[iterator] = nums1[i]
            --i
        } else {
            nums1[iterator] = nums2[j]
            --j
        }
        --iterator
    }
    
    // as per requirements, we do not need to return anything
};
    

// Messy code
// 1hr 16min

// TEST github push
