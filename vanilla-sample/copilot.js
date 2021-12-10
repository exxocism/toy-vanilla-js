const knapsack = function (weight, items) {

  items.sort((a, b) => a[0] - b[0]);
  
  for( let i = 0 ; i < items.length ; i++ ) {
    if( weight < items[i][0] ) {
      if( i === 0 ) return 0;
      items = items.slice(0, i);
      break ;
    }
  }

  let maxValue = -Infinity;

  const dfs = ( currentWeight, currentValue, index ) => {
    if( currentWeight > weight ) return ;
    maxValue = currentValue > maxValue ? currentValue : maxValue;
    if( index === items.length ) return ;
    for( let i = index ; i < items.length ; i++ ) {
      dfs( currentWeight + items[i][0], currentValue + items[i][1], i + 1 );
    }
  };

  dfs( 0, 0, 0 );

  return maxValue;
};

const weight = 30;
    const items = [
      [40, 10],
      [50, 200],
      [60, 30],
    ];
let output = knapsack(weight, items);
console.log(output); // --> 220 (items[1], items[2])