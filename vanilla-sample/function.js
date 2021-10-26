/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var nextPermutation = function(nums) {

  let idx1 = 0;
  let idx2 = 0;
  let N = nums.length;
  nums.unshift('');  
  for (let i = 1; i <= N; i++) {
    if (nums[i] < nums[i + 1]) {
      idx1 = i;
    }
  }

  if (!idx1) {
      nums.shift();
      nums.reverse();
      return ;
  }

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

  console.log( tempArr );
  for (let i = N; i >= idx1 + 1; i--) {
    nums[i] = tempArr[N - i + idx1 + 1];
  }
  nums.shift();
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


let village = [
  '0101', // 첫 번째 줄
  '0111',
  '0110',
  '0100',
];
let row = 1;
let col = 2;
let output = gossipProtocol(village, row, col);
console.log(output);
