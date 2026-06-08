 ## Day 2 - Node CLI App + Concurrency + Large Data Processing

## Task 1: Corpus Generation
A corpus file containing more than 200,000 words was generated using a Node.js script.
### File Created
* generate.js
* corpus.txt
### Command Used
node generate.js

### Output
corpus.txt generated successfully
![screenshot](screenshots/corpusGeneration.png)


## Task 2: Word Statistics CLI Tool

A command-line application named `wordstat.js` was developed to analyze text data.

### Features Implemented

* Total word count
* Unique word count
* Longest word detection
* Shortest word detection
* Top repeated words
* Minimum word length filtering

### Command Used
node wordstat.js --file corpus.txt --top 10 --minLen 5

### Sample Output

Total Words: 250000
Unique Words: 10
Longest Word: performance
Shortest Word: async
![screenshot](screenshots/CLI Tool.png)



## Task 3: JSON Report Generation

The application exports statistics into a JSON file.

### Generated File
output/stats.json


### Purpose

* Store analysis results in structured format.
* Enable further processing and reporting.
![screenshot](screenshots/stats.png)


## Task 4: Performance Measurement

Execution time was measured using:


console.time("Execution Time");
console.timeEnd("Execution Time");


Memory usage was measured using:
process.memoryUsage();

### Purpose

* Evaluate runtime performance.
* Analyze memory consumption.
* Establish a benchmark for concurrency testing.
![screenshot](screenshots/perf-summary.png)

## Task 5: Concurrency Processing

A concurrency implementation was developed using Promise.all()

### Features
* Dataset divided into chunks.
* Chunks processed concurrently.
* Local frequency maps generated for each chunk.
* Performance measured across multiple concurrency levels.

### Concurrency Benchmark Results

 Concurrency Level   Execution Time 

  1                   32 ms          
  4                   18 ms          
  8                   15 ms          

![screenshot](screenshots/concurrency.png)