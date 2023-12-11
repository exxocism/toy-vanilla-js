function countAndSay(n: number): string {
  const calculate = (n: string) => {
    const numberArray = n.split('');
    let last = numberArray.pop();
    const result = [{ num: last, occurance: 1 }];
    while (numberArray.length) {
      const ptr = numberArray.pop();
      if (ptr !== last) {
        last = ptr;
        result.push({ num: last, occurance: 1 });
        continue;
      }
      result[result.length - 1].occurance++;
    }
    return result
      .reverse()
      .map(({ num, occurance }) => `${num}${occurance}`)
      .join('');
  };

  let result = '1';
  for (let i = 1; i < n; i++) result = calculate(result);
  return result.split('').reverse().join('');
}
