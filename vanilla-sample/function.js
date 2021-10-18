const getItemFromTwoSortedArrays = function (arr1, arr2, k) {
  // TODO: 여기에 코드를 작성합니다.
  // const arr = [...arr1, ...arr2];
  // arr.sort( (a, b) => a - b );
  // return arr[k-1];

  const http = require('http');

  const postData = JSON.stringify({
    'msg': 'Hello World!'
  });

  const options = {
    hostname: 'localhost',
    port: '3000',
    path: '/shit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }; 

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
  });

  // Write data to request body
  req.write(postData);
  req.end();

};

let arr1 = [1, 1, 2, 10];
let arr2 = [3, 3];
let result = getItemFromTwoSortedArrays(arr1, arr2, 4);
console.log(result); // --> 8
