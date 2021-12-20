function findAbbreviation(strA, strB) {
  // TODO: 여기에 코드를 작성합니다.
  const str_Uppercase = strA.toUpperCase();
  const strA_only_Uppercase = strA.replace(/[^A-Z]/g, "");

  const strA_only_Uppercase_truncated = strA_only_Uppercase.replace(/(.)(?=.*\1)/gi, "");
  const strA_truncated = Array.from(str_Uppercase.replace(/(.)(?=.*\1)/gi, "")).sort();
  const strB_truncated = Array.from(strB.replace(/(.)(?=.*\1)/gi, "")).sort();
  
  if( strA_only_Uppercase.length > strB.length ) return false;
  for( let i = 0; i < strA_only_Uppercase_truncated.length; i++ ) {
    if( !strB.includes (strA_only_Uppercase_truncated[i]) ) return false;
  }

  if( strB_truncated.length > strA_truncated.length ) return false;
  let stored = 0, i, j;
  for( i = 0 ; i < strB_truncated.length ; i++ ) {
    for( j = stored; j < strA_truncated.length ; j++ ) {
      if( strB_truncated[i] < strA_truncated[j] ) return false;
      else if( strB_truncated[i] === strA_truncated[j] ) {
        stored = j;
        break;
      }
    }
    if( stored !== j ) return false;
  }
  return [strA.length, strB.length];
}


//let output = findAbbreviation('AbcDE', 'ABDE');
//console.log(output); // --> true ('b'를 대문자로 변경, 'c'를 제거)

let output = findAbbreviation('NOWaaaaaaaaaaaaaaaaaaaaAAaAAaAaAaAaAaAaaaAAAAaAaAAY', 'NOWAAAAAAAAAAAAAAY');
console.log(output); // --> false
