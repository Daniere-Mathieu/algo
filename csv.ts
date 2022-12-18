const fs = require("fs").promises;
const fs2 = require("fs");
// const of end of line
const { EOL } = require("os");

// i create type data to have more clear resultat
type Data = {
  lastname: string;
  firstname: string;
  age: number;
  salary: number;
};
function generateRandomSalaray() {
  return Math.ceil(Math.random() * 10000);
}

/**
 * this function transform a data array to csv file (append to file)
 * @param data array of data
 * @param fileName the name of the file without extension
 */
async function writeInCsv(data: Data[], fileName: string): Promise<void> {
  const path = `./${fileName}.csv`;
  // i verify if my file doesn't exist
  if (!fs2.existsSync(path)) {
    // i create if the file not exist
    await fs.writeFile(path, "");
  }
  // i create a writestream to my file with "a" flag to append data
  let writeStream = fs2.createWriteStream(path, { flags: "a" });

  // i make a loop of forEach element of my data array and write into the file the line i create
  data.forEach((data, index) => {
    let newLine: any[] = [];
    newLine.push(`"${data.firstname}"`);
    newLine.push(`"${data.lastname}"`);
    newLine.push(data.age);
    newLine.push(data.salary);
    // i append to the file by join the newLine array and add a End of line
    writeStream.write(newLine.join(";") + EOL, () => {
      console.log("line write");
    });
  });

  // i finish the stream
  writeStream.end();

  // i use the event on write to check when my stream got and error or is finish and display a message
  writeStream
    .on("finish", () => {
      console.log("finish write file");
    })
    .on("error", (err: Error) => {
      console.log(err);
    });
}

/**
 *
 * @param fileName
 * @returns
 */
async function readCsv(fileName: string): Promise<unknown[][]> {
  const path = `./${fileName}.csv`;

  if (!fs2.existsSync(path)) {
    console.error("file doesn't exist");

    return [];
  }

  let finalArray: unknown[][] = [];

  const content: Buffer = await fs.readFile(path);

  let contentCut: string[] = content
    .toString()
    .replace(/(\r\n|\n|\r)/gm, "/")
    .split("/");
  contentCut.pop();

  const arrayOfValue = contentCut.map((value: string) => value.split(";"));

  arrayOfValue.forEach((values: string[]) => {
    finalArray.push(
      values.map((value) => {
        if (!isNaN(value as unknown as number)) return parseInt(value);
        return value.split('"').join("");
      })
    );
  });

  return finalArray;
}

/**
 * return the salary of the find user
 * @param firstname firstname of the person i want to find
 * @param lastname lastname of the person i want to find
 * @param array array of data
 * @returns the user find
 */
function findUserAndGetSalary(
  firstname: string,
  lastname: string,
  array: Data[]
): number {
  let index = 0;
  array.forEach((value, currentIndex) => {
    if (value.firstname === firstname && value.lastname === lastname) {
      index = currentIndex;
    }
  });
  return array[index].salary;
}
/**
 * @param array list of number
 * @returns Data with the smallest value
 */
function findSmallestValue(array: Data[]): void {
  let index = 0;
  array.forEach((value, currentIndex) => {
    if (array[index].salary > value.salary) {
      index = currentIndex;
    }
  });
  console.log(
    `${
      array[index].firstname + " " + array[index].lastname
    } est la personne qui gagne le moins`
  );
}
/**
 * @param array list of number
 * @returns Data with the highest value
 */
function findHighestValue(array: Data[]): void {
  let index = 0;
  array.forEach((value, currentIndex) => {
    if (array[index].salary < value.salary) {
      index = currentIndex;
    }
  });
  console.log(
    `${
      array[index].firstname + " " + array[index].lastname
    } est la personne qui gagne le plus`
  );
}
function findMoyenne(array: Data[]) {
  let acc: number = 0;
  array.forEach((value) => {
    acc += value.salary;
  });
  console.log("le salaire moyen est de " + acc / array.length);
}

function findMedianne(array: Data[]) {
  let middle = Math.floor(array.length / 2);
  let median: number = 0;
  if (array.length % 2 === 1) {
    // array has odd number of elements
    median = array[middle].salary;
  } else {
    // array has even number of elements
    median = (array[middle - 1].salary + array[middle].salary) / 2;
  }
  console.log("median est égal a " + median);
}

writeInCsv(
  [
    {
      age: 25,
      firstname: "yara",
      lastname: "torien",
      salary: generateRandomSalaray(),
    },
    {
      age: 40,
      firstname: "dono",
      salary: generateRandomSalaray(),
      lastname: "iam",
    },
    {
      age: 40,
      firstname: "dono",
      salary: generateRandomSalaray(),
      lastname: "iam",
    },
  ],
  "test"
).then(() => {
  readCsv("./test").then((values) => {
    const dataArray: Data[] = [];
    values.forEach((value) => {
      dataArray.push({
        firstname: value[0],
        lastname: value[1],
        age: value[2],
        salary: value[3],
      } as Data);
    });
    dataArray.sort((a, b) => a.salary - b.salary);
    console.log(dataArray);
    findHighestValue(dataArray);
    findSmallestValue(dataArray);
    findMoyenne(dataArray);
    findMedianne(dataArray);
  });
});
