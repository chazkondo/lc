/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */

// January 18, 2024

// I read some of the description

// I understand that in order to go bottom-up,
// we should start at the base case. [I'm somewhat remembering]

// Upon reading the c++ code, it looks like
// We need to start at the last dice, and iterate backwards
// to 0
// Then in the first inner loop, iterate forward to the target
// And within the inner loop, keep a state of possible ways

// Finally, within the most inner loop, we iterate from 1 to the minimum of dice faces or target - j

// ^ but why?
// And how did we figure out the recurrence relation?

// Hmm, I'm not sure - I'm revisiting Clayton Wong's Art of Dynamic Programming post.
// He said that the base case(s) of the recurrence relation is added to the memo first

// In this solution, we're adding memo[n][target] = 1...
// I'm not really sure what that represents. 
// In the TD solution, if we used up all the dice AND
// currentSum is equal to target, then we return 1 to 
// represent a found solution

// Okay, so in building the 2d DP Array, we're saying that
// 1 does exist. And I suppose we iterate on base cases.

// Hmm... okay some pieces are connecting in my head now,
// but what if the target is beyond reach. like n = 1, k = 2,
// and target = 3

// In the above example, memo[1][3] would equal 1. 

// 0 0 0 0
// 0 0 0 1

// Okay, I can visualize the DP here. Let me continue reading Clayton's method.

// Okay I didn't get too much more. I think I'll just follow the algorithm pattern as it does relate to my TD solution

// We're just simply starting at the base case which is that we have found a way to the target.
// This means we'll start iterating on the second row.
// From here, we can just go from 0 to target on each index.

// So we iterate the first inner loop from 0 to 3 
// to represent the currentSum,
// then we iterate from 

var numRollsToTarget = function(n, x, target) {
    
    const memo = Array(n + 1).fill(Array(target + 1).fill(0))
    
    memo[n][target] = 1
    console.log(memo)
    
    // 0 0 0 0 0 0
};

