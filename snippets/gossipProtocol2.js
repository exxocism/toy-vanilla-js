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
  
    const coords = [];
    let shortestTime = Infinity;
  
    const checkIfAlreadyFilledWithTwo = ( ) => {
      return village.every( line => {
        if( line.includes('1') ) return false;
        return true;
      });
    }
  
    const calculateElapsedTime = (queue, matrix) => {
  
      const dy = [-1, 0, 1, 0];
      const dx = [0, 1, 0, -1];
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
            nx < matrix.length &&
            ny < matrix.length &&
            ( matrix[ny][nx] === "1" || matrix[ny][nx] === "2" )
          ) {
            matrix[ny][nx] = "*";
            queue.push([ny, nx, minutes + 1]);
          }
        }
      }
  
      const isQueueUnfinishable = ( result ) => {
        for( let i = 0; i < matrix.length; i++) {
          for( let j = 0; j < matrix[i].length; j++) {
            if( matrix[i][j] === '1' ) return Infinity;
          }
        }
        return result;
      }
      
      return isQueueUnfinishable(result);
    }
  
    const chooseStartingPoints = ( num_chosen, startIdx, queue) => {
      if(num_chosen === num) {
        const result = calculateElapsedTime([...queue], createMatrix(village));
        if(shortestTime > result) shortestTime = result;
        return ;
      }
      for(let i = startIdx; i < coords.length; i++) {
        queue.push(coords[i]);
        chooseStartingPoints(num_chosen + 1, i + 1, queue);
        queue.pop();
      }
    }
  
    if( checkIfAlreadyFilledWithTwo() ) return 0;
  
    for (let i = 0; i < village.length; i++) {
      for (let j = 0; j < village.length; j++) {
        if (village[i][j] === "2") {
          coords.push([i, j, 0]);
        }
      }
    }  
    chooseStartingPoints(0, 0, []);
  
    return shortestTime;
  };