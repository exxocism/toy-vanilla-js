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

function orderOfPresentation (N, K) {
    // TODO: 여기에 코드를 작성합니다.
    const factorials = [1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600];

    let result = Array( factorials[N-1] ).fill( null );
    let idx = 0;
    const perm = ( size, array ) => {
        if( size === 1 ) return result[idx++] = array.join(''); //console.log( array );

        for( let i = 0 ; i < size ; i++ ) {
            perm( size-1, array );
            if( i < size - 1 ) {
                if( size % 2 ) [ array[0], array[size-1] ] =  [ array[size-1], array[0] ];
                else [ array[i], array[size-1] ] =  [ array[size-1], array[i] ];
            }
        }
    }
    
    const findidx = K.join('');
    perm( N, K );
    result.sort( (a, b) => a - b );
    return result.findIndex( e => e === findidx );
}


// let output = orderOfPresentation(3, [2, 3, 1]);
// console.log(output); // 3

// output = orderOfPresentation(5, [1, 3, 2, 4, 5])
// console.log(output); // 6

output = orderOfPresentation(12, [1, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12])
console.log(output); // 6