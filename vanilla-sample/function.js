let bfs = function (node) {
  // TODO: 여기에 코드를 작성합니다.
  const bfs_childonly = ( node, depth ) => {
    if( depth === 0 ) {
      return node.value;
    }
    if( node.children.length === 0 ) return null;
    return [ ...node.children.map( child => bfs_childonly( child, depth - 1 ) ).filter( e => e !== null ).flat(1) ];
  };

  let result = [node.value];
  let i = 1;
  let check = bfs_childonly(node, i);
  while( check.length ) {
    result = result.concat( ...check );
    i++;
    check = bfs_childonly(node, i);
  }

  return result;
};
 
// 이 아래 코드는 변경하지 않아도 됩니다. 자유롭게 참고하세요.
let Node = function (value) {
  this.value = value;
  this.children = [];
};

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리입니다.
// membership check(중복 확인)를 따로 하지 않습니다.
Node.prototype.addChild = function (child) {
  this.children.push(child);
  return child;
};


const root = new Node(1);
    root.addChild(new Node(2));
    root.addChild(new Node(3));
    root.addChild(new Node(4));
    root.children[0].addChild(new Node(5));
    root.children[0].addChild(new Node(6));
    root.children[0].children[0].addChild(new Node(7));
    root.children[0].children[1].addChild(new Node(8));
    root.children[1].addChild(new Node(9));
    root.children[1].addChild(new Node(10));
    root.children[1].children[1].addChild(new Node(11));
    root.children[1].children[1].addChild(new Node(12));
    root.children[2].addChild(new Node(13));
    const expected = [1, 2, 3, 4, 5, 6, 9, 10, 13, 7, 8, 11, 12];
console.log(bfs(root));

