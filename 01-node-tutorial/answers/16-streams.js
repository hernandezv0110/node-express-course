const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200, // Adjust this value to test different chunk sizes
});

let count = 0;

stream.on("data", (chunk) => {
  count++;
  console.log(chunk);
});

stream.on("end", () => {
  console.log(`Total chunks: ${count}`);
});

stream.on("error", (error) => {
  console.error("An error occurred: ", error);
});
