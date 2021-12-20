function test1() {
  // TODO: 여기에 코드를 작성하세요.
  let lastFibonacciNumber = [0, 1];
  let count = 0;
  return function () {
    count++;
    if (count === 1) return 0;
    if (count === 2) return 1;
    const newNumber = lastFibonacciNumber[0] + lastFibonacciNumber[1];
    lastFibonacciNumber.shift();
    lastFibonacciNumber.push(newNumber);
    return newNumber;
  };
}

function test2(arr, id) {
  // TODO: 여기에 코드를 작성합니다.
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return arr[i];
    if (arr[i].hasOwnProperty("children")) {
      const result = test2(arr[i].children, id);
      if (result) return result;
    }
  }
  return null;
}

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
      const idx = insertEdges.findIndex( ([check_row, check_col]) => (check_row === row && check_col === col) || (check_row === col && check_col === row) );
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

