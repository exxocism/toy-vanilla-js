function barcode(len) {
  // TODO: 여기에 코드를 작성하세요.
  const barcode_info = Array(len).fill(null);

  for( let i = 0; i < len; i++ ) {
    const shit = {
      num: undefined,
      tried: []
    };
    barcode_info[i] = shit;
  }

  const BARCODE_SHOULD_FALL_BACK = -1;

  const getNextBarcode = (idx) => {
    for (let i = 1; i <= 3; i++) {
      if (
        !barcode_info[idx].hasOwnProperty('tried') ||
        !barcode_info[idx].tried.includes(i)
      )
        return i;
    }
    return BARCODE_SHOULD_FALL_BACK;
  };

  const getLastGoodBarcode = (idx) => {
    for (let i = idx; i >= 0; i--) {
      if (barcode_info[i].tried.length < 3) return i;
    }
  };

  const resetBarcodesAndTriedRecords = (idx) => {
    for (let i = idx; i < barcode_info.length; i++) {
      // if (barcode_info[i].hasOwnProperty("num")) delete barcode_info[i].num;
      if (barcode_info[i].hasOwnProperty("num")) barcode_info[i].num = undefined;
      if (barcode_info[i].hasOwnProperty("tried")) barcode_info[i].tried = [];
    }
  };

  const getBarcodeString = () => {
    let result = "";
    barcode_info.some((e) => {
      if (!e.hasOwnProperty("num") || !e.num ) return true;
      result += e.num;
    });
    return result;
  };

  const STRING_IS_VALID = -1;
  const hasStringDuplicatedNumber = (str) => {
    //const magicExp = /([0-9]+)\1/g;
    const magicExp = /([0-9]+)(?=\1)/g;
    const matchStr = str.match(magicExp);
    if (matchStr !== null ) {
      return str.lastIndexOf(matchStr);
    }
    return STRING_IS_VALID;
  };

  let i = 0;
  while (i >= 0 && i < len) {
    const barcodeSearched = getNextBarcode(i);

    if (barcodeSearched === BARCODE_SHOULD_FALL_BACK) {
      i = getLastGoodBarcode(i);
      resetBarcodesAndTriedRecords(i + 1);
      continue;
    }

    barcode_info[i].num = barcodeSearched;
    barcode_info[i].tried.push(barcodeSearched);

    const duplicatedSearch = hasStringDuplicatedNumber(getBarcodeString());
    if (duplicatedSearch !== STRING_IS_VALID) {
      i = getLastGoodBarcode(i);
      resetBarcodesAndTriedRecords(i + 1);
      continue;
    }
    i++;
  }
  return getBarcodeString();
}

// let output = barcode(3);
// console.log(output); // "121"
// output = barcode(7);
// console.log(output); // "1213121"
output = barcode(20);
console.log(output); // "12131231321231213123"
