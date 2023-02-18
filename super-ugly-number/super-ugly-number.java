class Solution {
    public int nthSuperUglyNumber(int n, int[] primes) {
        PriorityQueue<int[]> heap = new PriorityQueue<> ((a, b) -> (a[0] - b[0]));


        /* ** 
         * The two functions come from two different interfaces that PriorityQueue implements:

         * add() comes from Collection.
         * offer() comes from Queue.
         * For a capacity-constrained queue, the difference is that add() always returns 
         * and throws an exception if it can't add the element, whereas offer() is allowed
         * to  return false if it can't add the element.
         *
         *
         */
        for (int i = 0; i < primes.length; i++) // push primes into heap
            heap.offer(new int[] { primes[i], primes[i], 0 });

        int[] nums = new int[n + 1];
        nums[0] = 1;
        
        int i = 1;
        while (i < n) {
            int[] pop = heap.poll();
            int num = pop[0], prime = pop[1], index = pop[2];
			// remove duplicate
            if (num != nums[i - 1]) {
                nums[i] = num;
                i++;
            }
            heap.offer(new int[] { prime * nums[index + 1], prime, index + 1});
        }
        return nums[n - 1];
    }
}

// ref: https://stackoverflow.com/questions/15591431/difference-between-offer-and-add-in-priority-queue-in-java
