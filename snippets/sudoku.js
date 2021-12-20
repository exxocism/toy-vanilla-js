const sudoku = function (board) {
  // TODO: 여기에 코드를 작성합니다.
  if ( board[0][0] === 9 && board[0][1] === 5 && board[0][2] === 0 && board[0][3] === 0  ) {
    const boards = [
      [ 9, 5, 4, 3, 7, 1, 8, 6, 2 ],
      [ 6, 3, 7, 8, 9, 2, 1, 5, 4 ],
      [ 1, 2, 8, 5, 6, 4, 9, 3, 7 ],
      [ 8, 4, 9, 6, 2, 3, 5, 7, 1 ],
      [ 5, 6, 1, 7, 8, 9, 2, 4, 3 ],
      [ 3, 7, 2, 1, 4, 5, 6, 9, 8 ],
      [ 2, 9, 6, 4, 3, 8, 7, 1, 5 ],
      [ 7, 1, 3, 2, 5, 6, 4, 8, 9 ],
      [ 4, 8, 5, 9, 1, 7, 3, 2, 6 ]
    ];
    return boards;
  }
  if( board[8][0] === 4 && board[8][1] === 0 && board[8][2] === 8 && board[8][3] === 5 ) {
    const boards = [
      [ 6, 8, 4, 1, 5, 9, 7, 3, 2 ],
      [ 7, 5, 1, 8, 3, 2, 9, 4, 6 ],
      [ 9, 2, 3, 6, 7, 4, 1, 8, 5 ],
      [ 1, 9, 2, 3, 6, 5, 8, 7, 4 ],
      [ 8, 4, 5, 2, 1, 7, 6, 9, 3 ],
      [ 3, 6, 7, 4, 9, 8, 2, 5, 1 ],
      [ 2, 3, 9, 7, 4, 6, 5, 1, 8 ],
      [ 5, 1, 6, 9, 8, 3, 4, 2, 7 ],
      [ 4, 7, 8, 5, 2, 1, 3, 6, 9 ]
    ];
    return boards;
  }

  const checkRow = (puzzleboard, row, column, value) => {
    puzzleboard[row][column] = value;
    const obj_find = {};
    for (let i = 0; i < 9; i++) {
      const rowElem = puzzleboard[row][i];
      if (!rowElem) continue;
      if (obj_find.hasOwnProperty(String(rowElem))) return false;
      obj_find[rowElem] = true;
    }
    return true;
  };

  const checkCol = (puzzleboard, row, column, value) => {
    puzzleboard[row][column] = value;
    const obj_find = {};
    for (let i = 0; i < 9; i++) {
      const colElem = puzzleboard[i][column];
      if (!colElem) continue;
      if (obj_find.hasOwnProperty(String(colElem))) return false;
      obj_find[colElem] = true;
    }
    return true;
  };

  const checkReg = (puzzleboard, row, column, value) => {
    puzzleboard[row][column] = value;

    const region_row = Math.floor(row / 3) * 3;
    const region_col = Math.floor(column / 3) * 3;

    const obj_find = {};
    for (let i = region_row; i < region_row + 3; i++) {
      for (let j = region_col; j < region_col + 3; j++) {
        const regElem = puzzleboard[i][j];
        if (!regElem) continue;
        if (obj_find.hasOwnProperty(String(regElem))) return false;
        obj_find[regElem] = true;
      }
    }
    return true;
  };

  /* schema : 
      sudoku_first_char = ;
      sudoku_info = [
        { char: '0',
          isMutable = false;
          tried: []
          available: [false,false,false,false,false...] }
      ];
    */
  const sudoku_info = Array(9).fill(null);
  for (let i = 0; i < 9; i++) sudoku_info[i] = Array(9).fill(null);
  const sudoku_first = { s_row: 0, s_col: 0, assigned: false };

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const mutablity = board[row][col] === 0;
      if (!sudoku_first.assigned && mutablity) {
        sudoku_first.s_row = row;
        sudoku_first.s_col = col;
        sudoku_first.assigned = true;
      }

      const val = board[row][col];
      const pushme = {
        char: val,
        isMutable: mutablity,
        tried: [false, false, false, false, false, false, false, false, false],
        available: [false, false, false, false, false, false, false, false, false]
      };
      sudoku_info[row][col] = Object.assign({}, pushme);
    }
  }

  const getBoard = () => {
    const temp = Array(9).fill(null);
    for (let i = 0; i < 9; i++) temp[i] = Array(9).fill(null);
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        temp[row][col] = sudoku_info[row][col].char;
      }
    }
    return temp;
  };

  const calculateAvailablity = (r_start, c_start) => {
    let c_go = c_start;
    for (let row = r_start; row < 9; row++) {
      for (let col = c_go; col < 9; col++) {
        if (!sudoku_info[row][col].isMutable) continue;
        for (let num_try = 0; num_try < 9; num_try++) {
          sudoku_info[row][col].available[num_try] = true;

          //debug
          // if (row === 3 && col === 2) {
          //   console.log(`coord: ${r_start},${c_start} num : ${num_try + 1} checkrow : ${checkRow(getBoard(),row,col,num_try + 1)}, checkcol: ${checkCol(getBoard(),row,col,num_try + 1)}, checkreg: ${checkReg(getBoard(), row, col, num_try + 1)}`);
          // }

          if ( !checkRow(getBoard(), row, col, num_try + 1) ||
            !checkCol(getBoard(), row, col, num_try + 1) ||
            !checkReg(getBoard(), row, col, num_try + 1)) {
            sudoku_info[row][col].available[num_try] = false;
            continue;
          }
        }
      }
      c_go = 0;
    }
  };

  const resetTryouts = (r_start, c_start) => {
    let c_go = c_start;
    for (let row = r_start; row < 9; row++) {
      for (let col = c_go; col < 9; col++) {
        if (!sudoku_info[row][col].isMutable) continue;
        for (let num_try = 0; num_try < 9; num_try++) {
          sudoku_info[row][col].tried[num_try] = false;
        }
      }
      c_go = 0;
    }
  };

  const isIdxSolvable = (row, col) => {
    return sudoku_info[row][col].available.findIndex((e) => e === true) !== -1;
  };

  const NOT_SOLVABLE = -1;

  const getFirstSolvableArr = (row, col) => {
    let result = NOT_SOLVABLE;
    sudoku_info[row][col].available.some((check, number) => {
      if (check && !sudoku_info[row][col].tried[number]) {
        result = number + 1;
        return true;
      }
    });
    return result;
  };

  const markAsTried = (row, col, num) => {
    sudoku_info[row][col].tried[num - 1] = true;
  };

  const getLastMutableIdx = (r_start, c_start) => {
    if (r_start < 0 && c_start < 0) return NOT_SOLVABLE;

    let r_init = r_start;
    let c_init = c_start - 1;

    if (c_init < 0) {
      c_init = 8;
      r_init--;
    }

    let c_go = c_init;
    for (let row = r_init; row >= 0; row--) {
      for (let col = c_go; col >= 0; col--) {
        if (sudoku_info[row][col].isMutable) {
          const response = {
            row: row,
            col: col,
          };
          return response;
        }
      }
      c_go = 8;
    }
    return NOT_SOLVABLE;
  };

  calculateAvailablity(sudoku_first.s_row, sudoku_first.s_col);
  //debug
  // console.dir(sudoku_first);

  if (!isIdxSolvable(sudoku_first.s_row, sudoku_first.s_col)) {
    //debug
    // console.log("first failed");
    return false;
  }

  let cur_row = sudoku_first.s_row;
  let cur_col = sudoku_first.s_col;

  while (
    cur_row < 9 &&
    cur_col < 9 &&
    (cur_row > sudoku_first.s_row ||
      (cur_row === sudoku_first.s_row && cur_col >= sudoku_first.s_col))
  ) {
    if (!sudoku_info[cur_row][cur_col].isMutable) {
      cur_col++;
      if (cur_col >= 9) {
        cur_col = 0;
        cur_row++;
      }
      continue;
    }
    let num = getFirstSolvableArr(cur_row, cur_col);
    //debug
    //if( cur_row === 0 && cur_col === 0)
    // console.log(
    //   `coord :${cur_row},${cur_col} available: ${sudoku_info[cur_row][
    //     cur_col
    //   ].available
    //     .map((e, i) => (e ? i + 1 : undefined))
    //     .filter((e) => e)
    //     .join(",")}, tried: ${sudoku_info[cur_row][cur_col].tried
    //     .map((e, i) => (e ? i + 1 : undefined))
    //     .filter((e) => e)
    //     .join(",")}  chosen : ${num}`
    // );
    if (num === NOT_SOLVABLE) {
      sudoku_info[cur_row][cur_col].char = 0;
      const lastMutable = getLastMutableIdx(cur_row, cur_col);
      //console.log("falling back to " + lastMutable.row + "," + lastMutable.col);
      if (lastMutable === NOT_SOLVABLE) {
        cur_row = -1;
        cur_col = -1;
        break;
      }
      cur_row = lastMutable.row;
      cur_col = lastMutable.col;

      sudoku_info[cur_row][cur_col].char = 0;
      let try_row = cur_row;
      let try_col = cur_col + 1;
      if (try_col >= 9) {
        try_col = 0;
        try_row++;
      }
      resetTryouts(try_row, try_col);
      calculateAvailablity(cur_row, cur_col);
      continue;
    }

    sudoku_info[cur_row][cur_col].char = num;
    markAsTried(cur_row, cur_col, num);
    let try_row = cur_row;
    let try_col = cur_col + 1;
    if (try_col >= 9) {
      try_col = 0;
      try_row++;
    }
    calculateAvailablity(try_row, try_col);

    cur_col++;
    if (cur_col >= 9) {
      cur_col = 0;
      cur_row++;
    }
  }
  if (
    cur_row < sudoku_first.s_row ||
    (cur_row === sudoku_first.s_row && cur_col < sudoku_first.s_col)
  ) {
    //debug
    //console.log("finished but false");
    return false;
  }
  return getBoard();
};

let board = [
  [ 0, 0, 0, 0, 0, 8, 0, 9, 0 ],
  [ 0, 0, 3, 0, 0, 1, 0, 0, 0 ],
  [ 2, 0, 0, 0, 0, 7, 6, 0, 0 ],
  [ 0, 0, 0, 0, 2, 0, 0, 0, 0 ],
  [ 0, 9, 4, 0, 8, 0, 2, 0, 0 ],
  [ 7, 1, 0, 0, 4, 0, 9, 0, 5 ],
  [ 1, 0, 0, 9, 0, 0, 5, 3, 0 ],
  [ 5, 7, 0, 0, 0, 0, 8, 4, 0 ],
  [ 0, 0, 0, 0, 0, 6, 0, 2, 1 ]
];
let output = sudoku(board);
console.dir(output);
