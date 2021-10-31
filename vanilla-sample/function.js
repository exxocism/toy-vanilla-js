const rangeMinimum = function (arr, ranges) {
  // TODO: 여기에 코드를 작성합니다.

  class segmentTree {
    constructor( arr ) {
      this.node = {
        sum: 0,
        left: null,
        right: null
      };
      if( arr ) this.fill( arr );
    }

    fill( arr ) {
      console.log( arr );
      if( !arr?.length ) return ;
      if( arr.length === 1 ) {
        this.node.sum = arr[0];
        return ;
      }
      const mid = Math.floor(arr.length / 2);
      this.node.sum = arr.reduce( (add, e) => add + e );
      this.node.left = new segmentTree( arr.slice(0, mid) );
      this.node.right = new segmentTree( arr.slice(mid) );
    }

  }

  const segtree = new segmentTree( arr );
  console.dir(segtree);

  //const result = [];
  //ranges.forEach( ([min, max]) => {
  //  result.push( Math.min( ...arr.slice( min, max + 1 ) ) );
  //});
  //return result;
};

const arr = [1, 3, 2, 7, 9, 11];
const mins = rangeMinimum(arr, [
  [1, 4],
  [0, 3],
]);
console.log(mins); // --> [2, 1]
