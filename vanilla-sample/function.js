const createMatrix = (village) => {
  const matrix = [];
  village.forEach((line) => {
    const row = [];
    for (let i = 0; i < line.length; i++) row.push(line[i]);
    matrix.push(row);
  });
  return matrix;
};

const gossipProtocol2 = function (village, num) {

  const knowAll = ( ) => {
    return village.every((line, y) => {
      if( line.includes('1') ) return false;
      return true;
    });
  }
  if( knowAll() ) return 0;

  const matrix = createMatrix(village);
  const len = village.length;
  const availableCoords = [];
  let min = Infinity;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (matrix[i][j] === "2") {
        matrix[i][j] = "X";
        availableCoords.push([i, j, 0]);
      }
    }
  }

  function dfs(L, s, queue) {
    if(L === num) {
      const result = bfs([...queue], createMatrix(village));
      if(min > result) min = result;
      return ;
    }
    for(let i = s; i < availableCoords.length; i++) {
      queue.push(availableCoords[i]);
      dfs(L + 1, i + 1, queue);
      queue.pop();
    }
  }
  dfs(0, 0, []);

  return min;
};

function bfs(queue, matrix) {

  const isNotEmpty = ( ) => {
    for( let i = 0; i < matrix.length; i++) {
      for( let j = 0; j < matrix[i].length; j++) {
        if( matrix[i][j] === '1' ) return true;
      }
    }
    return false;
  }

  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];
  const len = matrix.length;
  let result;
  let index = 0;

  while (index < queue.length) {
    const [y, x, minutes] = queue[index++];
    matrix[y][x] = "*";

    result = minutes;
    for (let k = 0; k < 4; k++) {
      const ny = y + dy[k];
      const nx = x + dx[k];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < len &&
        ny < len &&
        ( matrix[ny][nx] === "1" || matrix[ny][nx] === "2" )
      ) {
        matrix[ny][nx] = "*";
        queue.push([ny, nx, minutes + 1]);
      }
    }
  }
  
  return isNotEmpty()? Infinity:result;
}


const village = [
  '01102021',
  '00101001',
  '00111101',
  '20000121',
  '11000010',
  '00000100',
  '20200120',
  '00000111',
];
const num = 3;
output = gossipProtocol2(village, num);
console.log(output); // --> 3