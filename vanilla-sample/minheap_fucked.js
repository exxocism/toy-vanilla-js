// 아래 코드는 수정하지 마세요.
function swap(idx1, idx2, arr) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

function getParentIdx(idx) {
  // TODO: 여기에 코드를 작성합니다.
  if( idx < 3 ) return 0;
  return Math.floor((idx - 1) / 2);
}

function insert(heap, item) {
  // TODO: 여기에 코드를 작성합니다.
  const sortIter = ( index ) => {
    if( !index ) return;
    const parent_idx = getParentIdx( index );
    if( heap[parent_idx] < heap[index] ) return ;
    swap( index, parent_idx, heap );
    return sortIter( parent_idx );
  };

  heap.push(item);
  sortIter( heap.length - 1 );
  return heap;
}

function removeRoot(heap) {
  // TODO: 여기에 코드를 작성합니다.
  const sortIter_reverse = ( idx ) => {
    const lchild_idx = getLeftChild( idx );
    const rchild_idx = getRightChild( idx );
    let comp_idx;
    if( lchild_idx >= heap.length ) {
      heap.splice( idx, 1 );
      return ;
    }
    if( rchild_idx >= heap.length ) comp_idx = lchild_idx;
    else {
      comp_idx = (heap[lchild_idx] < heap[rchild_idx])? lchild_idx:rchild_idx;
    }
    if( heap[comp_idx] < heap[idx] ) {
      swap( comp_idx, idx, heap );
      sortIter_reverse( comp_idx );
    }
  };

  const getLeftChild = ( idx ) => {
    return 2 * idx + 1;
  };

  const getRightChild = ( idx ) => {
    return 2 * idx + 2;
  };

  heap[0] = Infinity;
  sortIter_reverse( 0 );
  return heap;
}

// 아래 코드는 수정하지 마세요.
const binaryHeap = function (arr) {
  return arr.reduce((heap, item) => {
    return insert(heap, item);
  }, []);
};

const heapSort = function (arr) {
  let minHeap = binaryHeap(arr);
  // TODO: 여기에 코드를 작성합니다.
  const sortIter = ( idx ) => {
    if( idx < 2 ) return ;

    const parent_idx = getParentIdx( idx );
    const lchild_idx = getLeftChild( parent_idx );
    const rchild_idx = getRightChild( parent_idx );
    let comp_idx = lchild_idx; 
    if( rchild_idx < minHeap.length ) {
      comp_idx = (minHeap[lchild_idx] < minHeap[rchild_idx])? lchild_idx:rchild_idx;
    }
    if( minHeap[parent_idx] > minHeap[comp_idx] ) {
      swap( comp_idx, parent_idx, minHeap );
      sortIter_reverse( comp_idx );      
      sortIter( parent_idx );
    }
  };

  const sortIter_reverse = ( idx ) => {
    const lchild_idx = getLeftChild( idx );
    const rchild_idx = getRightChild( idx );
    let comp_idx;
    if( lchild_idx >= minHeap.length ) return ;
    if( rchild_idx >= minHeap.length ) comp_idx = lchild_idx;
    else {
      comp_idx = (minHeap[lchild_idx] < minHeap[rchild_idx])? lchild_idx:rchild_idx;
    }
    if( minHeap[comp_idx] < minHeap[idx] ) {
      swap( comp_idx, idx, minHeap );
      sortIter_reverse( comp_idx );
    }
  };

  const getLeftChild = ( idx ) => {
    return 2 * idx + 1;
  };

  const getRightChild = ( idx ) => {
    return 2 * idx + 2;
  };

  for( let i = Math.floor(minHeap.length / 2) - 1; i >= 0 ; i-- ) {
    sortIter( i );
  }
  
  for( let i = minHeap.length - 1 ; i > 0 ; i-- ) { 
    const root = minHeap[0];
    removeRoot( minHeap );
    insert( minHeap, root );
    //sortIter( minHeap.length - 1 );
  }
  return minHeap;
}

console.log( heapSort([5,4,3,2,1]) );
