const fs = require("fs");

const words = [
  "nodejs",
  "javascript",
  "backend",
  "server",
  "memory",
  "thread",
  "worker",
  "performance",
  "promise",
  "async"
];

let corpus = "";

for (let i = 0; i < 225000; i++) {
  corpus += words[Math.floor(Math.random() * words.length)] + " ";
}

fs.writeFileSync("corpus.txt", corpus);

console.log("Corpus generated successfully.");