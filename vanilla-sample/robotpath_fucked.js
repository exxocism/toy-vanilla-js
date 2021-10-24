const robotPath = function (room, src, dst) {
    // TODO: 여기에 코드를 작성합니다.
    const POS_ROW = 0;
    const POS_COL = 1;
  
    const MAX_ROW = room.length - 1;
    const MAX_COL = room[0].length - 1;
  
    const isCoordValid = ( [row, col]  ) => {
      if( row < 0 || row > MAX_ROW ) return false;
      if( col < 0 || col > MAX_COL ) return false;
    };
  
    const isWall = ( [row, col] ) => {
      if( row < 0 || row > MAX_ROW ) return true;
      if( col < 0 || col > MAX_COL ) return true;
      // console.log(`row=${row}, col=${col}`);
      if( room[row][col] ) return true;
      return false;
    };
  
    const calculateAvailability = ( info, row, col ) => {
      //left
      const coordinfo = {
        left: [row, col - 1],
        right: [row, col + 1],
        up: [row - 1, col],
        down: [row + 1, col]
      };
      Object.values(coordinfo).forEach( ([r, c]) => {
        if( isWall( [r, c] ) ) return ;
        info[ row ][ col ].available.push( [r, c] );
      });
    };
  
    const createInfoMatrix = ( info ) => {
      const row = info.length;
      const col = info[0].length;
      const newMatrix = new Array(row).fill(null).map( e => [] );
      for( let i = 0 ; i < row ; i++ ) {
        for( let j = 0 ; j < col ; j++) {
          const suck = { visited:false, fallback:[], tried: [], available: [] };
          newMatrix[i].push( suck );
          calculateAvailability( newMatrix, i, j );
        }
      }
      return newMatrix;
    };
  
    const YOU_ARE_STUCK = -1;
    const amIStuck = ( info, row, col ) => {
      return info[row][col].available.findIndex( coords => {
        //available의 내용이 tried 안에 있으면 skip
        if( info[row][col].tried.some( ([r,c]) => (coords[POS_ROW] === r && coords[POS_COL] === c) ) ) return false;
        //target위치가 나의 fallback에 있거나 visited인지 확인
        if( info[row][col].fallback[POS_ROW] === coords[POS_ROW] && info[row][col].fallback[POS_COL] === coords[POS_COL] ) return false;
        if( info[ coords[POS_ROW] ][ coords[POS_COL] ].visited ) return false;
        return true;
      });
    };
  
    let count = 0;
  
    const resetTriedRecordsAndFallBackToLastAvailablePos = ( info, row, col, force ) => {
      let next_row = row;
      let next_col = col;
      while( amIStuck( info, next_row, next_col ) === YOU_ARE_STUCK || force ) {
        force = false;
        info[next_row][next_col].visited = false;
        const prv_row = next_row;
        const prv_col = next_col;
        next_row = info[prv_row][prv_col].fallback[POS_ROW];
        next_col = info[prv_row][prv_col].fallback[POS_COL];
        info[prv_row][prv_col].fallback = [];
        info[prv_row][prv_col].tried = [];
        
        if( (next_row === src[POS_ROW] && next_col === src[POS_COL] && robotRouteInfo[next_row][next_col].tried.length === robotRouteInfo[next_row][next_col].available.length) ) break;
        count--;
      }
      return [next_row, next_col];
    };
  
    const robotRouteInfo = createInfoMatrix( room );
    let cur_row = src[POS_ROW];
    let cur_col = src[POS_COL];
    const num_count = new Set();
    while( !( cur_row === src[POS_ROW] && cur_col === src[POS_COL] && robotRouteInfo[cur_row][cur_col].tried.length === robotRouteInfo[cur_row][cur_col].available.length ) ) {    
      const nextPosition = amIStuck( robotRouteInfo, cur_row, cur_col );
      if( nextPosition === YOU_ARE_STUCK ) {
        [cur_row, cur_col] = resetTriedRecordsAndFallBackToLastAvailablePos( robotRouteInfo, cur_row, cur_col );
        continue;
      }
  
      const next_row = robotRouteInfo[cur_row][cur_col].available[nextPosition][POS_ROW];
      const next_col = robotRouteInfo[cur_row][cur_col].available[nextPosition][POS_COL];
      robotRouteInfo[cur_row][cur_col].visited = true;
      robotRouteInfo[cur_row][cur_col].tried.push( robotRouteInfo[cur_row][cur_col].available[nextPosition] );
      robotRouteInfo[next_row][next_col].visited = true;
      robotRouteInfo[next_row][next_col].fallback = [cur_row, cur_col];
      cur_row = next_row;
      cur_col = next_col;
      count++;
  
      if(cur_row === dst[POS_ROW] && cur_col === dst[POS_COL]) {
        num_count.add( count );
        //console.log('foound route : ' + count );
        [cur_row, cur_col] = resetTriedRecordsAndFallBackToLastAvailablePos( robotRouteInfo, cur_row, cur_col, true );
        continue;
      }    
    }
  
    return Math.min( ...num_count );  
  };
  
  // let room = [
  //   [0, 0, 0, 0, 0, 0],
  //   [0, 1, 1, 0, 1, 0],
  //   [0, 1, 0, 0, 0, 0],
  //   [0, 0, 1, 1, 1, 0],
  //   [1, 0, 0, 0, 0, 0],
  // ];
  // let src = [4, 2];
  // let dst = [2, 2];
  // let output = robotPath(room, src, dst);
  // console.log(output); // --> 8
  
  // let room = [
  //   [ 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0 ],
  //   [ 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0 ],
  //   [ 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
  //   [ 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
  //   [ 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1 ],
  //   [ 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1 ],
  //   [ 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0 ],
  //   [ 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1 ],
  //   [ 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0 ],
  //   [ 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1 ],
  //   [ 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1 ],
  //   [ 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0 ],
  //   [ 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1 ],
  //   [ 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1 ]
  // ];
  // let src = [0, 12];
  // let dst = [13, 7];
  // let output = robotPath(room, src, dst);
  // console.log(output); // --> 38
  
  
  // let room = [
  //   [ 0, 0, 0, 0, 0, 0, 0 ],
  //   [ 1, 1, 1, 1, 0, 0, 0 ],
  //   [ 0, 0, 0, 0, 0, 0, 0 ],
  //   [ 1, 0, 1, 1, 1, 0, 1 ],
  //   [ 0, 0, 1, 0, 0, 0, 1 ],
  //   [ 0, 0, 1, 0, 1, 1, 1 ],
  //   [ 0, 0, 1, 0, 1, 0, 0 ],
  //   [ 0, 0, 0, 0, 0, 0, 0 ]
  // ];
  // let src = [0, 3];
  // let dst = [7, 3];
  // let output = robotPath(room, src, dst);
  // console.log(output); // --> 11
  
  // let room = [
  //   [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1 ],
  //   [ 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0 ],
  //   [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1 ],
  //   [ 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0 ],
  //   [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1 ],
  //   [ 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1 ],
  //   [ 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0 ],
  //   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ],
  //   [ 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
  //   [ 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
  //   [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  //   [ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  //   [ 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0 ],
  //   [ 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1 ],
  //   [ 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
  //   [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0 ],
  //   [ 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
  //   [ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1 ],
  //   [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0 ],
  //   [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ]
  // ];
  // let src = [0, 1];
  // let dst = [16, 18];
  // let output = robotPath(room, src, dst);
  // console.log(output); // --> 35
  
  
  let room = [
    [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0 ],
    [ 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0 ],
    [ 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0 ],
    [ 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
    [ 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
    [ 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0 ],
    [ 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1 ],
    [ 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1 ],
    [ 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1 ],
    [ 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0 ],
    [ 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1 ],
    [ 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1 ],
    [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0 ],
    [ 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0 ]
  ];
  let src = [16, 18];
  let dst = [0, 2];
  let output = robotPath(room, src, dst);
  console.log(output); // --> 42