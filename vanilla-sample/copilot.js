// 자연수의 집합(set)과 자연수(bound)를 입력받아 아래의 조건을 만족하는 가장 큰 수를 리턴해야 합니다.
// - 집합의 요소를 최대 한번씩만 더해서 만들어야 한다.
// - `bound`를 넘지 않아야 한다.
// 조건을 만족하는 조합이 없는 경우, 0을 리턴해야 합니다.
const subsetSum = function (set, bound) {
  // 코드를 입력하세요.
  let biggest = -Infinity;
  const dfs = (sum, index) => {
    if (sum > bound) return ;
    biggest = biggest < sum? sum : biggest;
    if (index === set.length) return ;
    for( let i = index; i < set.length; i++) {
      dfs(sum + set[i], i + 1);
    }
  }

  set.sort( (a, b) => a - b );
  for( let i = 0; i < set.length; i++) {
    if( set[i] > bound ) set = set.slice(0, i);
  }
  
  dfs(0, 0);
  return biggest === -Infinity ? 0 : biggest;
};

let output = subsetSum([1, 8, 3, 15], 10);
console.log(output); // --> 9 (= 1 + 8)