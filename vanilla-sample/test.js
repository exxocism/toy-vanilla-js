const binarySearch = function (arr, target) {
  // TODO : 여기에 코드를 작성합니다.
  const binSearch = ( arr, target, left, right ) => {
    if (right >= left) {
        let mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] > target) return binSearch(arr, target, left, mid - 1);
        return binSearch(arr, target, mid + 1, right);
    }
    return -1;
  };

  return binSearch( arr, target, 0, arr.length - 1 );
};


function connectedVertices(edges) {
  // TODO: 여기에 코드를 작성합니다.
  const createMatrix = ( edges ) => {
    const matrix_size = Math.max(...edges.flat(Infinity)) + 1;
    const matrix = Array(matrix_size).fill(0).map( e => Array(matrix_size).fill(0) );
    edges.forEach( edge => {
      matrix[edge[0]][edge[1]] = 1;
      matrix[edge[1]][edge[0]] = 1;
    });
    return matrix;
  };
 
  const createAdjacentList = ( matrix ) => {
    const adjacent_list = [];
    matrix.forEach((e) => {
      const list = e.map((check, i) => (check? i : null)).filter((check) => check !== null);
      const obj = {};
      list.forEach( idx => {
          obj[String(idx)] = idx;
      });
      obj.visited = false;
      adjacent_list.push(obj);
    });
    return adjacent_list;
  };

  const isValueInGroups = ( current, check_to_visit ) => {
    for( let i = 0 ; i < groups.length ; i++ ){
      if( groups[i].has(current) || check_to_visit.some( node => groups[i].has(node) ) ) {
        return i;
      }
    }
    return -1;
  };

  const matrix = createMatrix( edges );
  const adjacent_list = createAdjacentList( matrix ); 

  const groups = [];
  for( let i = 0 ; i < adjacent_list.length ; i ++ ) {
    if( adjacent_list[i].visited ) continue;

    let current = i;
    while( !adjacent_list[current].visited ) {
      adjacent_list[current].visited = true;
      const check_to_visit = Object.values(adjacent_list[current]).filter( e => (typeof e === 'number' && !isNaN(e)) );
      const addidx = isValueInGroups( current, check_to_visit );
      if( addidx !== -1 ) {
        groups[addidx].add(current);
        check_to_visit.forEach( node => groups[addidx].add(node) );
      } else {
        const group_add = new Set();
        group_add.add(current);
        check_to_visit.forEach( node => group_add.add(node) );
        groups.push( group_add );
      }
      if ( check_to_visit.length ) current = Math.max( ...check_to_visit );
    }
  }

  // console.dir(adjacent_list);
  // console.dir(groups);
  return groups.length;
}

function getDirections(matrix, from, to) {
  // TODO: 여기에 코드를 작성합니다.
  const adjacent_list = [];
  matrix.forEach((e) => {
    const list = e.map((check, i) => (check ? i : 0)).filter((check) => check !== null);
    const obj = {};
    list.forEach( e => {
        obj[e] = e;
    });
    obj.visited = false;
    adjacent_list.push(obj);
  });

  let current = from;
  while( !adjacent_list[current].visited ) {
      if( Object.keys(adjacent_list[current]).includes(String(to)) ) return true;
      adjacent_list[current].visited = true;
      current = Math.max( ...Object.values(adjacent_list[current]).filter( (typeof e === 'number' && !isNaN(e)) ) );
  }
  return false;
}



const largestProductOfThree = function (arr) {
  // TODO: 여기에 코드를 작성합니다.
  const getCombinations = (array, selectNumber) => {
        const results = [];
        if(selectNumber === 1){
            return array.map((element) => [element]);
        }
        array.forEach((fixed, index, origin) => {
            const rest = origin.slice(index+1);
            const combinations = getCombinations(rest, selectNumber - 1);
            const attached = combinations.map((combination) => [fixed, ...combination]);
            results.push(...attached);
        });
        return results;
  }
  const check = getCombinations( arr, 3 );
  const max = check.reduce( ( max, e, i ) => {
    const test = e[0] * e[1] * e[2];
    if( max >= test && i > 0 ) return max;
    return test;
  }, 0);
  return max;
};




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

function devideNumber2(num) {
  console.log(num);
  console.log(parseInt(num,10));
  console.log(parseInt(num,8));
  console.log(num.toString(10));
  console.log(num.toString(8));
  //들어온 숫자가 정상인지 확인한다.
  let result = num;
  const str = num.toString();
  let checksum = 0;
  for( let i = 0 ; i < str.length - 1 ; i ++ ) {
    checksum += str[i];
  }
  if( str[str.length-1] != checksum % 10 ) {
    //체크섬 검증 실패 : 8진수를 10진수로 변환
    console.log('8진수 형태의 입력이 들어온 것 같습니다. 10진수로 변환합니다.');
    let str_converted = num.toString(8);
    //console.log(str_converted);
    //체크섬과 자리수를 떼어낸 뒤에 자릿수를 체크하여 없으면 붙여주기
    let 자릿수 = str_converted[str_converted.length - 2];
    str_converted = str_converted.slice(0,str_converted.length - 2);
    if( str_converted.length !== 자릿수 ) str_converted = '0' + str_converted;
    result = str_converted;
  } else {
    //정상적인 값이 들어왔으므로 뒤의 두 자리를 떼준다.
    result = Math.floor(num / 100);
  }

  console.log(result);
}

function devideNumber(num) {

  console.log( num );
  console.log( parseInt(num, 10) );
  console.log( Number.parseInt(num, 8) );
  console.log( num.toString(10) );
  console.log( num.toString(8) );

  return ;
  let result = num.toString(10);
  let isDecimal = false;

  //8진수인지 여부를 검사
  for( let i = 0 ; i < result.length ; i++ ) {
    if( result[i] >= 8 ) {
      isDecimal = true;
      break;
    }
  }

    

  if( !isDecimal || isNaN(parseInt(num, 8))) {
    //8진수가 들어온 것으로 가정하고 10진수로 변환
    console.log('8진수 숫자가 들어온 것 같습니다. 10진수로 변환합니다.')
    result = num.toString(8);
  }

  console.log(result);
}

function missHouseMeal(sideDishes) {
  sideDishes.sort();
  let result = [[]];  // 결과를 담을 배열, [] 반찬을 안먹는 경우도 있기때문에 빈배열을 디폴트로 넣어주었다.
  
  for (let i = 0; i < sideDishes.length; i++) {
    let len = result.length; // ?? 왜 필요한거지..??
    for (let j = 0; j < len; j++) { // 이렇게 쓰면 에러가 발생합니다.
      result.push([...result[j], sideDishes[i]]);  
    }
  }
  return result.sort();
}

//console.log(missHouseMeal( ["eggroll", "kimchi", "fishSoup"] ));


function power(base, exponent) {
  // todo: 여기에 코드를 작성합니다.
  if( exponent === 1 ) return base;
  
  let result = power(base, Math.floor(exponent / 2));
  result = (result * result) % 94906249;
  if( exponent % 2 ) result = (result * base) % 94906249;
  return result;
}
