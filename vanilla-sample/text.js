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

output = orderOfPresentation(12, [8,3,9,10,1,2,12,11,7,6,5,4]);
console.log(output); // 289095119
