function getParentIdx(idx) {
  // TODO: 여기에 코드를 작성합니다.
  if( idx < 3 ) return 0;
  return Math.floor((idx - 1) / 2);
  const getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x);
  };

  if( idx < 3 ) return 0;
  let base = Math.ceil(getBaseLog(2, idx + 2) - 1);
  if( base < 1 ) base = 0;
  const base_idx = 2 ** base - 1;
  const offset = Math.floor((idx - base_idx) / 2);
  const result = (2 ** (base - 1) - 1) + offset;
  // console.log(`idx = ${idx}, base=${base} base_idx = ${base_idx}, offset = ${offset}`);
  return result;
}

for( let i = 0 ; i < 64 ; i++ ) {
  console.log(`idx = ${i}, result = ${getParentIdx(i)}`);
}
