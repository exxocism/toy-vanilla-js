const powerSet = function (str) {
  // TODO: 여기에 코드를 작성합니다.
  const getCombinations = (array, selectNumber) => {
    const results = [];
    if (selectNumber === 1) {
      return array.map((element) => [element]);
    }
    array.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);
      const combinations = getCombinations(rest, selectNumber - 1);
      const attached = combinations.map((combination) => [
        fixed,
        ...combination,
      ]);
      results.push(...attached);
    });
    return results;
  };

  const arr_str = Array.from(str);
  const remove_duplicates = new Set( arr_str );
  const arr_filtered = [...remove_duplicates];

  let storage_combinations = [];
  for( let i = 1; i <= arr_filtered.length; i++ ) {
    storage_combinations.push( ...getCombinations( arr_filtered, i ).map( e => e.join('') ) );
  }
  
  // storage_combinations.sort( (a, b) => {
  //   const minimum_length = Math.min( a.length, b.length );
  //   for( let i = 0; i < minimum_length; i++ ){
  //     if( a[i] > b[i] ) return 1;
  //     if( a[i] < b[i] ) return -1;
  //   }
  //   if( a.length === b.length ) return 0;
  //   return (a.length >  b.length)? 1:-1;
  // });
  storage_combinations = storage_combinations.map( e => {
    const word_to_sort = Array.from( e );
    word_to_sort.sort();
    return word_to_sort.join('');
  });
  storage_combinations.sort();
  storage_combinations.unshift('');
  return storage_combinations;
  // console.dir( storage_combinations );

};

let output1 = powerSet('abc');
console.log(output1); // ['', 'a', 'ab', 'abc', 'ac', 'b', 'bc', 'c']