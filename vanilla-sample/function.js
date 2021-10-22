function radixSort(arr) {
  // todo: 여기에 코드를 작성합니다.
  const radixPart = (arr, part) => {
    const queue = Array(9).fill(null).map( e => [] );
    for( let i = 0 ; i < arr.length ; i++ ) {
      const idx = Array.from(String(arr[i])).reverse()[part] || 0;
      queue[ idx ].push( arr[i] ) ;
    }
    return queue.filter( e => (e) ).flat(1);
  };

  const max_radix = Array.from(String(Math.max( ...arr ))).reverse().length;
  for( let i = 0 ; i < max_radix ; i++ ) {
    arr = radixPart( arr, i );
  }
  return arr;
}

console.log(radixSort([-20, -10, 10]));


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

matrix = [
  ['T', 'y', 'r', 'i'],
  ['i', 's', 't', 'o'],
  ['n', 'r', 'e', 'n'],
  ['n', 'a', 'L', ' '],
];
//output = spiralTraversal(matrix);
//console.log(output); // --> 'Tyrion Lannister'
