function missHouseMeal(sideDishes) {
  // TODO: 여기에 코드를 작성합니다.
  const result = [];

  const dfs = (selected, depthCurrent, depthRequired, currentIndex) => {
    if ( depthCurrent === depthRequired ) {
      //sort the array in lexical order 
      const selectedCopy = [...selected];
      selectedCopy.sort();
      return result.push( [...selectedCopy] );
    }

    for ( let i = currentIndex; i < sideDishes.length; i++ ) {
      selected.add( sideDishes[i] );    
      dfs( selected, depthCurrent + 1, depthRequired, i+1 );
      selected.delete( sideDishes[i]);
    }
  }

  for( let i = 1 ; i <= sideDishes.length; i++ ) {
    dfs( new Set(), 0, i, 0 );
  }
  
  result.sort( (a, b) => {
    for( let i = 0 ; i < a.length; i++ ) {

      if( !a[i] && b[i] ) return -1;
      if( !b[i] && a[i] ) return 1;

      if ( a[i] < b[i] ) return -1;
      if ( a[i] > b[i] ) return 1;

    }
  });
  result.unshift([]);
  return result;
}


function HA3_test3(board, operation) {
  // TODO: 여기에 코드를 작성하세요.
  let score = 0;
  const X = 0;
  const Y = 1;
  const currentCoord = [0,0];
  const operationArr = Array.from(operation);
  
  const move = ( destX, destY ) => {
    if( destX < 0 || destX >= board.length || destY < 0 || destY >= board[0].length ) return ;
    currentCoord[X] = destX;
    currentCoord[Y] = destY;
    score += board[destX][destY];
    board[destX][destY] = 0;
  }

  while( operationArr?.length ) {
    let [destX, destY] =  currentCoord;
    switch( operationArr.shift() ) {
      case 'U': 
        destX--; 
        break;
      case 'D':
        destX++;
        break;
      case 'L':
        destY--;
        break;
      case 'R':
        destY++;
        break;
    }
    move( destX, destY ); 
  }

  return score;
};

const board2 = [
  [567, 6734, 132],
  [789, 243, 6],
  [89, 33333, 0]
]
const output2 = test3(board2, 'UUUDD');
console.log(output2); // 878


function HA3_test2 (n, m) {
  // TODO: 여기에 코드를 작성하세요.
  const arrayNumber = Array.from({length: n}, (_, index) => ++index );
  const len = arrayNumber.length;
  const chosen = new Array(m).fill(null);
  const check = new Array(len).fill(false);
  const result = [];

  const chooseNumber = ( idx ) => {
    if( idx === m ) return result.push( Number([...chosen].join('')) );
    else {
      for (let i = 0; i < len ; i++) {
        if ( !check[i] ) {
          check[i] = !check[i];
          chosen[ idx ] = arrayNumber[i];
          chooseNumber( idx + 1 );
          check[i] = !check[i];
        }
      }
    }
  };
  chooseNumber(0);
  return result;
};




function HA3_test1(A, B) {
  // TODO: 여기에 코드를 작성하세요.

  const checkDivisior = (A, B) => {
    let divisor = 0;
    for(let i = 1; i <= A; i++){
      if(A % i === 0 && B % i === 0){
        divisor = i;
      }
    }
    return divisor;
  };

  return checkDivisior(A, B);
}


// 가로 20, 세로 8이 주어졌을 때, 최대 4의 길이를 가진 정사각형 타일을 가질 수 있습니다.
const output1 = test1(20, 8);
console.log(output1); // --> 4

const countIslands = function (grid) {
  // TODO: 여기에 코드를 작성합니다.
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;

  const checkMap = ( row, col ) => {
    const coords = [
      [row - 1, col], //left
      [row + 1, col], //right
      [row, col - 1],
      [row, col + 1] //down
    ];
    
    coords.forEach( ([r, c]) => {
      if( r < 0 || r >= MAX_ROW || c < 0 || c >= MAX_COL ) return ;
      if( grid[r][c] === '1' ) {
        grid[r][c] = '2';
        checkMap( r, c );
      }
    });
    grid[row][col] = 2;
  };

  let count = 0;
  for( let i = 0 ; i < MAX_ROW ; i ++ ) {
    for( let j = 0 ; j < MAX_COL ; j ++ ) {
      if( grid[i][j] === '1' ) {
        count++;
        checkMap( i, j );
      }
    }
  }

  return count;
};

function queuePrinter(bufferSize, capacities, documents) {
  // TODO: 여기에 코드를 작성합니다.
  // num_buffersize = 2, capacities = 10, [,,,], second = 8
  // buffersize = [,]
  // 7, 4, 5, 6

  //buffer에 빈 값을 채워준다 (1칸씩 옮기는 활동을 할 수 있게 하기 위함)
  const buffer = Array(bufferSize).fill(null);

  //버퍼가 비어 있는지 확인해주는 함수
  const isBufferEmpty = () => {
    for( let i = 0 ; i < bufferSize ; i++ ) {
      if( buffer[i] ) return false;
    }
    return true;
  };

  //버퍼의 크기를 확인해주는 함수
  const getCurrentBufferSize = () => {
    let sum = 0;
    for( let i = 0 ; i < bufferSize ; i++ ) {
      if( buffer[i] || !isNaN(Number(buffer[i])) ) sum += buffer[i];
    }
    return sum;
  };

  //버퍼의 마지막 부분에 documents의 맨 앞부분 값을 떼어 넣어 준다.
  buffer[bufferSize - 1] = documents.shift();
  //최초 1초의 활동을 하였으므로 값을 추가해준다.
  let second = 1;

  //documents가 비어있지 않거나, 버퍼에 값이 있는 경우 계속해서 작업을 해 준다.
  // == document와 버퍼가 텅 빌 때까지 작업을 계속 해 준다.
  while( documents.length || !isBufferEmpty() ) {

    //버퍼의 앞부분을 떼서 출력한다.
    buffer.shift();

    //버퍼에 들어있는 자료의 합(현재 크기)에 documents의 맨 앞부분을 더해도  capacities를 초과하지 않는 경우
    if( getCurrentBufferSize() + documents[0] <= capacities ) {
      //버퍼의 마지막 부분에 documents의 앞부분을 떼어 붙여준다.
      buffer[bufferSize - 1] = documents.shift();
    } else {
      //버퍼가 가득 차서 더이상 값을 넣어줄 수가 없다. 버퍼의 마지막 부분에 null을 넣어 준다.
      buffer[bufferSize - 1] = null;
    }

    //1초의 활동을 다 하였으므로 1초를 더해준다.
    second++;
  }

  //while루프가 끝난 뒤 결과를 출력한다.
  return second;
}

// function permutation(arr, selectNum) {
//     let result = [];
//     if (selectNum === 1) return arr.map((v) => [v]);

//     arr.forEach((v, idx, arr) => {
//       const fixer = v;
//       const restArr = arr.filter((_, index) => index !== idx);
//       const permuationArr = permutation(restArr, selectNum - 1);
//       const combineFixer = permuationArr.map((v) => [fixer, ...v]);
//       result.push(...combineFixer);
//     });
//     return result;
// }

//console.log( permutation( [1,2,3], 3) );

// const perm = ( array ) => {
//     let result = [];
//     const permute = ( arr, m = [] ) => {
//         if( arr.length === 0 ) result.push ( m );
//         else {
//             for( let i = 0 ; i < arr.length ; i++ ) {
//                 let curr = arr.slice();
//                 let next = curr.splice(i , 1);
//                 permute( curr.slice(), m.concat(next) );
//             }
//         }
//     };
//     permute( array );
//     return result;
// };

// const findidx = K.join('');
// const permutations = perm( K ).map( e => e.join('') );
// permutations.sort( (a, b) => a - b );
// return permutations.findIndex( e => e === findidx );
// 'use strict'
function orderOfPresentation2(N, K) {
  // TODO: 여기에 코드를 작성합니다.
  const factorials = [
    1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600,
  ];

  let result = Array(factorials[N - 1]).fill(null);
  let idx = 0;
  const perm = (size, array) => {
    if (size === 1) return (result[idx++] = array.join("")); //console.log( array );

    for (let i = 0; i < size; i++) {
      perm(size - 1, array);
      if (i < size - 1) {
        if (size % 2) [array[0], array[size - 1]] = [array[size - 1], array[0]];
        else [array[i], array[size - 1]] = [array[size - 1], array[i]];
      }
    }
  };

  const findidx = K.join("");
  perm(N, K);
  result.sort((a, b) => a - b);
  return result.findIndex((e) => e === findidx);
}

function orderOfPresentation(N, K) {
  let permutation = Array(N + 1).fill("");

  const next_permutation = () => {
    let idx1 = 0;
    let idx2 = 0;
    for (let i = 1; i <= N; i++) {
      if (permutation[i] < permutation[i + 1]) {
        idx1 = i;
      }
    }

    if (!idx1) return false;

    for (let i = N; i >= 1; i--) {
      if (permutation[idx1] < permutation[i]) {
        idx2 = i;
        break;
      }
    }

    [permutation[idx1], permutation[idx2]] = [
      permutation[idx2],
      permutation[idx1],
    ];

    let tempArr = Array(N + 1).fill("");
    for (let i = idx1 + 1; i <= N; i++) {
      tempArr[i] = permutation[i];
    }
    for (let i = N; i >= idx1 + 1; i--) {
      permutation[i] = tempArr[N - i + idx1 + 1];
    }

    return true;
  };

  const checkArray = (arr_perm, arr2) => {
    for (let i = 1; i <= N; i++) {
      if (arr_perm[i] !== arr2[i - 1]) return false;
    }
    return true;
  };

  for (let i = 1; i <= N; i++) {
    permutation[i] = i;
  }

  let count = 0;
  if (checkArray(permutation, K)) return count;

  while (next_permutation()) {
    count++;
    if (checkArray(permutation, K)) return count;
  }
}

// let output = orderOfPresentation(3, [2, 3, 1]);
// console.log(output); // 3

// output = orderOfPresentation(5, [1, 3, 2, 4, 5])
// console.log(output); // 6
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
