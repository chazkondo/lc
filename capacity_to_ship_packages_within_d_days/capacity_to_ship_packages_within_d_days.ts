function shipWithinDays(weights: number[], D: number): number {
    function canShip(c): boolean { // c = capacity
        let daysNeeded: number = 1
        let curWeights: number = 0

        for (const w of weights) {
            curWeights += w

            if (curWeights > c) {
                daysNeeded += 1
                curWeights = w
            }
        }

        return daysNeeded <= D
    }

    let left: number = Math.max(...weights)
    let right: number = weights.reduce((a, b) => a + b)

    while (left <= right) {
        const mid: number = left + Math.floor((right - left) / 2)

        if (canShip(mid))
            right = mid - 1
        else
            left = mid + 1
    }
    
    return left
};
