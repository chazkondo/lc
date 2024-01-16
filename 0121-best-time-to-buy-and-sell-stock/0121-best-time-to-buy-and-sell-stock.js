/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let min = prices[0]
    let b = 0
    
    for (let i = 1; i < prices.length; i++) {
        b = Math.max(b, prices[i] - min)
        min = Math.min(min, prices[i])
    }
    
    return b
};