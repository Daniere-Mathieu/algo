const fs = require("fs").promises;

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

const randomWord: string[] = [
  "carotte",
  "licorne",
  "chat",
  "chien",
  "port",
  "phare",
  "omonculus",
  "tarte a la praline",
  "Interview",
  "Position",
  "Geyser",
  "Coupe",
  "Vitrine",
  "Infection",
];
async function pendu() {
  let life: number = 10;
  const data = await fs.readFile("./pendu.ascii.txt", "utf8");
  console.log(data);
  const stringtoFind: string =
    randomWord[getRandomInt(randomWord.length)].toLocaleLowerCase();

  const tab: string[] = [];
  for (let i = 0; i < stringtoFind.length; i++) {
    if (stringtoFind[i] === " ") {
      tab[i] = " ";
    } else if (stringtoFind[i] === "'") {
      tab[i] = "'";
    } else {
      tab[i] = "_";
    }
  }
  console.log(JSON.stringify(tab), `il vous reste ${life} vie`);

  // i define the function here
  function findCharacterAndReplace(
    UserCharacter: string,
    stringtoFind: string,
    tab: string[]
  ): void {
    let looseLife = false;

    for (let i = 0; i < stringtoFind.length; i++) {
      if (stringtoFind[i] === UserCharacter) {
        tab[i] = UserCharacter;
        looseLife = true;
      }
    }
    if (!looseLife) life--;
  }

  function isAllCharacterFind(tab: string[]): boolean {
    for (let i = 0; i < tab.length; i++) {
      if (tab[i] === "_") return false;
    }
    return true;
  }
  function isTheWord(character: string): boolean {
    if (character !== stringtoFind) {
      life--;
      return false;
    }
    for (let i = 0; i < tab.length; i++) {
      tab[i] = stringtoFind[i];
    }
    return true;
  }

  function readlinePrompt() {
    if (life === 0) {
      console.log("you loose  word was: " + stringtoFind);
      readline.close();
      return;
    }

    if (isAllCharacterFind(tab)) {
      console.log("you win the word was: " + stringtoFind);
      readline.close();
      return;
    }

    readline.question("entrez un character: ", (character: string) => {
      if (character.length === 1) {
        character.toLocaleLowerCase();
        findCharacterAndReplace(character, stringtoFind, tab);
        console.log(JSON.stringify(tab), `il vous reste ${life} vie`);
      } else {
        isTheWord(character);
      }

      readlinePrompt();
    });
  }
  readlinePrompt();
}
pendu();
