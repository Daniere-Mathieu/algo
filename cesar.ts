let stringToCrypte: string = "salutz";

stringToCrypte = stringToCrypte.toLocaleUpperCase();
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

function crypte(
  stringToCrypte: string,
  crypte: number,
  uncrypte?: boolean
): string | false {
  if (crypte >= 26) return false;

  let stringCrypte: string = "";

  for (let i = 0; i < stringToCrypte.length; i++) {
    let letterIndex: number = 0;
    while (stringToCrypte[i] !== alphabet[letterIndex]) {
      if (
        stringToCrypte[i] === alphabet[letterIndex] ||
        letterIndex > alphabet.length
      )
        break;
      letterIndex++;
    }
    letterIndex = uncrypte ? letterIndex - crypte : letterIndex + crypte;
    letterIndex = letterIndex < 0 ? letterIndex + 26 : letterIndex;
    letterIndex = letterIndex >= 26 ? letterIndex - 26 : letterIndex;
    stringCrypte += alphabet[letterIndex];
  }
  return stringCrypte;
}

const variable = crypte(stringToCrypte, 25) as string;

console.log(variable);
console.log(crypte(variable, 25, true));
