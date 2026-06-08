const fs = require("fs");

console.time("Buffer Read");

const data = fs.readFileSync("largefile.txt", "utf8");

console.log("Characters:", data.length);

console.timeEnd("Buffer Read");

console.log(process.memoryUsage());