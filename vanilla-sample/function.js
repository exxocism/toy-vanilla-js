function missHouseMeal(sideDishes) {
  // TODO: 여기에 코드를 작성합니다.
  const result = [];

  const dfs = (selected, depthCurrent, depthRequired, currentIndex) => {
    if ( depthCurrent === depthRequired ) {
      //sort the array in lexical order 
      const selectedCopy = [...selected];
      selectedCopy.sort();
      return result.push( [...selectedCopy] );
    }

    for ( let i = currentIndex; i < sideDishes.length; i++ ) {
      selected.add( sideDishes[i] );    
      dfs( selected, depthCurrent + 1, depthRequired, i+1 );
      selected.delete( sideDishes[i]);
    }
  }

  for( let i = 1 ; i <= sideDishes.length; i++ ) {
    dfs( new Set(), 0, i, 0 );
  }
  
  result.sort( (a, b) => {
    for( let i = 0 ; i < a.length; i++ ) {

      if( !a[i] && b[i] ) return -1;
      if( !b[i] && a[i] ) return 1;

      if ( a[i] < b[i] ) return -1;
      if ( a[i] > b[i] ) return 1;

    }
  });
  result.unshift([]);
  return result;
}


// let output = missHouseMeal(['pasta', 'oysterSoup', 'beefRibs', 'tteokbokki'])
let output = missHouseMeal(["eggroll", "kimchi", "fishSoup"]);
console.log(output);
