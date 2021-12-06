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

let grid = [
  ['0', '1', '1', '1'],
  ['0', '1', '1', '1'],
  ['1', '1', '0', '0'],
];
let result = countIslands(grid);
console.log(result); // --> 1