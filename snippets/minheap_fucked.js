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
  if ( !heap?.length ) return 0;
  const front = heap[1];
  swap(1, heap.length, heap);
  heap[heap.length] =  pow(2,31); 

  for (let i = 1; i * 2 <= heap.length - 1;)
  {
    if (heap[i] < heap[i * 2] && heap[i] < heap[i * 2 + 1]) break;
    else if (heap[i * 2] > heap[i * 2 + 1])
    {
      swap(i, i * 2 + 1, heap);
      i = i * 2 + 1;
    }
    else
    {
      swap(i, i * 2, heap);
      i = i * 2;
    }
  }
  return heap;
}

// 아래 코드는 수정하지 마세요.
const binaryHeap = function (arr) {
  return arr.reduce((heap, item) => {
    return insert(heap, item);
  }, []);
};

const heapSort = function (arr) {

  const heap = binaryHeap( arr );
  const n = arr.length;

  const heapify = (n, i) => {
    let smallest = i; // Initialize largest as root
    const l = 2 * i + 1; // left = 2*i + 1
    const r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n && heap[l] < heap[smallest]) smallest = l;
    // If right child is larger than largest so far
    if (r < n && heap[r] < heap[smallest]) smallest = r;

    // If largest is not root
    if (smallest !== i) {
      swap( i, smallest, heap );
      // Recursively heapify the affected sub-tree
      heapify( n, smallest );
    }
  };

  // Build heap (rearrange array)
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);

  // One by one extract an element from heap
  for (var i = n - 1; i > 0; i--) {
    swap( i, 0, heap );
    // call max heapify on the reduced heap
    heapify(i, 0);
  }
  return heap.reverse();
}

//console.log( heapSort([5,4,3,2,1]) );
console.log( heapSort([3,1,21]) );
