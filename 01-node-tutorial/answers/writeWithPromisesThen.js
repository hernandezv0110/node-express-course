const { writeFile, readFile } = require("fs").promises;

writeFile("./temporary/temp.txt", "This is for write with then promise\n")
  .then(() => {
    return writeFile("./temporary/temp.txt", "Second line\n", { flag: "a" });
  })
  .then(() => {
    return writeFile("./temporary/temp.txt", "Third line\n", { flag: "a" });
  })
  .then(() => {
    return readFile("./temporary/temp.txt", "utf8");
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
