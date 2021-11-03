const largestRectangularArea = function (histogram) {
  // TODO: 여기에 코드를 작성합니다.
  const getMaxArea = ( hist, n ) => {
      // Create an empty stack. The stack holds indexes of hist[] array
      // The bars stored in stack are always in increasing order of their heights.
      const s = [];
      Array.prototype.peek = function(){ return this[this.length-1]; }
  
      let max_area = 0; // Initialize max area
      let tp; // To store top of stack
      let area_with_top; // To store area with top bar as the smallest bar
  
      // Run through all bars of given histogram
      let i = 0;
      while (i < n) {
          // If this bar is higher than the  bar on top stack, push it to stack
          if (s.length === 0 || hist[s.peek()] <= hist[i]) s.push(i++);
  
          // If this bar is lower than top of stack, then calculate area of rectangle with
          // stack top as the smallest (or minimum height) bar. 'i' is 'right index' for
          // the top and element before top in stack is 'left index'
          else {
              tp = s.peek(); // store the top index
              s.pop(); // pop the top
  
              // Calculate the area with hist[tp] stack as smallest bar
              area_with_top = hist[tp] *
                            (s.length === 0 ? i : i - s.peek() - 1);
  
              // update max area, if needed
              if (max_area < area_with_top) max_area = area_with_top;
          }
      }
  
      // Now pop the remaining bars from stack and calculate area with every
      // popped bar as the smallest bar
      while (s.length > 0) {
          tp = s.peek();
          s.pop();
          area_with_top = hist[tp] *
                        (s.length == 0 ? i : i - s.peek() - 1);
  
          if (max_area < area_with_top) max_area = area_with_top;
      }

      return max_area; 
  }

  return getMaxArea( histogram, histogram.length );
};

// let histogram = [2, 1, 4, 5, 1, 3, 3];
// let output = largestRectangularArea(histogram);
// console.log(output); // --> 8
let histogram = [6, 2, 5, 4, 5, 1, 6];
let output = largestRectangularArea(histogram);
console.log(output); // --> 12

const rangeMinimum = function (arr, ranges) {
  // TODO: 여기에 코드를 작성합니다.

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

  const segtree = new segmentTree( arr, 0, arr.length - 1 );
  const result = [];
  ranges.forEach( ([start, end]) => {
    result.push( segtree.minimum( start, end ) );
  });

  return result;
};

/* const arr = [1, 3, 2, 7, 9, 11];
const mins = rangeMinimum(arr, [
  [1, 4],
  [0, 3],
]);
console.log(mins); // --> [2, 1] */
