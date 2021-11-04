function test3(insertEdges, removeEdges) {
  // TODO: 여기에 코드를 작성하세요.
  let rows = 0;
  let cols = 0;
  insertEdges.forEach( ([row, col]) => {
    if( rows < row ) rows = row;
    if( cols < col ) cols = col;
  });
  let dimension = Math.max( rows, cols ) + 1;

  removeEdges.forEach( ([row, col]) => {
    const idx = insertEdges.findIndex( ([check_row, check_col]) => check_row === row && check_col === col );
    if( idx === -1 ) return ;
    insertEdges.splice( idx, 1 );
  });

  const matrix = Array(dimension).fill(null).map( () => Array(dimension).fill(0) );

  insertEdges.forEach( ([row, col]) => {
    matrix[row][col] = 1;
    matrix[col][row] = 1;
  });
  
  return matrix;
}

const insertEdges2 = [
  [0, 2],
  [2, 4],
  [1, 3],
  [2, 1],
];
const removeEdges2 = [
  [0, 3],
  [2, 1],
  [1, 0],
  [4, 2]
];
let output2 = test3(insertEdges2, removeEdges2);

console.log(output2);