const inequalityNumber = function (signs) {
  // TODO: 여기에 코드를 작성합니다.
  const number_info = [];
  let number_used = new Set();
  let biggestNumber = 0;
  let smallestNumber = 0;
  //assign Info
  const sign_processed = signs.replace(/\s/g,''); 
  for( let i = 0 ; i < sign_processed.length + 1 ; i ++ ) {
    const number_obj = {
      number: undefined,
      tried: [],
      available: []
    };
    number_info[i] = number_obj;
  }

  const getFinishedNumber = ( info ) => {
    return Number(info.reduce( (str, e) => { str += e.number; return str; }, ''));
  };

  const resetTriedRecords = ( idx ) => {
    for( let i = idx ; i < number_info.length ; i++ ){
      number_info[i].tried = [];
    }
  };

  const enumerateNextAvailablity = ( idx ) => {
    number_info[i].available = [];
    if( idx === 0 ) {
      if( sign_processed[0] === '>' ) {
        number_info[i].available = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      } else {
        number_info[i].available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      } 
      return;
    }
    const direction = sign_processed[ idx - 1 ];
    for( let i = 0 ; i < 10 ; i++ ) {
      if( number_used.has(i) ) continue;
      check = number_info[idx - 1].number;
      if( direction === '>' ) {
        if( check < i ) continue;
      } else {
        if( check > i ) continue;
      }
      number_info[idx].available.push(i);
    }
  };

  const fallBackToLastAvailableIndex = ( idx ) => {
    for( let i = idx - 1; i >= 0 ; i -- ) {      
      number_used.delete( number_info[i].number );
      if( !number_info[i].available.length ) continue;
      if( number_info[i].tried.length === number_info[i].available.length ) continue;
      return i;
    }
  };

  const FALLBACK_NEEDED = -1;
  const getNextAvailableNumber = ( idx, ascending ) => {
    const num_available = number_info[idx].available.length;
    if( !num_available ) return FALLBACK_NEEDED;
    if( num_available === number_info[idx].tried.length ) return FALLBACK_NEEDED;
    if( ascending ) {
      for( let i = 0 ; i < num_available ; i++ ) {
        const check = number_info[idx].available[i];
        if( number_info[idx].tried.includes( check ) ) continue;
        return check;
      }
    } else {
      for( let i = num_available - 1 ; i >= 0 ; i-- ) {
        const check = number_info[idx].available[i];
        if( number_info[idx].tried.includes( check ) ) continue;
        return check;
      }
    }
  };

  const getNextAvailableNumberByAscending = ( idx ) => {
    return getNextAvailableNumber( idx, true );
  };
  const getNextAvailableNumberByDescending = ( idx ) => {    
    return getNextAvailableNumber( idx, false );
  };

  //get by ascending
  let i = 0;
  while (i >= 0 && i < number_info.length ) {
    enumerateNextAvailablity(i);
    const numberSearched = getNextAvailableNumberByAscending(i);

    if (numberSearched === FALLBACK_NEEDED) {
      i = fallBackToLastAvailableIndex(i);
      resetTriedRecords(i + 1);
      continue;
    }

    number_info[i].number = numberSearched;
    number_info[i].tried.push(numberSearched);
    number_used.add(numberSearched);
    i++;
  }
  smallestNumber = getFinishedNumber( number_info );

  i = 0;
  resetTriedRecords(i);
  number_used = new Set();
  while (i >= 0 && i < number_info.length ) {
    enumerateNextAvailablity(i);
    const numberSearched = getNextAvailableNumberByDescending(i);

    if (numberSearched === FALLBACK_NEEDED) {
      i = fallBackToLastAvailableIndex(i);
      resetTriedRecords(i + 1);
      continue;
    }

    number_info[i].number = numberSearched;
    number_info[i].tried.push(numberSearched);
    number_used.add(numberSearched);
    i++;
  }

  biggestNumber = getFinishedNumber( number_info );

  //console.log(`smallestNumber: ${smallestNumber}, biggestNumber: ${biggestNumber}`);
  return biggestNumber - smallestNumber;
};

output = inequalityNumber('< > > <');
console.log(output); // --> 876 (897 - 021))

