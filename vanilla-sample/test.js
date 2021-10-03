function fibonacci(n) {
  // TODO: 여기에 코드를 작성합니다.
  const fibo = (n, a = 0, b = 1) => {
    if (n == 0) return a;
    if (n == 1) return b;
    return fibo(n - 1, b, a + b);
  }
  return fibo(n);
}

const isSubsetOf = function (base, sample) {
  // TODO: 여기에 코드를 작성합니다.
  const shit = new Set(base);
  for( let i = 0 ; i < sample.length ; i++ )
    if( !shit.has(sample[i]) ) return false;
  return true;
};

const bubbleSort = function (arr) {
  // TODO: 여기에 코드를 작성합니다.
  let changed = true;
  while( changed ) {
    changed = false;
    for( let i = 0 ; i < arr.length - 1 ; i++ ) {
      if( arr[i] > arr[i+1] ) {
        changed = true;
        [ arr[i], arr[i+1] ] = [ arr[i+1], arr[i] ];
      }
    } 
  }
  return arr;
};
