const arrayTest = [14, 18, 500, 18];
// je crée une fonction qui contient une bouche js qui retourne une valeur (nommé acc pour accumulateur)
// et si je vois que acc est inferieur que a current (qui est mon élément courant dans mon tableau) je lui rassigne ça valeur sinon je lui donne la valeur de current,
function findSmallestValue(array: number[]) {
  return array.reduce((acc, current) => (acc < current ? acc : current));
}
function findHighestValue(array: number[]) {
  return array.reduce((acc, current) => (acc > current ? acc : current));
}
console.log(findHighestValue(arrayTest));
