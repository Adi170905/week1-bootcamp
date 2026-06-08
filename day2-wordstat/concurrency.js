const fs = require("fs");

const text = fs.readFileSync("corpus.txt", "utf8");

const words = text.split(/\s+/);

function processWords() {
  const freq = {};

  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  return Object.keys(freq).length;
}

function benchmark(iterations) {
  const start = Date.now();

  for (let i = 0; i < iterations; i++) {
    processWords();
  }

  return Date.now() - start;
}

const result = {
  concurrency1: benchmark(1) + "ms",
  concurrency4: benchmark(4) + "ms",
  concurrency8: benchmark(8) + "ms",
  totalWords: words.length,
  uniqueWords: processWords()
};

console.log(result);