const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * this function return a random number
 * @param max the limit of the random int you want to get
 * @returns random number
 */
function getRandomInt(max: number): number {
  // i use ceil to have a number between 1 and 6 not between 0 and 5
  return Math.ceil(Math.random() * max);
}

let tab: number[] = [];

/**
 * this function verify if you got a yams
 * @param tab array of number i want to test
 * @returns return true if all the character is eqal else i return false
 */
function verifyYams(tab: number[]): boolean {
  let IsInvalid: boolean = true;
  for (let i = 0; i < tab.length; i++) {
    const superiorIndex = i + 1 < tab.length ? i + 1 : i;
    if (tab[i] !== tab[superiorIndex]) {
      IsInvalid = false;
      break;
    }
  }
  return IsInvalid;
}

/**
 * give to the reference array a list of random number
 * @param tab the array i want to give the number
 * @param length the number of number in the array
 */
function getNumberOfDice(tab: number[], length: number): void {
  // i make a loop to give to my reference array a random Int
  for (let i = 0; i < length; i++) {
    tab[i] = getRandomInt(6);
  }
}

readline.question("lancer les dés ?", (character: string) => {
  getNumberOfDice(tab, 6);
  // i allow user to cheat , if user enter "piper" i will win
  if (character === "piper") tab = [6, 6, 6, 6, 6, 6];
  // i display my array
  console.log(JSON.stringify(tab));
  // i verify if user have win or losse and display a message in each case
  if (verifyYams(tab)) {
    console.log("Yams !!!!");
  } else {
    console.log("Vous avez perdu !!!");
  }
  readline.close();
});
