function findAbbreviation(strA, strB) {
  // TODO: 여기에 코드를 작성합니다.
  const str_Uppercase = strA.toUpperCase();
  const strA_only_Uppercase = strA.replace(/[^A-Z]/g, "");

  const strA_only_Uppercase_truncated = strA_only_Uppercase.replace(/(.)(?=.*\1)/gi, "");
  const strA_truncated = Array.from(str_Uppercase.replace(/(.)(?=.*\1)/gi, "")).sort();
  const strB_truncated = Array.from(strB.replace(/(.)(?=.*\1)/gi, "")).sort();
  
  if( strA_only_Uppercase.length > strB.length ) return false;
  for( let i = 0; i < strA_only_Uppercase_truncated.length; i++ ) {
    if( !strB.includes (strA_only_Uppercase_truncated[i]) ) return false;
  }

  if( strB_truncated.length > strA_truncated.length ) return false;
  let stored = 0, i, j;
  for( i = 0 ; i < strB_truncated.length ; i++ ) {
    for( j = stored; j < strA_truncated.length ; j++ ) {
      if( strB_truncated[i] < strA_truncated[j] ) return false;
      else if( strB_truncated[i] === strA_truncated[j] ) {
        stored = j;
        break;
      }
    }
    if( stored !== j ) return false;
  }

  return true;
}


function test3(N, M) {

  let result = [];
  let combinations = [];

  const combinationUtil = (arr,data,start,end,index,r) => {
    if(index == r) {
      const temp = [];
      for (let j=0; j<r; j++) temp.push( data[j] );
      combinations.push(temp);
    }
      
    for(let i=start; i<=end && end-i+1 >= r-index; i++){
      data[index] = arr[i];
      combinationUtil(arr, data, i+1, end, index+1, r);
    }
  }

  const nextPermutation = (nums) => {

    let idx1 = 0;
    let idx2 = 0;
    let N = nums.length;
    nums.unshift('');    
    for (let i = 1; i <= N; i++) {
      if (nums[i] < nums[i + 1]) {
        idx1 = i;
      }
    }

    if (!idx1) return false;

    for (let i = N; i >= 1; i--) {
      if (nums[idx1] < nums[i]) {
        idx2 = i;
        break;
      }
    }

    [nums[idx1], nums[idx2]] = [nums[idx2],nums[idx1]];

    let tempArr = Array(N + 1).fill("");
    for (let i = idx1 + 1; i <= N; i++) {
      tempArr[i] = nums[i];
    }
    for (let i = N; i >= idx1 + 1; i--) {
      nums[i] = tempArr[N - i + idx1 + 1];
    }
    nums.shift();
    return true;
  }

  const arr = [];
  for (let i=1; i<=N; i++) arr.push(i);
  let data = new Array(M);
  combinationUtil(arr, data, 0, arr.length-1, 0, M);

  combinations.forEach(combination => {
    result.push(Number(combination.join('')));
    while( nextPermutation(combination) ) {
      result.push(Number(combination.join('')));
    }
  });

  return result;
}

function test2(N, M) {
  
  const arr = Array.from({length: N}, (v, i) => i+1);
  const tmp = Array(M);
  const check = Array(arr.length).fill(false);
  const result = [];

  function dfs(L) {
    if(L === M) {
      const num = Number([...tmp].join(''));
      result.push(num)
    }else{
      for (let i = 0; i < arr.length; i++) {
        if (check[i] === false) {
          check[i] = true;
          tmp[L] = arr[i];
          dfs(L + 1);
          check[i] = false;
        }
      }
    }
  }
  dfs(0);
  return result;
}


console.log(test2(10, 10));

const coinChange = function (total, coins) {
  const dp = Array(total + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= total; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }

  return dp[total];
};


let longestPalindrome = function (str) {
  // TODO: 여기에 코드를 작성합니다.
  const getPalindrome = (s, left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return s.slice(left + 1, right);
  }

  let longest = '';
  for (let i = 0; i < str.length; i++) {
    let odd = getPalindrome(str, i, i);
    let even = getPalindrome(str, i, i + 1);
    let longestPalindrome = odd.length > even.length ? odd : even;
    longest = longestPalindrome.length > longest.length ? longestPalindrome : longest;
  }
  return longest.length;
};

const closestPairOfPoints = function (points) {
  // TODO: 여기에 코드를 작성합니다.
  const closestPair = {
    distance: Infinity,
    points: []
  };
  for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
          const distance = calculateDistance(points[i], points[j]);
          if (distance < closestPair.distance) {
              closestPair.distance = distance;
              closestPair.points = [points[i], points[j]];
          }
      }
  }
  return Math.round(calculateDistance( closestPair.points[0], closestPair.points[1] ) * 100);
};

const uglyNumbers = function (n) {
  // TODO: 여기에 코드를 작성합니다.
  const ugly = [1];
  let i2 = 0, i3 = 0, i5 = 0;
  for (let i = 1; i < n; i++) {
      let m2 = ugly[i2] * 2, m3 = ugly[i3] * 3, m5 = ugly[i5] * 5;
      const min = Math.min(m2, m3, m5);
      if (min == m2) i2++;
      if (min == m3) i3++;
      if (min == m5) i5++;
      ugly.push(min);
  }
  return ugly[n - 1];
};


const LIS = function (arr) {
  let n = arr.length;
  let dp = new Array(n);
  let max = 0;
  for (let i = 0; i < n; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1;
      }
    }
    if (max < dp[i]) max = dp[i];
  }
  return max;
};


const LCS = function (str1, str2) {
  const m = str1.length;
  const n = str2.length;
  let result = new Array(m + 1);
  for (let i = 0; i <= m; i++) result[i] = new Array(n + 1);
  for (let i = 0; i <= m; i++) result[i][0] = 0;
  for (let j = 0; j <= n; j++) result[0][j] = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
        result[i][j] = result[i - 1][j - 1] + 1;
      } else {
        result[i][j] = Math.max(result[i - 1][j], result[i][j - 1]);
      }
    }
  }
  return result[m][n];
};

const largestRectangularArea = function (histogram) {
  // TODO: 여기에 코드를 작성합니다.
  const getMaxArea = ( hist, n ) => {
      // Create an empty stack. The stack holds indexes of hist[] array
      // The bars stored in stack are always in increasing order of their heights.
      const s = [];
      Array.prototype.peek = function(){ return this[this.length-1]; }
  
      let max_area = 0; // Initialize max area
      let tp; // To store top of stack
      let area_with_top; // To store area with top bar as the smallest bar
  
      // Run through all bars of given histogram
      let i = 0;
      while (i < n) {
          // If this bar is higher than the  bar on top stack, push it to stack
          if (s.length === 0 || hist[s.peek()] <= hist[i]) s.push(i++);
  
          // If this bar is lower than top of stack, then calculate area of rectangle with
          // stack top as the smallest (or minimum height) bar. 'i' is 'right index' for
          // the top and element before top in stack is 'left index'
          else {
              tp = s.peek(); // store the top index
              s.pop(); // pop the top
  
              // Calculate the area with hist[tp] stack as smallest bar
              area_with_top = hist[tp] *
                            (s.length === 0 ? i : i - s.peek() - 1);
  
              // update max area, if needed
              if (max_area < area_with_top) max_area = area_with_top;
          }
      }
  
      // Now pop the remaining bars from stack and calculate area with every
      // popped bar as the smallest bar
      while (s.length > 0) {
          tp = s.peek();
          s.pop();
          area_with_top = hist[tp] *
                        (s.length == 0 ? i : i - s.peek() - 1);
  
          if (max_area < area_with_top) max_area = area_with_top;
      }

      return max_area; 
  }

  return getMaxArea( histogram, histogram.length );
};


// 아래 코드는 수정하지 마세요.
function swap(idx1, idx2, arr) {
  // 두 변수를 바꾸는 방법

  // 1) 임시 변수를 활용한 방법
  // let temp = arr[idx1];
  // arr[idx1] = arr[idx2];
  // arr[idx2] = temp;

  // 2) Destructuring assignment를 활용한 방법
  // arr이 reference type이라 가능
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];

  // 3) XOR 연산을 활용한 방법
  // arr이 reference type이라 가능
  // arr[idx1] ^= arr[idx2];
  // arr[idx2] ^= arr[idx1];
  // arr[idx1] ^= arr[idx2];
}

function getParentIdx(idx) {
  // TODO: 여기에 코드를 작성합니다.
  if( idx < 3 ) return 0;
  return Math.floor((idx - 1) / 2);
}

function insert(heap, item) {
  // TODO: 여기에 코드를 작성합니다.
  const sortIter = ( index ) => {
    if( !index ) return;
    const parent_idx = getParentIdx( index );
    if( heap[parent_idx] > heap[index] ) return ;
    swap( index, parent_idx, heap );
    return sortIter( parent_idx );
  };

  heap.push(item);
  sortIter( heap.length - 1 );
  return heap;
}

// 아래 코드는 수정하지 마세요.
const binaryHeap = function (arr) {
  return arr.reduce((heap, item) => {
    return insert(heap, item);
  }, []);
};


const createMatrix = (village) => {
  const matrix = [];
  village.forEach((line) => {
    const row = [];
    for (let i = 0; i < line.length; i++) row.push(Number(line[i]));
    matrix.push(row);
  });
  return matrix;
};

const gossipProtocol = function (village, row, col) {
  // TODO: 여기에 코드를 작성합니다.
  const MAX_ROW = village.length - 1;
  const MAX_COL = village[0].length - 1;

  const villageMatrix = createMatrix( village );
  const isInfected = Array(MAX_ROW+1).fill(null).map(e => Array(MAX_COL+1).fill(0));

  const isWall = ( row, col ) => {
    if( row < 0 || row > MAX_ROW ) return true;
    if( col < 0 || col > MAX_COL ) return true;
    return villageMatrix[row][col] === 0;
  };
  
  const propergate = ( matrix, row, col ) => {        
    const coordinfo = {
      left: [row, col-1],
      right: [row, col+1],
      up: [row - 1, col],
      down: [row + 1, col]
    };

    Object.values(coordinfo).forEach( ([r,c]) => {
      if( isWall( r, c ) ) return ;
      matrix[r][c] = 1;
    });
  };

  const countMatrix = ( matrix ) => {
    let count = 0;
    for( let i = 0 ; i <= MAX_ROW ; i++ ) {
      for( let j = 0 ; j <= MAX_COL ; j++ ) {
        if( matrix[i][j] === 1 ) count++;
      }
    }
    return count;
  };

  isInfected[row][col] = 1;
  const maxcount = countMatrix( villageMatrix );
  let second = 0;
  while( true ) {
    const infectFrom = new Set();
    for( let i = 0 ; i <= MAX_ROW ; i++ ) {
      for( let j = 0 ; j <= MAX_COL ; j++ ) {
        if( isInfected[i][j] === 1 ) infectFrom.add( [i,j] );
      }
    }
    //console.dir( isInfected );
    if( infectFrom.size === maxcount ) break; 
    
    infectFrom.forEach( ([row, col]) => {
      propergate( isInfected, row, col );
    });
    second++;
  }
  return second;  
};



const LSCS = function (arr) {
  //TODO: 여기에 코드를 작성합니다.
  const maxSubArraySum = (a, size) =>
  {
    const maxint = Math.pow(2, 53);
    let max_so_far = -maxint - 1;
    let max_ending_here = 0;
      
    for (let i = 0; i < size; i++)
    {
      max_ending_here = max_ending_here + a[i];
      if (max_so_far < max_ending_here)
          max_so_far = max_ending_here;

      if (max_ending_here < 0)
          max_ending_here = 0;
    }
    return max_so_far;
  };
  
  return maxSubArraySum( arr, arr.length );
};


function radixSort(arr) {
  // todo: 여기에 코드를 작성합니다.
  const radixPart = (arr, part) => {
    const queue = Array(10).fill(null).map( e => [] );
    const queue_for_minus = Array(10).fill(null).map( e => [] );
    for( let i = 0 ; i < arr.length ; i++ ) {
      const idx = Number(Array.from(String(arr[i])).reverse()[part]) || 0;
      if( arr[i] >= 0 ) queue[ idx ].push( arr[i] );
      else queue_for_minus[ idx ].push( arr[i] );
    }
    return [...queue_for_minus.reverse().filter( e => (e) ).flat(1), ...queue.filter( e => (e) ).flat(1)];
  };

  const maxval = Math.max( ...arr ).toString().length;
  const minval = Math.min( ...arr ).toString().length;
  const max_radix = Math.max( maxval, minval );
  for( let i = 0 ; i < max_radix ; i++ ) {
    arr = radixPart( arr, i );
  }
  return arr;
}

const spiralTraversal = function (matrix) {
  // TODO: 여기에 코드를 작성합니다.
  // matrix 크기의 visited matrix를 만든다.
  const createMatrix = ( row, col ) => {
    const newMatrix = [];
    for( let i = 0 ; i < row ; i++ ) {
      const column = new Array(col).fill(false);
      newMatrix.push( column );
    }
    return newMatrix;
  };

  const DIRECTION_OFFSET = 4;
  const DIRECTION_RIGHT = 0;
  const DIRECTION_DOWN = 1;
  const DIRECTION_LEFT = 2;
  const DIRECTION_UP = 3;
  const row = matrix.length;
  const col = matrix[0].length;

  let result = '';
  let direction = DIRECTION_RIGHT;
  let visitedCount = 0;  
  let row_idx = 0;
  let col_idx = 0;
  const matrixCount = row * col;
  const isVisited = createMatrix( row, col );
  while( visitedCount < matrixCount ) {
    switch( direction )
    {
      case DIRECTION_RIGHT:
        for( ; col_idx < col ; col_idx++ ) {
          if( isVisited[row_idx][col_idx] ) break;
          result += matrix[row_idx][col_idx];
          isVisited[row_idx][col_idx] = true;
          visitedCount++;
        }
        col_idx--;
        row_idx++;
        break;
      case DIRECTION_DOWN:
        for( ; row_idx < row ; row_idx++ ) {
          if( isVisited[row_idx][col_idx] ) break;
          result += matrix[row_idx][col_idx];
          isVisited[row_idx][col_idx] = true;
          visitedCount++;
        }
        row_idx--;
        col_idx--;
        break;
      case DIRECTION_LEFT:
        for( ; col_idx >= 0 ; col_idx-- ) {
          if( isVisited[row_idx][col_idx] ) break;
          result += matrix[row_idx][col_idx];
          isVisited[row_idx][col_idx] = true;
          visitedCount++;
        }
        col_idx++;
        row_idx--;
        break;
      case DIRECTION_UP:
        for( ; row_idx >= 0 ; row_idx-- ) {
          if( isVisited[row_idx][col_idx] ) break;
          result += matrix[row_idx][col_idx];
          isVisited[row_idx][col_idx] = true;
          visitedCount++;
        }
        row_idx++;
        col_idx++;
        break;
    }
    direction = ( direction + 1 ) % DIRECTION_OFFSET;
  }
  return result;
};

const rotateMatrix = function (matrix, k) {
  // TODO: 여기에 코드를 작성합니다.
  const rotateOnce = ( matrix ) => {
    const row_before = matrix.length;
    const column_before = matrix[0].length;
    const [row, column] = [column_before, row_before];
    const newMatrix = [];
    for( let i = 0 ; i < row ; i ++ ) {
      const push_column = [];
      for( let j = column - 1; j >= 0 ; j --) {
        push_column.push( matrix[j][i] );
      }
      newMatrix.push( push_column );
    }
    return newMatrix;
  };
  if( !matrix?.length ) return [];
  let newMatrix = matrix;
  if( !k ) k = 1;
  for( let i = 0 ; i < k ; i++ ) {
    newMatrix = rotateOnce( newMatrix );
  }
  return newMatrix;
};

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
