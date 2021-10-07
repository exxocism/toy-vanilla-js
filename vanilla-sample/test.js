

function fibonacci(n) {
  // TODO: 여기에 코드를 작성합니다.
  const fibo = (n, a = 0, b = 1) => {
    if (n == 0) return a;
    if (n == 1) return b;
    return fibo(n - 1, b, a + b);
  };
  return fibo(n);
}

const isSubsetOf = function (base, sample) {
  // TODO: 여기에 코드를 작성합니다.
  const shit = new Set(base);
  for (let i = 0; i < sample.length; i++)
    if (!shit.has(sample[i])) return false;
  return true;
};

const bubbleSort = function (arr) {
  // TODO: 여기에 코드를 작성합니다.
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        changed = true;
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }
  return arr;
};

function queuePrinter(bufferSize, capacities, documents) {
  // TODO: 여기에 코드를 작성합니다.

  const queue = Array(bufferSize).fill(null);
  const queueSum = () => {
    let sum = 0;
    for (let i = 0; i < bufferSize; i++) {
      if (queue[i]) sum += queue[i];
    }
    return sum;
  };

  const queueHasValue = () => {
    for( let i = 0 ; i < bufferSize ; i++ ) if( queue[i] ) return true;
    return false;
  };

  const queuelength = () => {
    let sum = 0;
    for( let i = 0 ; i < bufferSize ; i++ ) if( queue[i] ) sum++;
    return sum;
  };

  let second = 0;
  while ( documents.length ) {
    queue.shift();
    if ( queuelength() < bufferSize 
          && documents.length
          && queueSum() + documents[0] <= capacities ) {
            queue[bufferSize - 1] = documents.shift();
          }
    second++;
    // console.log(`zzsecond: ${second}, queue: ${queue}, documents: ${documents}`);
  }
  while( queueHasValue() ) {
    queue.shift();
    // console.log(`second: ${second}, queue: ${queue}, documents: ${documents}`);
    second++;
  }
  return second;
}

let tiling = function (n) {
  // TODO: 여기에 코드를 작성합니다.
  const stor = Array(n).fill(null);
  const ti = ( num ) => {
    if( num < 3 ) return num;
    if( stor[num] ) return stor[num];
    return stor[num] = ( ti(num - 1) + ti(num - 2) );
  };

  return ti(n);
};

function countWithVar () {

  //0에서 4까지 for loop을 돌면서
  let i = 4;
  // for (let i = 0; i < 5; i++) {

  //   //'1초 뒤 i를 출력하라'는 지시를 내린다.
  //   setTimeout(function () {

  //     //i를 출력
  //     console.log(i)
  //   }, 1000)
  // }
  {
    let i = 1;
    if( i < 5 ) {
      setTimeout(function () {
        //i를 출력
        console.log(i)
      }, 1000)
    }
  }
  {
    let i = 2;
    if( i < 5 ) {
      setTimeout(function () {
        //i를 출력
        console.log(i)
      }, 1000)
    }
  }
}
countWithVar();


let dfs = function (node) {
  // TODO: 여기에 코드를 작성합니다.
  let result = [node.value];
  if( node.hasOwnProperty('children') && node.children.length > 0 ) {
    for( let i = 0 ; i < node.children.length ; i ++ ) {
      result.push( ...dfs( node.children[i] ) );
    }
  }
  return result;
};

// 이 아래 코드는 변경하지 않아도 됩니다. 자유롭게 참고하세요.
let Node = function (value) {
  this.value = value;
  this.children = [];
};

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리입니다.
// membership check(중복 확인)를 따로 하지 않습니다.
Node.prototype.addChild = function (child) {
  this.children.push(child);
  return child;
};
