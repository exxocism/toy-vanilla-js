/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var nextPermutation = function(nums) {

  let idx1 = 0;
  let idx2 = 0;
  let N = nums.length;
  nums.unshift('');  
  for (let i = 1; i <= N; i++) {
    if (nums[i] < nums[i + 1]) {
      idx1 = i;
    }
  }

  if (!idx1) {
      nums.shift();
      nums.reverse();
      return ;
  }

  for (let i = N; i >= 1; i--) {
    if (nums[idx1] < nums[i]) {
      idx2 = i;
      break;
    }
  }

  [nums[idx1], nums[idx2]] = [nums[idx2],nums[idx1]];

  let tempArr = Array(N + 1).fill("");
  for (let i = idx1 + 1; i <= N; i++) {
    tempArr[i] = nums[i];
  }

  console.log( tempArr );
  for (let i = N; i >= idx1 + 1; i--) {
    nums[i] = tempArr[N - i + idx1 + 1];
  }
  nums.shift();
};

console.log(nextPermutation([1,3,2]));