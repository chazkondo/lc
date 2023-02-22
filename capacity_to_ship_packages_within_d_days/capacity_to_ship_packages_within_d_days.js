/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function(weights, D) {
    function canShip(c) { // c = capacity
        let daysNeeded = 1
        let curWeights = 0

        for (const w of weights) {
            curWeights += w

            if (curWeights > c) {
                daysNeeded += 1
                curWeights = w
            }
        }

        return daysNeeded <= D
    }

    let left = Math.max(...weights)
    let right = weights.reduce((a, b) => a + b)

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2)

        if (canShip(mid))
            right = mid - 1
        else
            left = mid + 1
    }
    
    return left
};
