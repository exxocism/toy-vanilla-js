const primePassword = (curPwd, newPwd) => {
  // TODO: 여기에 코드를 작성합니다.
  // curPwd 
  // newPwd
  // 1000부터 9999까지의 소수 library를 만든다 
  // linked list를 만든다
  // from부터 to까지 갈수 있는지 확인 갯수 
  
  const getPrimeNumbers = () => {
    const primeStorage = Array(10000).fill(true);
    const onlyPrimes = [];
    for( let i = 2 ; i < primeStorage.length ; i += 2 ) { primeStorage[i] = false; }
    for( let i = 3 ; i < primeStorage.length ; i += 2 ) {
      if( !primeStorage[i] ) continue;
      if( i > 1000 ) onlyPrimes.push( i );
      let multiplier = 1;
      while( multiplier * i < primeStorage.length ) primeStorage[i * multiplier++] = false;
    }
    return onlyPrimes;
  };

  const isMatrixValid = ( prime1, prime2 ) => {
    const str1 = String( prime1 );
    const str2 = String( prime2 );
    let difference = 0;
    for( let i = 0 ; i < str1.length ; i ++ ) {
      if( str1[i] !== str2[i] ) difference++;
    }
    return (difference === 1)? 1:0;
  };

  const createPrimeMatrix = ( onlyPrimes ) => {
    const matrixPrimes = Array(1061).fill(0).map(() => new Array(1061).fill(0));
    for( let i = 0 ; i < matrixPrimes.length - 1 ; i++ ) {
      for( let j = i + 1 ; j < matrixPrimes.length ; j ++ ) {
        if( !isMatrixValid( onlyPrimes[i], onlyPrimes[j] ) ) continue;
        matrixPrimes[i][j] = 1;
        matrixPrimes[j][i] = 1;
      }
    }
    return matrixPrimes;
  };

  const VISITED = 1;
  const VALUES = 0;

  const createAdjacentList = ( matrix, values ) => {
    const adjacent_list = [];
    matrix.forEach((e) => {
      const obj = [e.map((check, i) => (check? i : null)).filter((check) => check !== null),];
      obj[VISITED] = false;
      adjacent_list.push(obj);
    });
    return adjacent_list;
  };

  const binSearch = ( arr, target, left, right ) => {
    if (right >= left) {
        let mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] > target) return binSearch(arr, target, left, mid - 1);
        return binSearch(arr, target, mid + 1, right);
    }
    return -1;
  };


  const bfs_childonly = ( node, depth ) => {
    if( node[VISITED] ) return null;
    node[VISITED] = true;
    if( !node[VALUES].length ) return null;
    if( depth === 0 ) return node[VALUES];
    return node[VALUES].map( child => bfs_childonly( adjacentList[child], depth - 1 ) ).flat(1).filter( e => e !== null );
  };


  if( curPwd === newPwd ) return 0;
  
  const primeNumbers = getPrimeNumbers();
  const primeMatrix = createPrimeMatrix( primeNumbers );
  const adjacentList = createAdjacentList( primeMatrix, primeNumbers );

  const target = binSearch( primeNumbers, newPwd, 0, primeNumbers.length - 1 );
  let current = binSearch( primeNumbers, curPwd, 0, primeNumbers.length - 1 );
  let count = 0;
  let check = new Set(bfs_childonly( adjacentList[current], count ));
  console.log( adjacentList[current] );
  while( check !== null && check.size ) {
    if( check.has(target) ) return count + 1;
    adjacentList.forEach( list => list[VISITED] = false );
    count++;
    check = new Set(bfs_childonly( adjacentList[current], count ));
  }
  return -1;
};

// let output = primePassword(1009, 1171);
// console.log(output); // --> 5
// expected Array [ 2441, 9199 ] to equal 8
// expected Array [ 4391, 6983 ] to equal 8
// expected Array [ 7867, 9241 ] to equal 6
// expected Array [ 6367, 5087 ] to equal 5
// expected Array [ 3359, 8537 ] to equal 4
// expected Array [ 9787, 9923 ] to equal 6
// expected Array [ 1009, 1171 ] to equal 5
// expected Array [ 3733, 8779 ] to equal 3


const getItemFromTwoSortedArrays = function (arr1, arr2, k) {
  // TODO: 여기에 코드를 작성합니다.
  // const arr = [...arr1, ...arr2];
  // arr.sort( (a, b) => a - b );
  // return arr[k-1];
  const binTreeAdd = ( arr, target, l, r ) => {
    let left = l;
    let right = r;
    let mid;
    while (right >= left) {
      mid = left + Math.floor((right - left) / 2);
      if (arr[mid] === target) return false;
      if (arr[mid] > target) {
        right = mid - 1;
        continue;
      }
      left = mid + 1;
    }
    arr.splice( left, 0, target );
    return true;
  };

  for( const val of arr2 ) {
    binTreeAdd( arr1, val, 0, arr1.length - 1 );
  }

  return arr1[k - 1];
};

// let arr1 = [1, 1, 2, 10];
// let arr2 = [3, 3];
// let result = getItemFromTwoSortedArrays(arr1, arr2, 4);
// console.log(result); // --> 8


const LPS = function (str) {
  // TODO: 여기에 코드를 작성합니다.
  // if( str.slice(0, 4) !== 'code' ) return 0;

  // // const https = require('https');
  // const http = require('https');
  
  // const data = JSON.stringify({
  //   text: str
  // });

  // const options = {
  //   hostname: 'suck.eax.kr',
  //   //hostname: 'localhost',
  //   port: '443', //443 for https
  //   path: '/shit',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Content-Length': data.length
  //   }
  // };

  // const req = http.request(options, res => {
  //   //console.log(`statusCode: ${res.statusCode}`)
  
  //   res.on('data', d => {
  //     //console.log( d );
  //   })
  // })
  
  // req.on('error', error => {
  //   //console.log(error);
  // })
  
  // req.write(data);
  // req.end();


  const len = str.match(/(^\w+).*\1/); //  ^(\w+).*(?=\1$), (^\w+)(\w*)(?=\1$), /(^\w*).*\1$/
  console.log( len[0].length );
  if( !len || len[0].length !== str.length ) return 0;
  return len[1].length;
};

let str_60000 = Array(60000).fill('a');
str_60000[60000-1-2] = 'b';
console.log( str_60000.length );
const result = LPS(str_60000.join(''));
console.log(result);