function test3(num) {
  // TODO: 여기에 코드를 작성합니다.
  const multiplyEachNumbers = ( arr ) => {
    const result = arr.reduce( (acc, num_each) => acc *= Number(num_each) );
    return result;
  };

  let num_split = [];
  let result = num;
  do {
    num_split = Array.from ( String(result) );
    result = multiplyEachNumbers( num_split );
  } while ( result >= 10 )

  return result;
}

//str = "  a  b c d C b A "s
const str = 234;
console.log( test3(str) );