const sudoku = () => {
  // Utility Functions
  const convertToArray = (board: string[][] | number[][]): number[][] =>
    new Array(9)
      .fill(null)
      .map((_, row) =>
        new Array(9)
          .fill(0)
          .map((_, col) => (board[row][col] === '.' ? 0 : Number(board[row][col])))
      );

  const cropZone = (numBoard: number[][], row: number, col: number) => {
    const getZone = (idx: number) => {
      const start = Math.floor(idx / 3) * 3;
      const end = start + 3;
      return [start, end];
    };

    const [rowStart, rowEnd] = getZone(row);
    const [colStart, colEnd] = getZone(col);
    return numBoard
      .slice(rowStart, rowEnd)
      .map((col) => col.slice(colStart, colEnd))
      .flat();
  };

  const getNextIdx = (numBoard: number[][]) => {
    const idx = numBoard.flat().findIndex((idx) => !idx);
    const row = Math.floor(idx / 9);
    const col = idx % 9;
    return [row, col];
  };

  const stripZero = (line: number[]) => line.filter((val) => val !== 0);
  const checkDuplicate = (line: number[]) =>
    new Set(stripZero(line)).size === stripZero(line).length;
  const checkRow = (numBoard: number[][], row: number) => checkDuplicate(numBoard[row]);
  const checkCol = (numBoard: number[][], col: number) =>
    checkDuplicate(numBoard.map((board) => board[col]));
  const checkZone = (numBoard: number[][], row: number, col: number) =>
    checkDuplicate(cropZone(numBoard, row, col));

  // Sementic functions
  const isValidSudoku = (numBoard: number[][], row: number, col: number) =>
    checkRow(numBoard, row) && checkCol(numBoard, col) && checkZone(numBoard, row, col);
  const isSudokuSolved = (numBoard: number[][]) => !new Set(numBoard.flat()).has(0);
  const fillAvailableNumber = (
    numBoard: number[][],
    rowIdx: number,
    colIdx: number
  ): number[][] | boolean => {
    if (isSudokuSolved(numBoard)) return numBoard;

    const boardCopy = convertToArray(numBoard);
    for (let num = 1; num <= 9; num++) {
      boardCopy[rowIdx][colIdx] = num;
      if (!isValidSudoku(boardCopy, rowIdx, colIdx)) continue;
      const [rowNext, colNext] = getNextIdx(boardCopy);
      const result = fillAvailableNumber(boardCopy, rowNext, colNext);
      if (result) return result;
    }
    return false;
  };

  const board = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ];

  const numBoard = convertToArray(board);
  const [rowNext, colNext] = getNextIdx(numBoard);
  const result = fillAvailableNumber(numBoard, rowNext, colNext) as number[][];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '.') board[row][col] = String(result[row][col]);
    }
  }
  console.log(board);
};
sudoku();
