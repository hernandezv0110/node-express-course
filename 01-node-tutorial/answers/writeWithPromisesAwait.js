const { writeFile, readFile } = require("fs").promises;

async function writer() {
  try {
    await writeFile(
      "./temporary/temp.txt",
      "First line\nSecond line\nThird line\n"
    );
  } catch (error) {
    console.error("Error writing to file: ", error);
  }
}

async function reader() {
  try {
    const data = await readFile("./temporary/temp.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.error("Error reading file: ", error);
  }
}

async function readWrite() {
  await writer();
  await reader();
}

readWrite();
