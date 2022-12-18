function findCharacter(stringToRead: string, character: string): number {
  // i init the number of character bofore my loop
  let numberOfCharacter = 0;
  for (let i = 0; i < stringToRead.length; i++) {
    // for each turn of loop if character is egals to current character in string in test i incremente numberOfCharacter
    if (stringToRead[i] === character) numberOfCharacter++;
  }
  // i return numberOfCharacter
  return numberOfCharacter;
}
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("what word do you want to test ?", (word: string) => {
  let string: string = word;
  readline.question("what character do you want to test ?", (char: string) => {
    let character: string = char;
    readline.close();
    console.log(findCharacter(string, character));
  });
});
