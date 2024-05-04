function combinationSum2(candidates: number[], target: number): number[][] {
    const result = new Set<string>();
    const setToArr = (set: typeof result): number[][] => {
        const arr: number[][] = [];
        set.forEach((value) => arr.push(value.split(",").map((v) => Number(v))));
        return arr;
    };

    candidates.sort((a, b) => a - b);

    const dfs = (node: string[], idx: number, sum: number) => {
        if (sum > target) return sum;
        if (sum === target) return result.add(node.join(",")) && sum;

        for (let i = idx; i < candidates.length; i++) {
            const newNode = [...node, String(candidates[i])];
            if (dfs(newNode, i + 1, sum + candidates[i]) > target) return sum;
        }
    };

    dfs([], 0, 0);
    return setToArr(result);
}

const a = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
const b = 30;

console.log(combinationSum2(a, b));
