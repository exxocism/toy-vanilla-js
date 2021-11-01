const rangeMinimum = function (arr, ranges) {
  // TODO: 여기에 코드를 작성합니다.

  const x = parseInt( Math.ceil( Math.log( arr.length ) / Math.log( 2 ) ) );
  const seg_size = 2 * parseInt( Math.pow(2, x) - 1 );
  const segtree = Array(seg_size).fill( Infinity );

  const getMin = ( x, y ) => (x < y)? x : y;

  const fillSegTree = ( arr, node = 0, start = 0 , end = arr.length - 1 ) => {
  
    if( start === end ) {
      segtree[node] = arr[start];
      return arr[start];
    };

    const mid = Math.floor( start + (end - start) / 2 );
    const node_left = node * 2 + 1;
    const node_right = node_left + 1;
    
    segtree[node] = getMin( 
      fillSegTree( arr, node_left, start, mid ),
      fillSegTree( arr, node_right, mid+1, end )
    );
    return segtree[node];
  };

  const lookupSegTree = ( start, end, node = 0, idx_start = 0 , idx_end = arr.length - 1 ) => {
    if( start <= idx_start && idx_end  <= end ) return segtree[node];
    if( start > idx_end || end < idx_start ) return Infinity;

    const idx_mid = Math.floor( idx_start + ( idx_end - idx_start ) / 2 );
    const node_left = node * 2 + 1;
    const node_right = node_left + 1;

    return getMin(
      lookupSegTree( start, end, node_left, idx_start, idx_mid ),
      lookupSegTree( start, end, node_right, idx_mid + 1, idx_end )
    );
  };
  
  const getParentNode = (idx) => {
    // TODO: 여기에 코드를 작성합니다.    
    if( idx < 3 ) return 0;
    return Math.floor((idx - 1) / 2);
  };

  const result = [];
  fillSegTree( arr );
  console.log( segtree );
  ranges.forEach( ([start, end]) => {
    result.push( lookupSegTree( start, end ) );
  });
  return result;
}

const rangeMinimum_class = function (arr, ranges) {
  class segmentTree {
    constructor( arr, start, end ) {
      this.node = {
        minimum: 0,
        start: null,
        end: null,
        left: null,
        right: null
      };
      if( arr ) this.fill( arr, start, end );
    }

    fill( arr, idx_start, idx_end ) {
      //console.log( arr );
      if( !arr?.length ) return ;
      if( arr.length === 1 ) {
        this.node.start = idx_start;
        this.node.end = idx_end;
        this.node.minimum = arr[0];
        return ;
      }
      const mid = Math.ceil(arr.length / 2);
      const idx_mid = Math.floor( (idx_end - idx_start) / 2) + idx_start;
      this.node.start = idx_start;
      this.node.end = idx_end;
      this.node.minimum = Math.min( ...arr ); 
      this.node.left = new segmentTree( arr.slice(0, mid), idx_start, idx_mid );
      this.node.right = new segmentTree( arr.slice(mid), idx_mid + 1, idx_end );
    }

   minimum( left, right ) {
      // 범위 밖에 있는 경우
      if(left > this.node.end || right < this.node.start) return NaN;
      // 범위 안에 있는 경우
      if(left <= this.node.start && this.node.end <= right) return this.node.minimum;
      // 그렇지 않다면 두 부분으로 나누어 합을 구하기
      const minimum_left = this.node.left?.minimum( left, right );
      const minimum_right = this.node.right?.minimum( left, right );
      if( isNaN( minimum_left ) ) return minimum_right;
      if( isNaN( minimum_right ) ) return minimum_left;
      return Math.min( minimum_left, minimum_right );
    }
  }

  //const segtree = new segmentTree( arr, 0, arr.length - 1 );
  const result = [];
  ranges.forEach( ([start, end]) => {
    result.push( segtree.minimum( start, end ) );
  });

  return result;
};

const arr = [1, 3, 2, 7, 9, 11];
const mins = rangeMinimum(arr, [
  [1, 4],
  [0, 3],
]);
console.log(mins); // --> [2, 1]
