const string = "salut";
const character = "a";

function findCharacter(stringToRead: string, character: string): number {
  let numberOfCharacter = 0;
  for (let i = 0; i < stringToRead.length; i++) {
    if (stringToRead[i] === character) numberOfCharacter++;
  }

  return numberOfCharacter;
}

console.log(findCharacter(string, character));
