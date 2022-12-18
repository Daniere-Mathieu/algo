const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

/**
 * this function transform the string with cesar algorithm
 * @param stringToCrypte the string (crypted or note)
 * @param crypte the number of caractere i want to transform for cesar algorithm
 * @param uncrypte optionnal boolean to uncrypte the string (true to decryt)
 * @returns the string crypte or uncrypte or false
 */
function crypte(
  stringToCrypte: string,
  crypte: number,
  uncrypte?: boolean
): string | false {
  // i return false if my crypte number is egal to 26 or superior because that useless to have an highter
  // or to have 0 or inferior because that useless
  if (crypte >= 26 || crypte <= 0) return false;

  // i init the string where i will store the crypte string
  let stringCrypte: string = "";

  // i create a loop for each character in the string i need to crypte
  // a string is in reality a array of character so i can use .length on it with the prototype chain
  for (let i = 0; i < stringToCrypte.length; i++) {
    let letterIndex: number = 0;
    // i create a while to get the position of the character in my alphabet array
    while (stringToCrypte[i] !== alphabet[letterIndex]) {
      // i verify if alphabet at letter index is equal to current character and if
      if (
        stringToCrypte[i] === alphabet[letterIndex] ||
        letterIndex > alphabet.length
      )
        // i break the while loop when i found the good index; the if will break without increment letterIndex
        break;
      // i increment letterIndex for the next turn
      letterIndex++;
    }
    // i use a ternary condition to add or remove crypte number to letter index
    letterIndex = uncrypte ? letterIndex - crypte : letterIndex + crypte;
    // i verify if my index is between 0 and 25 (25 because my index start at 0 and not 1)
    // if that not the case i add or remove 26
    letterIndex = letterIndex < 0 ? letterIndex + 26 : letterIndex;
    letterIndex = letterIndex >= 26 ? letterIndex - 26 : letterIndex;

    // i add to the reponse string the character i get
    stringCrypte += alphabet[letterIndex];
  }
  // i return the crypted string
  return stringCrypte;
}

readline.question("what word do you want to crypte ?", (string: string) => {
  // the string i want to crypte
  let stringToCrypte: string = string;
  // i convert the string to UpperCase because my alphabet array is only on Uppercase
  stringToCrypte = stringToCrypte.toLocaleUpperCase();
  const variable = crypte(stringToCrypte, 25) as string;

  console.log(variable);
  console.log(crypte(variable, 25, true));
  readline.close();
});
