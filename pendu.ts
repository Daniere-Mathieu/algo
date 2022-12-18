const fs = require("fs").promises;

// i create a realine interface and select the output and input with defaut system who call the CLI
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
  return Math.floor(Math.random() * max);
}

// list of random word
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

// i create an async environement to use await event (in commonJs to use await instruction we need to be in async method)
// this type of environement is generally call closure
async function pendu() {
  let life: number = 10;
  // i read my file who contains ans asci draw and display it with console.log
  const data = await fs.readFile("./pendu.ascii.txt", "utf8");
  console.log(data);
  // i get a random word and transform it to lowerCase
  const stringtoFind: string =
    randomWord[getRandomInt(randomWord.length)].toLocaleLowerCase();
  // i create tab , this array will containt the word the word transform to underscore
  const tab: string[] = [];
  for (let i = 0; i < stringtoFind.length; i++) {
    // i transform the tab array in an loop equal to the number letter in the word to find
    // i treat specific case like space else i place an underscore
    if (stringtoFind[i] === " ") {
      tab[i] = " ";
    } else if (stringtoFind[i] === "'") {
      tab[i] = "'";
    } else {
      tab[i] = "_";
    }
  }
  // i display the tab array and the number of life
  // i use JSON.stringify to have a better display in the terminal
  console.log(JSON.stringify(tab), `il vous reste ${life} vie`);

  /**
   * this function compare each character and replace it if there good
   * @param userCharacter the character the user send
   * @param stringtoFind the string the user need to find
   * @param tab the array display at the user
   */
  function findCharacterAndReplace(
    userCharacter: string,
    stringtoFind: string,
    tab: string[]
  ): void {
    // i prepare a temp variable before my loop to know if my user need to loose a life or not
    // this var become true when my user find one letter in the word and i will not loose a life
    let looseLife = false;

    // i make a loop to compare each character of the stringToFind and the userCharacter and replace the value if there egals
    for (let i = 0; i < stringtoFind.length; i++) {
      if (stringtoFind[i] === userCharacter) {
        tab[i] = userCharacter;
        looseLife = true;
      }
    }
    // i remove a life if looselife is false
    if (!looseLife) life--;
  }

  /**
   * verify if all character is different of "_"
   * @param tab the array display at the user
   * @returns true if the word is complete else false
   */
  function isAllCharacterFind(tab: string[]): boolean {
    for (let i = 0; i < tab.length; i++) {
      if (tab[i] === "_") return false;
    }
    return true;
  }

  /**
   * check if the word pass by the user is equal to the stringToFind
   * @param word word pass by the character
   * @returns false if the word is wrong and true if the word is equals
   */
  function isTheWord(word: string): boolean {
    if (word !== stringtoFind) {
      life--;
      return false;
    }
    // i change my tab to the right string
    for (let i = 0; i < tab.length; i++) {
      tab[i] = stringtoFind[i];
    }
    return true;
  }

  /**
   * recursive function who verify if the game is finish or not and launch the readline prompt
   * this function is recursive because i want to train my recursive thinking but a while loop will be more easy and optmized for that case
   */
  function readlinePrompt() {
    // i verify if the user have life
    if (life === 0) {
      console.log("you loose  word was: " + stringtoFind);
      readline.close();
      return;
    }
    // i verify if the word is comple
    if (isAllCharacterFind(tab)) {
      console.log("you win the word was: " + stringtoFind);
      readline.close();
      return;
    }

    // else i question the user wicht character do he want to try
    readline.question("entrez un character: ", (character: string) => {
      // i verify if the character length is egals to 1 else i consider character as a word and compare with the original word
      if (character.length === 1) {
        // i transform the character to lowerCase and try to find it in the word
        character.toLocaleLowerCase();
        findCharacterAndReplace(character, stringtoFind, tab);
      } else {
        // i comparer the word
        isTheWord(character);
      }
      // display the result to the user
      console.log(JSON.stringify(tab), `il vous reste ${life} vie`);
      // i recall the function recursively
      readlinePrompt();
    });
  }
  // i start my recursive function
  readlinePrompt();
}
// i start my closure
pendu();
