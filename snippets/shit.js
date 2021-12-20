
const mergeSort = (arr, cb) => {

    const merge = (left, right, cb = (item) => item) => {
      let merged = [];
      let leftIdx = 0, rightIdx = 0;
      const size = left.length + right.length;
  
      for (let i = 0; i < size; i++) {
        if (leftIdx >= left.length) {
          merged.push(right[rightIdx]);
          rightIdx++;
        } else if ( rightIdx >= right.length || cb(left[leftIdx]) < cb(right[rightIdx])) {
          merged.push(left[leftIdx]);
          leftIdx++;
        } else {
          merged.push(right[rightIdx]);
          rightIdx++;
        }
      };
  
      return merged;
    };

    const recursive = (start, end) => {
      if (start >= end) return [arr[start]];
      const mid = Math.floor((start + end) / 2);
      const right = recursive(start, mid);
      const left = recursive(mid + 1, end);
      return merge(left, right, cb);
    };
    
    return recursive(0, arr.length - 1);

  };
