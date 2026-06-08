const fs = require("fs");

let data = "";

for (let i = 0; i < 500000; i++) {
    data += "NodeJS Stream Buffer Performance Testing\n";
}

fs.writeFileSync("largefile.txt", data);

console.log("Large file generated successfully.");