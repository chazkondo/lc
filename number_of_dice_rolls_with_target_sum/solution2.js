/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */

// January 17, 2024

/*  Very rusty - 
 *  First thought: simulate all the dice throws
 *  Time complexity would be n * k? This doesn't seem right.
 *  
 *  We would need to simulate each dice roll.
 *  When it's the base case, it's easy to see:
 *  We would go ahead and use one loop to simulate one dice
 *  If it's two die/dice (plural?) however, then we would need two loops
 *  It seems that, seemingly following this pattern, that we will have one loop per dice
 *  To keep track of each dice state
 *
 *  Maybe we can prove this thought by testing up to three
 *
 */
var numRollsToTargetTest = function(n, x, target) {
    let total = 0
    for (let i = 1; i < x + 1; i++) {
        for (let j = 1; j < x + 1; j++) {
            for (let k = 1; k < x + 1; k++) {
                if (i + j + k === target) total++
            }
        }
    }
    return total
};

// This worked; Caveat is that we must start our loop at 1 since
// the lowest dice side would be 1

// There is likely a way to do this with tabulation but I'm not very convinced
// that I can come up with a solution intuitively. I feel like it's better to
// take what I have and imagine a Top-Down solution first.

/*  Top Down solution:
 *  A Top Down solution would likely stem from the first dice roll
 *  Depending on what the first dice roll, we would again have the 1-k options available to us
 *  From here, we can try to figure out how many tree pathways end at our target
 *  We can somewhat optimize here by ending tree pathways early if it is over the target
 *  And since we'll have to roll each dice, we can probably terminate if the current total
 *  is equal or greater to the target but not yet at the bottom layer 
 *  (meaning we haven't bottomed out on the tree or used up all our dice)
 */

/*  TD Strategy:
 *  I suppose the TD Strategy (as I remember we probably want to use a helper function here)
 *  would encapsulate the three variables: 
 *      1. current dice roll (the state of our dice roll)
 *      2. number of dice we have (determines further layers to go down) [a.k.a. "n" from prompt]
 *      3. current total (determines the state of the total)
 *      4. maybe: target (we can keep this in a parent function or just add it as an arg)
 *
 *  "k" or number of sides, would need to be included as an iterative process.
 *  I had a thought that I could include a for-loop at the top level, but actually...
 *  each level down would need to incorporate a loop.
 *  
 *  This would mean that "k" or "1..k" would need to be included in the arguments of our 
 *  recursive function. 
 *      5. number of each side, 1..k (this loop ensures we try all 1..k possibilities)
 *
 *  With that being said, what would actually be the logic here?
 
 *  Logic process:
 *  At the beginning of each recursive function, we can write a base case.
 *  If we scope the recursion function inside our parent function, we can pass less state
 *  to our recursive function - which may be a little more elegant, assuming our parent function
 *  will always handle these types of problems. Let's assume we are scoping in this manner.
 *
 *  Our recursive function now only needs to include current dice we are on -
 *      Let's call this: currentDiceRoll
 *  If currentDiceRoll is equal to n, let's rename this to numberOfDice,
 *  then, we can compare our currentTotal with target.
 *
 *  If our base case is not hit, then we are still continuing on with the roll process.
 *  In which case, we need to explore every possibility.
 *
 *  In order to explore every possibility, we'll need to iterate from 1 to k.
 *  Remember, 1 to k represents the number on each side of the dice. We have to keep track
 *  of these numbers to determine, once we have rolled all the dice, if we have landed at the target.
 *      Lets rename k to diceNum. It is the number we have landed on for that particular dice.
 *  As a small caveat here. Similar in our first attempt, we'll have to make sure our loop is 
 *  inclusive of the highest diceNum.
 *
 *

 */

// TD 
var numRollsToTarget = function(numberOfDice, diceNum, target) {

    const memo = {}
    // recursion function that will call itself
    // while keeping its own state of total
    
    // returns a 1 or 0 to represent another dice combination that adds to target
    
    function roll(currentDiceRoll, currentTotal) { 
        const key = `${currentDiceRoll} ${currentTotal}`
        if (key in memo) return memo[key]
        
        let solutions = 0
            
        // returns 1 if we found a match, otherwise return 0
        if (currentDiceRoll === numberOfDice) { // we have used all the dice [ BASE CASE ]
            if (currentTotal === target) return 1 // match found
            return 0 // match not found
        }
        
        for (let i = 1; i < diceNum + 1; i++) {
            solutions += roll(currentDiceRoll + 1, currentTotal + i)
        }
        
        memo[key] = solutions % (10 ** 9 + 7)
        return solutions % (10 ** 9 + 7)
    }
    
    let ans = 0
    for (let i = 1; i < diceNum + 1; i++) {
        ans += roll(1, i)
    }
    return ans % (10 ** 9 + 7)
};
