/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const mark = Array(150000);
    for (let i of nums) {
        let j = i/8;
        let k = i%8;
        let check = 1<<k;
        if ((mark[j] & check) != 0) {
            return true;
        }
        mark[j] |= check;
    }
    return false;
    
};