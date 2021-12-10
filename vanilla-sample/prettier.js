let ram = Array(weight + 1).fill(0);
items = items.filter((c) => c[0] <= weight);
items.forEach(([e, h]) => {
    const a = Array(weight + 1).fill(0);
    for (let c = 1; c <= weight; c++)
        (a[c] = ram[c]),
        0 <= c - e &&
            ram[c - e] + h > ram[c] &&
            (a[c] = ram[c - e] + h),
        ram[c - 1] > ram[c] && (a[c] = ram[c - 1]);
    ram = a;
});
return ram[weight];
