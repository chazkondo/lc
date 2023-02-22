class Solution:
    def shipWithinDays(self, weights: List[int], D: int) -> int:
        def canShip(c): # c = capacity
            days_needed = 1
            cur_weights = 0
            
            for w in weights:
                cur_weights += w
                
                if cur_weights > c:
                    days_needed += 1
                    cur_weights = w
                    
            return days_needed <= D
    
        left = max(weights)
        right = sum(weights)
        
        while left <= right:
            mid = left + (right - left) // 2
            
            if canShip(mid):
                right = mid - 1
            else:
                left = mid + 1
        
        return left
