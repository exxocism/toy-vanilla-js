function firstMissingPositive(nums: number[]): number {
    for (let i = 0; i < nums.length; i++) if (nums[i] <= 0) nums.splice(i--, 1);
    for (let i = 0; i < nums.length; i++) {
        const ptr = Math.abs(nums[i]) - 1;
        if (ptr >= 0 && nums[ptr] > 0) nums[ptr] = -nums[ptr];
    }
    for (let i = 1; i <= nums.length; i++) if (nums[i - 1] > 0) return i;
    return nums.length + 1;
}

const input = [3, 4, -1, 1];
console.log(firstMissingPositive(input));
