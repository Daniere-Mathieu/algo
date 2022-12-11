const ArrayTest = [50, 64, 74, 94, 174, 14, 50, -45, 170, 150000, -70000, 15];

/**
 *  this method will start the recursive call and divide the array into sub array
 *  each recursive execpt when array size = 1 will call the function merge
 * @param array the array who need to be sort
 * @returns orderer array
 */
function tri(array: number[]): number[] {
  // if the number of element on my array is 1 i return my array to be use by merge or if my first array contained only one element i will return it directly
  if (array.length <= 1) {
    return array;
  } else {
    // else i cut my array in two (Floor can be change by ceil without probleme) and round to less
    const mid = Math.floor(array.length / 2);
    const right = array.slice(mid);
    const left = array.slice(0, mid);

    // i call the function merge and call in recursive tri cut my sub array into another subarray
    // each tri function will call merge to return the sort array to have a progressive sort
    return merge(tri(left), tri(right));
  }
}

/**
 *
 * @param left right part of the array cut by tri function
 * @param right right part of the array cut by tri function
 * @returns
 */
function merge(left: number[], right: number[]): number[] {
  // I initiate my instance variables
  let resultArray: number[] = [],
    leftIndex = 0,
    rightIndex = 0;

  // I make a while loop as long as my indexes do not exceed the size of my sub array
  while (leftIndex < left.length && rightIndex < right.length) {
    // i comparer who is the smalest value between two array and  i push to the array the smalest , and increment the smalest array index
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  // after the loop i push the unaddedElement to dont loose the highest value
  if (left[leftIndex]) {
    const unaddedElements = left.slice(leftIndex);
    resultArray.push(...unaddedElements);
  } else {
    const unaddedElements = right.slice(rightIndex);
    resultArray.push(...unaddedElements);
  }

  // i return the sort sub array
  return resultArray;
}
console.log(tri(ArrayTest));
