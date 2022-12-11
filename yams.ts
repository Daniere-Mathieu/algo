const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getRandomInt(max: number): number {
  return Math.ceil(Math.random() * max);
}

let tab: number[] = [];

function verifyYams(tab: number[]) {
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

function getNumberOfDice(tab: number[], length: number): void {
  for (let i = 0; i < length; i++) {
    tab[i] = getRandomInt(6);
  }
}

readline.question("lancer les dés ?", (character: string) => {
  getNumberOfDice(tab, 6);
  if (character === "piper") tab = [6, 6, 6, 6, 6, 6];
  console.log(JSON.stringify(tab));
  if (verifyYams(tab)) {
    console.log("Yams !!!!");
  } else {
    console.log("Vous avez perdu !!!");
  }
  readline.close();
});
