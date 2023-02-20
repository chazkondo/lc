function searchInsert(nums: number[], target: number): number {
    let l: number = 0 /* left */, r: number = nums.length - 1 /* right */
    while (l <= r) {
        const m = l + Math.floor((r - l) / 2) // mid
        if (nums[m] > target)
            r = m - 1
        else if (nums[m] < target)
            l = m + 1
        else if (nums[m] === target)
            return m
    }
    return l
};
