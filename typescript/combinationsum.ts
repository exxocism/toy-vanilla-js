function combinationSum(start: number[], target: number): number[][] {
    const binsearch = (num: number, from: number[], start: number, end: number): number => {
        const mid = Math.floor((start + end) / 2);
        if (from[mid] === num) return mid;
        if (start >= end) return -1;
        if (from[mid] < num) return binsearch(num, from, mid, end);
        return binsearch(num, from, start, mid);
    };

    const cutBiggerNumber = (candidatesToCut: number[], target: number) => {
        for (let i = candidatesToCut.length - 1; i >= 0 && candidatesToCut[i] > target; i--) {
            candidatesToCut.pop();
        }
        return candidatesToCut;
    };

    const result = [] as number[][];
    const candidates = cutBiggerNumber(start, target);

    const dfs = (node: number[], target: number, idx: number, sum: number) => {
        if (sum === target) return result.push(node) && target;
        if (sum > target) return sum;

        for (let i = idx; i < candidates.length; i++) {
            const newNode = [...node];
            newNode.push(candidates[i]);
            if (dfs(newNode, target, i, sum + candidates[i]) >= target) return sum;
        }
    };

    dfs([], target, 0, 0);
    console.log(result);
    return result;
}

const candidates = [2],
    target = 1;
const result = combinationSum(candidates, target);
