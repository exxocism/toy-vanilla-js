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
