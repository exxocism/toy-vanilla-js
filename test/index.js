function compressString(str) {
  // TODO: 여기에 코드를 작성합니다.
  let result = [str[0], ];
  let prv = { char: str[0], count: 1 };
  for( let i = 1 ; i < str.length ; i++ )
  {
    result.push( str[i] );
    if( str[i] !== prv.char )
    {
      if( prv.count >= 3 )
      {
        for( let del = 0 ; del <= prv.count ; del++ ) result.pop();
        result.push( prv.count, prv.char, str[i] );
      }
      console.log('called');
      prv.char = str[i];
      prv.count = 1;
      continue;
    }
    prv.count++;
  }

  return result.join('');
}

console.log(compressString('wwwggopp'));