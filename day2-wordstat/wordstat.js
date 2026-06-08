console.time("Execution Time");

const fs = require("fs");

const args = process.argv;

const fileName = args[args.indexOf("--file") + 1];
const topN = parseInt(args[args.indexOf("--top") + 1]);
const minLen = parseInt(args[args.indexOf("--minLen") + 1]);

const data = fs.readFileSync(fileName, "utf8");

const words = data
  .toLowerCase()
  .split(/\s+/)
  .filter(word => word.length >= minLen);

const frequency = {};

for (const word of words) {
  frequency[word] = (frequency[word] || 0) + 1;
}

const sortedWords = Object.entries(frequency)
  .sort((a, b) => b[1] - a[1]);

console.log("\nTotal Words:", words.length);

console.log("Unique Words:", Object.keys(frequency).length);

console.log(
  "Longest Word:",
  words.reduce((a, b) => a.length > b.length ? a : b, "")
);

console.log(
  "Shortest Word:",
  words.reduce((a, b) => a.length < b.length ? a : b)
);

console.log("\nTop Words:");

sortedWords
  .slice(0, topN)
  .forEach(([word, count]) => {
    console.log(word, count);
  });
const stats = {
  totalWords: words.length,
  uniqueWords: Object.keys(frequency).length,
  longestWord: words.reduce((a, b) =>
    a.length > b.length ? a : b, ""),
  shortestWord: words.reduce((a, b) =>
    a.length < b.length ? a : b),
  topWords: sortedWords.slice(0, topN)
};

fs.writeFileSync(
  "output/stats.json",
  JSON.stringify(stats, null, 2)
);

console.log("\nStatistics saved to output/stats.json");
console.timeEnd("Execution Time");