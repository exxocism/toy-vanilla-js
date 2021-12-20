const robotPath2 = function (room, src, sDir, dst, dDir) {
    // TODO: 여기에 코드를 작성합니다.
  
    const MAX_ROW = room.length;
    const MAX_COL = room[0].length;
  
    // Fill in empty matrix
    const adjacencyMatrix = Array(MAX_ROW).fill(0).map(() => Array(MAX_COL).fill(null));
    const isVisited = Array(MAX_ROW).fill(0).map(() => Array(MAX_COL).fill(new Set()));
  
    const checkAdjacency = ([row, col]) => {
      
      if( adjacencyMatrix[row][col] === null ) adjacencyMatrix[row][col] = new Set();
  
      //check left column
      for( let i = col - 1; i >= 0; i-- ) {
        if( room[row][i] ) break;
        if( row - 1 > 0 && room[row - 1][i] === 0 ) adjacencyMatrix[row][col].add(`${row},${i},0`);
        if( row + 1 < MAX_ROW && room[row + 1][i] === 0 ) adjacencyMatrix[row][col].add(`${row},${i},180`);
      }
  
      //check right column
      for( let i = col + 1; i < MAX_COL; i++ ) {
        if( room[row][i] ) break;
        if( row - 1 > 0 && room[row - 1][i] === 0 ) adjacencyMatrix[row][col].add(`${row},${i},0`);
        if( row + 1 < MAX_ROW && room[row + 1][i] === 0 ) adjacencyMatrix[row][col].add(`${row},${i},180`);
      }
  
      //check top row
      for( let i = row - 1; i >= 0; i-- ) {
        if( room[i][col] ) break;
        if( col + 1 < MAX_COL && room[i][col + 1] === 0 ) adjacencyMatrix[row][col].add(`${i},${col},90`);
        if( col - 1 > 0 && room[i][col - 1] === 0 ) adjacencyMatrix[row][col].add(`${i},${col},270`);
      }
  
      //check bottom row
      for( let i = row + 1; i < MAX_ROW; i++ ) {
        if( room[i][col] ) break;
        if( col + 1 < MAX_COL && room[i][col + 1] === 0 ) adjacencyMatrix[row][col].add(`${i},${col},90`);
        if( col - 1 > 0 && room[i][col - 1] === 0 ) adjacencyMatrix[row][col].add(`${i},${col},270`);
      }
  
    };
  
    const ifDestinationGoable = (row, col) => {
      if( row !== dst[0] && col !== dst[1] ) return false;
      if( row === dst[0]) {
  
        if( col < dst[1] ) {
          for( let i = col + 1; i < dst[1]; i++ ) {
            if( room[row][i] ) return false;
          }
        } else {
          for( let i = col - 1; i > dst[1]; i-- ) {
            if( room[row][i] ) return false;
          }
        }
        return true;
  
      } else {
  
        if( row < dst[0] ) {
          for( let i = row + 1; i < dst[0]; i++ ) {
            if( room[i][col] ) return false;
          }
        } else {
          for( let i = row - 1; i > dst[0]; i-- ) {
            if( room[i][col] ) return false;
          }
        }
        return true;
  
      }
    };
  
    const calculateHeadings = (row, col, dstrow, dstcol) => {
      if( row === dstrow ) {
        if( col < dstcol ) return 90;
        else return 270;
      } else {
        if( row < dstrow ) return 0;
        else return 180;
      }
    }
  
    const getNextPosition = (row, col) => {
      let positionDecided = false;
      let nextPosition;
  
      adjacencyMatrix[row][col].forEach( (position) => {
        if( positionDecided || isVisited[row][col].has(position) ) return;
        const [r, c, d] = position.split(',');
        nextPosition.row = r;
        nextPosition.col = c;
        nextPosition.direction = d;
        isVisited[row][col].add(position);
        positionDecided = true;
      });
      return positionDecided? nextPosition : null;
    }
  
    const fallBackToLastAvailabePosition = (row, col) => {
      //...ing
    };
  
    const caculateRollingTime = (srcDir, dstDir) => {
      let rollinTime = 0;
      while ( srcDir !== dstDir ) {
        srcDir = (srcDir + 90) % 360;
        rollinTime++;
      }
      return rollinTime;
    }
  
    for( let i = 0; i < MAX_ROW; i++ ) {
      for( let j = 0; j < MAX_COL; j++ ) {
        if( room[i][j] === 0 ) checkAdjacency([i, j]);
      }
    }
  
    console.log(adjacencyMatrix);
  
    const currentPostiion = {
      row: src[0],
      col: src[1],
      direction: sDir
    };
    let elapsedTime = 0;
  
    while ( currentPostiion.row !== dst[0] || currentPostiion.col !== dst[1] || currentPostiion.direction !== dDir ) {
      
      //finished
      if( ifDestinationGoable(currentPostiion.row, currentPostiion.col) ) {
  
        const targetDirection = calculateHeadings(currentPostiion.row, currentPostiion.col, dst[0], dst[1]);
        if( currentPostiion.direction !== targetDirection ) {
          //turn
          elapsedTime += caculateRollingTime(currentPostiion.direction, targetDirection);
          currentPostiion.direction = targetDirection;
        }
        //move
        elapsedTime ++;
        if( currentPostiion.direction !== dDir ) {
          //turn
          elapsedTime += caculateRollingTime(currentPostiion.direction, dDir);
          currentPostiion.direction = dDir;
        }
        break;
  
      }
  
      const nextPosition = getNextPosition(currentPostiion.row, currentPostiion.col);
      if( nextPosition === null ) {
        //fall back to last available position
  
      }
  
      const targetDirection = calculateHeadings(currentPostiion.row, currentPostiion.col, nextPosition.row, nextPosition.col);
      if( currentPostiion.direction !== targetDirection ) {
        //turn
        elapsedTime += caculateRollingTime(currentPostiion.direction, targetDirection);
        currentPostiion.direction = targetDirection;
      }
      //move
      currentPostiion.row = nextPosition.row;
      currentPostiion.col = nextPosition.col;
      elapsedTime++;
    }
  
    return elapsedTime;
  };
  
  let room = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 1],
  ];
  let src = [3, 0];
  let sDir = 3;
  let dst = [2, 2];
  let dDir = 2;
  let output = robotPath2(room, src, sDir, dst, dDir);
  console.log(output); // --> 11
  