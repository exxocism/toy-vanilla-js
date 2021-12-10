// 좌표평면 위의 두 점 사이의 거리를 계산하는 함수입니다.
function calculateDistance(p1, p2) {
  const yDiffSquared = Math.pow(p2[0] - p1[0], 2);
  const xDiffSquared = Math.pow(p2[1] - p1[1], 2);
  const dist = Math.sqrt(yDiffSquared + xDiffSquared);
  return Math.floor(dist * 100);
}

const TSP = function (places) {
  // TODO: 여기에 코드를 작성합니다.
  
  let shortestLength = Infinity;

  const getLength = (path) => {
    console.log(path);
    let length = 0;
    for (let i = 0; i < path.length - 1; i++) {
      length += calculateDistance(path[i], path[i + 1]);
    }
    return length;
  }

  const tmp = Array(places.length).fill(null);
  const visited = Array(places.length).fill(false);

  // 전체 장소들을 순회하면서 각 장소들을 선택하는 모든 경우를 생성합니다.
  const dfs = ( placesChecked, currentLength ) => {
    if (placesChecked === places.length) {
      const calculatedLength = getLength([...tmp]);
      if( calculatedLength < shortestLength ) shortestLength = calculatedLength;
      return ;
    }
    for( let i = currentLength; i < places.length; i++ ) {
      if( visited[i] ) continue;
      visited[i] = true;
      tmp[placesChecked] = places[i];
      dfs(placesChecked + 1, i + 1);
      visited[i] = false;
    }
  };

  dfs(0, 0);

  return shortestLength;
};

let placesToVisit = [
  [0, 0],
  [1, 1],
  [1, 3],
  [2, 2],
];
let output = TSP(placesToVisit);
console.log(output); // --> 423
// 방문 순서: [0, 0], [1, 1], [2, 2], [1, 3]
