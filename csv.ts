const fs = require("fs").promises;
const fs2 = require("fs");

type Data = {
  lastname: string;
  firstname: string;
  age: number;
  salary: number;
};
async function writeInCsv(data: Data[], fileName: string) {
  const path = `./${fileName}.csv`;
  if (!fs2.existsSync(path)) {
    await fs.writeFile(path, "");
  }
  let writeStream = fs2.createWriteStream(path, { flags: "a" });

  data.forEach((data, index) => {
    let newLine: any[] = [];
    newLine.push(`"${data.firstname}"`);
    newLine.push(`"${data.lastname}"`);
    newLine.push(data.age);
    newLine.push(data.salary);

    writeStream.write(newLine.join(";") + "\n", () => {
      console.log("line write");
    });
  });

  writeStream.end();

  writeStream
    .on("finish", () => {
      console.log("finish write file");
    })
    .on("error", (err: Error) => {
      console.log(err);
    });
}

async function writeInJson(data: number[], fileName: string) {
  let content = await fs.readFile(`./${fileName}.json`);
  content = JSON.parse(content);
  await fs.writeFile(
    `./${fileName}.json`,
    JSON.stringify(content.concat(data))
  );
}

//writeInJson([1, 2, 5000, 7400, -741, 78881], "test");

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

writeInCsv(
  [
    { age: 40, firstname: "vic", lastname: "torien", salary: 3700 },
    { age: 25, firstname: "will", salary: 700, lastname: "iam" },
  ],
  "test"
).then(() => {
  readCsv("./test").then((values) => {
    values.forEach((value) => {
      console.log(
        `l'utilisateur ${value[0]} ${value[1]} gagne ${value[3]} à ${value[2]} ans`
      );
    });
  });
});
