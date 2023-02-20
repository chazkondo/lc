impl Solution {
    
    pub fn search_insert(nums: Vec<i32>, target: i32) -> i32 {
        if target < nums[0] { // edge case
		    return 0
	    }
        
	    let mut l:usize = 0;
	    let mut r:usize =  nums.len() - 1;

	    while l <= r {
		    let m = l + (r - l) / 2;
            
            if nums[m] < target {
			    l = m + 1;
		    } 
            else if nums[m] > target {
			    r = m - 1;
		    }
		    else if nums[m] == target {
			    return m as i32;
		    }
	    }

        l as i32
    }
}
