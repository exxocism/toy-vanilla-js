function queuePrinter(bufferSize, capacities, documents) {
  // TODO: 여기에 코드를 작성합니다.
  // num_buffersize = 2, capacities = 10, [,,,], second = 8
  // buffersize = [,]
  // 7, 4, 5, 6

  //buffer에 빈 값을 채워준다 (1칸씩 옮기는 활동을 할 수 있게 하기 위함)
  const buffer = Array(bufferSize).fill(null);

  //버퍼가 비어 있는지 확인해주는 함수
  const isBufferEmpty = () => {
    for( let i = 0 ; i < bufferSize ; i++ ) {
      if( buffer[i] ) return false;
    }
    return true;
  };

  //버퍼의 크기를 확인해주는 함수
  const getCurrentBufferSize = () => {
    let sum = 0;
    for( let i = 0 ; i < bufferSize ; i++ ) {
      if( buffer[i] || !isNaN(Number(buffer[i])) ) sum += buffer[i];
    }
    return sum;
  };

  //버퍼의 마지막 부분에 documents의 맨 앞부분 값을 떼어 넣어 준다.
  buffer[bufferSize - 1] = documents.shift();
  //최초 1초의 활동을 하였으므로 값을 추가해준다.
  let second = 1;

  //documents가 비어있지 않거나, 버퍼에 값이 있는 경우 계속해서 작업을 해 준다.
  // == document와 버퍼가 텅 빌 때까지 작업을 계속 해 준다.
  while( documents.length || !isBufferEmpty() ) {

    //버퍼의 앞부분을 떼서 출력한다.
    buffer.shift();

    //버퍼에 들어있는 자료의 합(현재 크기)에 documents의 맨 앞부분을 더해도  capacities를 초과하지 않는 경우
    if( getCurrentBufferSize() + documents[0] <= capacities ) {
      //버퍼의 마지막 부분에 documents의 앞부분을 떼어 붙여준다.
      buffer[bufferSize - 1] = documents.shift();
    } else {
      //버퍼가 가득 차서 더이상 값을 넣어줄 수가 없다. 버퍼의 마지막 부분에 null을 넣어 준다.
      buffer[bufferSize - 1] = null;
    }

    //1초의 활동을 다 하였으므로 1초를 더해준다.
    second++;
  }

  //while루프가 끝난 뒤 결과를 출력한다.
  return second;
}

const result2 = queuePrinter(10, 15, [14, 2, 3, 7, 10, 13, 12, 4, 11, 2, 9, 4]);
console.log(result2) // 8