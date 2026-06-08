const fs = require("fs");

console.time("Stream Read");

let characters = 0;

const stream = fs.createReadStream("largefile.txt", "utf8");

stream.on("data", (chunk) => {
    characters += chunk.length;
});

stream.on("end", () => {
    console.log("Characters:", characters);

    console.timeEnd("Stream Read");

    console.log(process.memoryUsage());
});