/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var threeSumClosest = function(nums, target) {
    
  if( nums.length === 3 ) {
      return nums[0]+nums[1]+nums[2];
  }

  //nums = nums.sort( (a, b) => a - b );
    
  let check = nums.shift();
  let least_difference = Math.abs((nums[0]+nums[1]+nums[2]) - target);
  let diff_offset = 0;
  while( nums.length > 1 ) {
    diff_offset = check - target;
    for( let i = 0 ; i < nums.length - 1 ; i++ ) {
      let minimum_idx = i + 1;
      for( let j = i + 1 ; j < nums.length ; j++ ) {
          const difference = Math.abs((nums[i] + nums[j]) + diff_offset);
          if( difference < least_difference ) {
            console.log(`1:${check} 2:${nums[i]} 3:${nums[j]} sum:${check+nums[i]+nums[j]} difference:${difference} `);
            least_difference = difference;  
          } 
      }
    }
    check = nums.shift();
  }
    
  return least_difference;
};

console.log(threeSumClosest([-1,2,1,-4], 1));
