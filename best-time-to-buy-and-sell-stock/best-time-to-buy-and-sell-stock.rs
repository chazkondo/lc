use std::cmp::max;
use std::cmp::min;

impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let b: i32 = 0; // best profit
        let m: i32 = prices[0];
        
        for x in &prices {
            let x2 = x - m;
            let b = max(b, x2);
            let m = min(m, x2);
        }
        
        return b;
    }
}
