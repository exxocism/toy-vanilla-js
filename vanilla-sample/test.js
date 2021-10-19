const inequalityNumber = function (signs) {
  // TODO: 여기에 코드를 작성합니다.
  const number_info = [];
  let number_used = new Set();
  let biggestNumber = 0;
  let smallestNumber = 0;
  //assign Info
  const sign_processed = signs.replace(/\s/g,''); 
  for( let i = 0 ; i < sign_processed.length + 1 ; i ++ ) {
    const number_obj = {
      number: undefined,
      tried: [],
      available: []
    };
    number_info[i] = number_obj;
  }

  const getFinishedNumber = ( info ) => {
    return Number(info.reduce( (str, e) => { str += e.number; return str; }, ''));
  };

  const resetTriedRecords = ( idx ) => {
    for( let i = idx ; i < number_info.length ; i++ ){
      number_info[i].tried = [];
    }
  };

  const enumerateNextAvailablity = ( idx ) => {
    number_info[i].available = [];
    if( idx === 0 ) {
      if( sign_processed[0] === '>' ) {
        number_info[i].available = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      } else {
        number_info[i].available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      } 
      return;
    }
    const direction = sign_processed[ idx - 1 ];
    for( let i = 0 ; i < 10 ; i++ ) {
      if( number_used.has(i) ) continue;
      check = number_info[idx - 1].number;
      if( direction === '>' ) {
        if( check < i ) continue;
      } else {
        if( check > i ) continue;
      }
      number_info[idx].available.push(i);
    }
  };

  const fallBackToLastAvailableIndex = ( idx ) => {
    for( let i = idx - 1; i >= 0 ; i -- ) {      
      number_used.delete( number_info[i].number );
      if( !number_info[i].available.length ) continue;
      if( number_info[i].tried.length === number_info[i].available.length ) continue;
      return i;
    }
  };

  const FALLBACK_NEEDED = -1;
  const getNextAvailableNumber = ( idx, ascending ) => {
    const num_available = number_info[idx].available.length;
    if( !num_available ) return FALLBACK_NEEDED;
    if( num_available === number_info[idx].tried.length ) return FALLBACK_NEEDED;
    if( ascending ) {
      for( let i = 0 ; i < num_available ; i++ ) {
        const check = number_info[idx].available[i];
        if( number_info[idx].tried.includes( check ) ) continue;
        return check;
      }
    } else {
      for( let i = num_available - 1 ; i >= 0 ; i-- ) {
        const check = number_info[idx].available[i];
        if( number_info[idx].tried.includes( check ) ) continue;
        return check;
      }
    }
  };

  const getNextAvailableNumberByAscending = ( idx ) => {
    return getNextAvailableNumber( idx, true );
  };
  const getNextAvailableNumberByDescending = ( idx ) => {    
    return getNextAvailableNumber( idx, false );
  };

  //get by ascending
  let i = 0;
  while (i >= 0 && i < number_info.length ) {
    enumerateNextAvailablity(i);
    const numberSearched = getNextAvailableNumberByAscending(i);

    if (numberSearched === FALLBACK_NEEDED) {
      i = fallBackToLastAvailableIndex(i);
      resetTriedRecords(i + 1);
      continue;
    }

    number_info[i].number = numberSearched;
    number_info[i].tried.push(numberSearched);
    number_used.add(numberSearched);
    i++;
  }
  smallestNumber = getFinishedNumber( number_info );

  i = 0;
  resetTriedRecords(i);
  number_used = new Set();
  while (i >= 0 && i < number_info.length ) {
    enumerateNextAvailablity(i);
    const numberSearched = getNextAvailableNumberByDescending(i);

    if (numberSearched === FALLBACK_NEEDED) {
      i = fallBackToLastAvailableIndex(i);
      resetTriedRecords(i + 1);
      continue;
    }

    number_info[i].number = numberSearched;
    number_info[i].tried.push(numberSearched);
    number_used.add(numberSearched);
    i++;
  }

  biggestNumber = getFinishedNumber( number_info );

  //console.log(`smallestNumber: ${smallestNumber}, biggestNumber: ${biggestNumber}`);
  return biggestNumber - smallestNumber;
};

output = inequalityNumber('< > > <');
console.log(output); // --> 876 (897 - 021))

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

  let searchQueue = new Set();
  const bfs_childonly = ( node, depth ) => {
    if( !node[VALUES].length ) return ;
    if( depth === 0 ) {
      node[VALUES].forEach( e => searchQueue.add( e ) );
      return ;
    } 
    return node[VALUES].forEach( child => bfs_childonly( adjacentList[child], depth - 1 ) );
  };


  if( curPwd === newPwd ) return 0;
  
  const primeNumbers = getPrimeNumbers();
  const primeMatrix = createPrimeMatrix( primeNumbers );
  const adjacentList = createAdjacentList( primeMatrix, primeNumbers );

  const target = binSearch( primeNumbers, newPwd, 0, primeNumbers.length - 1 );
  let current = binSearch( primeNumbers, curPwd, 0, primeNumbers.length - 1 );
  let count = 0;
  bfs_childonly( adjacentList[current], count );
  while( searchQueue !== null && searchQueue.size ) {
    if( searchQueue.has(target) ) return count + 1;
    count++;
    searchQueue = new Set();
    bfs_childonly( adjacentList[current], count );
  }
  return -1;
};

const LPS = function (str) {
  // TODO: 여기에 코드를 작성합니다.
  let left = 0;
  let right = Math.ceil(str.length / 2);
  const len = str.length;
  while( right < len ) {
    if( str[left] !== str[right] ) { 
      left = 0;
      if( str[left] !== str[right] ) {
        right++;
        continue;
      }      
    }
    left++;
    right++;
  }
  return left;
  // const len = str.match(/(\w*).*\1/); //  ^(\w+).*(?=\1$), (^\w+)(\w*)(?=\1$), /(^\w*).*\1$/
  // if( !len || len[0].length !== str.length ) {
      // let left = 0;
      // let right = Math.ceil(str.length / 2);
      // const len = str.length;
      // while( right < len ) {
      //   if( str[left] !== str[right] ) { 
      //     left = 0;
      //     if( str[left] !== str[right] ) {
      //       right++;
      //       continue;
      //     }      
      //   }
      //   left++;
      //   right++;
      // }
      // return left;
  // }
  // return len[1].length;
};



const balancedBrackets = function (str) {
  // TODO: 여기에 코드를 작성합니다.
  const braces_info = [
    { start:'(', end:')', idx:[] },
    { start:'[', end:']', idx:[] },
    { start:'{', end:'}', idx:[] }
  ];
  
  let returnfalse = false;
  for( let i = 0 ; i < str.length ; i ++ ) {
    braces_info.forEach( brace => {
      if( str[i] === brace.start ) {
        brace.idx.push(i);
      }
      if( str[i] === brace.end ) {
        const lastidx = brace.idx.pop(i);
        if( lastidx === undefined ) {
          returnfalse = true;
          return ;
        } 
        const check = braces_info.every( br_comp => {
          if( br_comp.start === brace.start || !br_comp.idx.length ) return true;
          if( br_comp.idx[br_comp.idx.length - 1] > lastidx ) return false;
          return true;
        });
        if( !check ) {
          returnfalse = true;
          return ;
        }
      }
    })
  }
  if( returnfalse ) return false;

  return braces_info.every( brace => {
    if( brace.idx.length ) return false;
    return true;
  });
};


function mergeSort(array) {
  // Only change code below this line
  const merge = ( arr1, arr2 ) => {
    const newArray = [];
    while( arr1.length && arr2.length ) {
      if( arr1[0] < arr2[0] ) {
        newArray.push( arr1.shift() );
      } else {
        newArray.push( arr2.shift() );
      }
    }
    if( arr1.length ) newArray.push( ...arr1 );
    if( arr2.length ) newArray.push( ...arr2 );
    return newArray;
  };

  const mSort = ( array ) => {
    if( array.length === 1 ) return array;
    return merge( mSort( array.slice(0, array.length / 2) ), mSort( array.slice( array.length / 2, array.length ) ) );
  };

  return mSort(array);
  // Only change code above this line
}


const quickSort_codestates = function (arr, cb) {
  // TODO: 여기에 코드를 작성합니다.
  if( arr.length === 0 ) return [];
  if( arr.length === 1 ) return arr;
  //devide and conquer

  const pivot = arr.shift();
  const pivot_comparison = cb? cb(pivot):pivot;
  const leftArray = [];
  const center = [];
  const rightArray = [];
  for( let i = 0 ; i < arr.length ; i ++ ){
    if( cb ) {

      if( cb(arr[i]) < pivot_comparison ) leftArray.push( arr[i] );
      else if( cb(arr[i]) > pivot_comparison ) rightArray.push( arr[i] );
      else center.push( arr[i] );

    } else {
      if( arr[i] < pivot ) leftArray.push( arr[i] );
      else if( arr[i] > pivot ) rightArray.push( arr[i] );
      else center.push( arr[i] );
    }    
  }
  center.push( pivot );
  return [...quickSort(leftArray) ,...center, ...quickSort(rightArray)] ;
};


const rotatedArraySearch = function (rotated, target) {
  // TODO : 여기에 코드를 작성합니다.
  const binSearch = ( arr, target, l, r ) => {
    let left = l;
    let right = r;
    while (right >= left) {
        let mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] > target) {
          right = mid - 1;
          continue;
        }
        left = mid + 1;
    }
    return -1;
  };

  const findPivot = ( arr, low, high ) => {
    // base cases
    if (high < low) return -1;
    if (high == low) return low;
 
    let mid = Math.floor((low + high) / 2); /*low + (high - low)/2;*/
    if (mid < high && arr[mid] > arr[mid + 1])
        return mid;
    if (mid > low && arr[mid] < arr[mid - 1])
        return (mid - 1);
    if (arr[low] >= arr[mid])
        return findPivot(arr, low, mid - 1);
 
    return findPivot(arr, mid + 1, high);
  }
  
  const pivot = findPivot( rotated, 0, rotated.length - 1 );
  if (pivot == -1) return binSearch( rotated, target, 0, rotated.length - 1 );
  if (rotated[pivot] == target) return pivot;
  if (rotated[0] <= target) return binSearch(rotated, target, 0, pivot - 1);
  return binSearch(rotated, target, pivot + 1, rotated.length - 1);
};


function quickSort(array) {
  // Only change code below this line\
  if( array.length === 0 ) return [];
  if( array.length === 1 ) return array;
  //devide and conquer

  const pivot = array.shift();
  const leftArray = [];
  const center = [];
  const rightArray = [];
  for( let i = 0 ; i < array.length ; i ++ ){
    if( array[i] < pivot ) leftArray.push( array[i] );
    else if( array[i] > pivot ) rightArray.push( array[i] );
    else center.push( array[i] );
  }
  center.push( pivot );
  return [...quickSort(leftArray) ,...center, ...quickSort(rightArray)] ;
  // Only change code above this line
}

console.log(quickSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]));

const insertionSort = function (arr, callback) {
  // TODO: 여기에 코드를 작성합니다.
  for( let i = 1 ; i < arr.length ; i++) {
    let sort_index = i;
    for( let j = i - 1; j >= 0 ; j-- ) {
      if( callback ) {
        if( callback( arr[j] ) > callback( arr[sort_index] ) ) {
          [arr[j], arr[sort_index]] = [arr[sort_index], arr[j]];
          sort_index--;
        }
      } else {
        if( arr[j] > arr[sort_index] ) {
          [arr[j], arr[sort_index]] = [arr[sort_index], arr[j]];
          sort_index--;
        }
      }
    }
  }
  return arr;
};


let bfs = function (node) {
  // TODO: 여기에 코드를 작성합니다.
  const bfs_childonly = ( node, depth ) => {
    if( depth === 0 ) {
      return node.value;
    }
    if( node.children.length === 0 ) return null;
    return [ ...node.children.map( child => bfs_childonly( child, depth - 1 ) ).filter( e => e !== null ).flat(1) ];
  };

  let result = [node.value];
  let i = 1;
  let check = bfs_childonly(node, i);
  while( check !== null && check.length ) {
    result = result.concat( ...check );
    i++;
    check = bfs_childonly(node, i);
  }

  return result;
};


const powerSet = function (str) {
  // TODO: 여기에 코드를 작성합니다.
  const getCombinations = (array, selectNumber) => {
    const results = [];
    if (selectNumber === 1) {
      return array.map((element) => [element]);
    }
    array.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);
      const combinations = getCombinations(rest, selectNumber - 1);
      const attached = combinations.map((combination) => [
        fixed,
        ...combination,
      ]);
      results.push(...attached);
    });
    return results;
  };

  const arr_str = Array.from(str);
  const remove_duplicates = new Set( arr_str );
  const arr_filtered = [...remove_duplicates];

  let storage_combinations = [];
  for( let i = 1; i <= arr_filtered.length; i++ ) {
    storage_combinations.push( ...getCombinations( arr_filtered, i ).map( e => e.join('') ) );
  }
  
  // storage_combinations.sort( (a, b) => {
  //   const minimum_length = Math.min( a.length, b.length );
  //   for( let i = 0; i < minimum_length; i++ ){
  //     if( a[i] > b[i] ) return 1;
  //     if( a[i] < b[i] ) return -1;
  //   }
  //   if( a.length === b.length ) return 0;
  //   return (a.length >  b.length)? 1:-1;
  // });
  storage_combinations = storage_combinations.map( e => {
    const word_to_sort = Array.from( e );
    word_to_sort.sort();
    return word_to_sort.join('');
  });
  storage_combinations.sort();
  storage_combinations.unshift('');
  return storage_combinations;
  // console.dir( storage_combinations );

};


function barcode(len) {
  // TODO: 여기에 코드를 작성하세요.
  const barcode_info = Array(len).fill(null);

  for( let i = 0; i < len; i++ ) {
    const shit = {
      num: undefined,
      tried: []
    };
    barcode_info[i] = shit;
  }

  const BARCODE_SHOULD_FALL_BACK = -1;

  const getNextBarcode = (idx) => {
    for (let i = 1; i <= 3; i++) {
      if (
        !barcode_info[idx].hasOwnProperty('tried') ||
        !barcode_info[idx].tried.includes(i)
      )
        return i;
    }
    return BARCODE_SHOULD_FALL_BACK;
  };

  const getLastGoodBarcode = (idx) => {
    for (let i = idx; i >= 0; i--) {
      if (barcode_info[i].tried.length < 3) return i;
    }
  };

  const resetBarcodesAndTriedRecords = (idx) => {
    for (let i = idx; i < barcode_info.length; i++) {
      // if (barcode_info[i].hasOwnProperty("num")) delete barcode_info[i].num;
      if (barcode_info[i].hasOwnProperty("num")) barcode_info[i].num = undefined;
      if (barcode_info[i].hasOwnProperty("tried")) barcode_info[i].tried = [];
    }
  };

  const getBarcodeString = () => {
    let result = "";
    barcode_info.some((e) => {
      if (!e.hasOwnProperty("num") || !e.num ) return true;
      result += e.num;
    });
    return result;
  };

  const STRING_IS_VALID = -1;
  const hasStringDuplicatedNumber = (str) => {
    //const magicExp = /([0-9]+)\1/g;
    const magicExp = /([0-9]+)(?=\1)/g;
    const matchStr = str.match(magicExp);
    if (matchStr !== null ) {
      return str.lastIndexOf(matchStr);
    }
    return STRING_IS_VALID;
  };

  let i = 0;
  while (i >= 0 && i < len) {
    const barcodeSearched = getNextBarcode(i);

    if (barcodeSearched === BARCODE_SHOULD_FALL_BACK) {
      i = getLastGoodBarcode(i);
      resetBarcodesAndTriedRecords(i + 1);
      continue;
    }

    barcode_info[i].num = barcodeSearched;
    barcode_info[i].tried.push(barcodeSearched);

    const duplicatedSearch = hasStringDuplicatedNumber(getBarcodeString());
    if (duplicatedSearch !== STRING_IS_VALID) {
      i = getLastGoodBarcode(i);
      resetBarcodesAndTriedRecords(i + 1);
      continue;
    }
    i++;
  }
  return getBarcodeString();
}

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
