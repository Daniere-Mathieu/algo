const arrayTest = [14, 18, 500, 18];

/**
 * this function pass the array in reduce method and for each turn if acc is inferior to current value acc keep the value else acc get current value
 * @param array list of number
 * @returns number with the smallest value
 */
function findSmallestValue(array: number[]): number {
  return array.reduce((acc, current) => (acc < current ? acc : current));
}
/**
 * this function pass the array in reduce method and for each turn if acc is superior to current value acc keep the value else acc get current value
 * @param array list of number
 * @returns number with the highest value
 */
function findHighestValue(array: number[]): number {
  return array.reduce((acc, current) => (acc > current ? acc : current));
}

// the same algorithm can be realise without reduce just set a variable acc before a foor loop and
// do the ternary with the current element
console.log(findSmallestValue(arrayTest));
console.log(findHighestValue(arrayTest));
