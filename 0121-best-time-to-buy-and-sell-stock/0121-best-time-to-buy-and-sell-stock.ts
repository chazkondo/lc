function maxProfit(prices: number[]): number {
    let min: number = prices[0]
    let b: number = 0
    
    for (let i = 0; i < prices.length; i++) {
        b = Math.max(b, prices[i] - min)
        min = Math.min(min, prices[i])
    }
    
    return b
};