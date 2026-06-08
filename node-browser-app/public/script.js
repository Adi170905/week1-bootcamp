// =======================
// System Info Button
// =======================
document
    .getElementById("systemInfoBtn")
    .addEventListener("click", async () => {

        const response =
            await fetch("/system-info");

        const data =
            await response.json();

        document
            .getElementById(
                "systemInfoResult"
            )
            .innerHTML = `

            <h2>System Information</h2>

            <p>OS: ${data.os}</p>

            <p>
            Architecture:
            ${data.architecture}
            </p>

            <p>
            CPU Cores:
            ${data.cpuCores}
            </p>

            <p>
            Total Memory:
            ${data.totalMemory}
            </p>

            <p>
            Uptime:
            ${data.uptime}
            </p>

            <p>
            Current User:
            ${data.currentUser}
            </p>

            <p>
            Node Path:
            ${data.nodePath}
            </p>
        `;
    });
// =======================
// Generate Large File
// =======================
document
    .getElementById(
        "generateLargeFileBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/generate-large-file"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "largeFileStatus"
                )
                .innerText =
                data.message;
        }
    );
// =======================
// Buffer Test Button
// =======================
document
    .getElementById(
        "bufferTestBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/buffer-test"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "bufferResult"
                )
                .innerHTML = `

                <h2>
                Buffer Test
                </h2>

                <p>
                Characters:
                ${data.characters}
                </p>

                <p>
                Execution Time:
                ${data.executionTime}
                </p>

                <p>
                Memory Usage:
                ${data.memoryUsage}
                </p>
            `;
        }
    );
    // =======================
// Stream Test Button
// =======================
document
    .getElementById(
        "streamTestBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/stream-test"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "streamResult"
                )
                .innerHTML = `

                <h2>
                Stream Test
                </h2>

                <p>
                Characters:
                ${data.characters}
                </p>

                <p>
                Execution Time:
                ${data.executionTime}
                </p>

                <p>
                Memory Usage:
                ${data.memoryUsage}
                </p>
            `;
        }
    );
    
// =======================
// Generate Corpus Button
// =======================
document
    .getElementById("generateBtn")
    .addEventListener("click", async () => {

        const response =
            await fetch("/generate");

        const data =
            await response.json();

        document
            .getElementById(
                "generateStatus"
            )
            .innerText =
            data.message;
    });


// =======================
// Analyze Button
// =======================
document
    .getElementById("analyzeBtn")
    .addEventListener("click", async () => {

        const top =
            document
                .getElementById("top")
                .value;

        const minLen =
            document
                .getElementById(
                    "minLen"
                )
                .value;

        const response =
            await fetch(
                `/analyze?top=${top}&minLen=${minLen}`
            );

        const data =
            await response.json();

        document
            .getElementById("result")
            .innerHTML = `

            <h2>Results</h2>

            <p>
            Total Words:
            ${data.totalWords}
            </p>

            <p>
            Unique Words:
            ${data.uniqueWords}
            </p>

            <p>
            Longest Word:
            ${data.longestWord}
            </p>

            <p>
            Shortest Word:
            ${data.shortestWord}
            </p>

            <h3>Top Words</h3>

            <ul>
                ${data.topWords
                    .map(word =>
                        `<li>
                        ${word[0]} :
                        ${word[1]}
                        </li>`
                    )
                    .join("")}
            </ul>
        `;
    });


// =======================
// Concurrency Button
// =======================
document
    .getElementById(
        "concurrencyBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/concurrency"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "concurrencyResult"
                )
                .innerHTML = `

                <h2>
                Concurrency Results
                </h2>

                <p>
                Concurrency 1:
                ${data.concurrency1}
                </p>

                <p>
                Concurrency 4:
                ${data.concurrency4}
                </p>

                <p>
                Concurrency 8:
                ${data.concurrency8}
                </p>

                <p>
                Total Words:
                ${data.totalWords}
                </p>

                <p>
                Unique Words:
                ${data.uniqueWords}
                </p>
            `;
        }
    );
    // =======================
// Git Status Button
// =======================
document
    .getElementById(
        "gitStatusBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/git-status"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "gitStatusResult"
                )
                .innerText =
                data.output;
        }
    );


// =======================
// Git Log Button
// =======================
document
    .getElementById(
        "gitLogBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/git-log"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "gitLogResult"
                )
                .innerText =
                data.output;
        }
    );

// =======================
// Git Stash Button
// =======================
document
    .getElementById(
        "gitStashBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/git-stash"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "gitStashResult"
                )
                .innerText =
                data.output;
        }
    );


// =======================
// Git Stash Apply Button
// =======================
document
    .getElementById(
        "gitStashApplyBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/git-stash-apply"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "gitStashApplyResult"
                )
                .innerText =
                data.output;
        }
    );


// =======================
// Merge Conflict Button
// =======================
document
    .getElementById(
        "mergeConflictBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/merge-conflict"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "mergeConflictResult"
                )
                .innerText =
                data.output;
        }
    );


// =======================
// Git Revert Button
// =======================
document
    .getElementById(
        "gitRevertBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/git-revert"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "gitRevertResult"
                )
                .innerText =
                data.output;
        }
    );


// =======================
// Git Bisect Button
// =======================
document
    .getElementById(
        "gitBisectBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/git-bisect"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "gitBisectResult"
                )
                .innerText =
                data.output;
        }
    );

// =======================
// Slow API Button
// =======================
document
    .getElementById(
        "slowBtn"
    )
    .addEventListener(
        "click",
        async () => {

            document
                .getElementById(
                    "slowResult"
                )
                .innerText =
                "Loading...";

            const response =
                await fetch(
                    "/slow?ms=3000"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "slowResult"
                )
                .innerText =
                data.message;
        }
    );


// =======================
// Fake Authorization Button
// =======================
document
    .getElementById(
        "authBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/auth",
                    {
                        headers: {
                            Authorization:
                                "Bearer secret123"
                        }
                    }
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "authResult"
                )
                .innerText =
                JSON.stringify(
                    data,
                    null,
                    2
                );
        }
    );


// =======================
// Status Code Demo Button
// =======================
document
    .getElementById(
        "statusBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/status-demo"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "statusResult"
                )
                .innerText =
                JSON.stringify(
                    data,
                    null,
                    2
                );
        }
    );



// =======================
// Validation Button
// =======================
document
    .getElementById(
        "validateBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/validate"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "validateResult"
                )
                .innerText =
                data.message;
        }
    );


// =======================
// ESLint Button
// =======================
document
    .getElementById(
        "eslintBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/eslint"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "eslintResult"
                )
                .innerText =
                data.message;
        }
    );


// =======================
// Build Artifact Button
// =======================
document
    .getElementById(
        "buildBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/build"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "buildResult"
                )
                .innerText =
                data.message;
        }
    );


// =======================
// SHA Checksum Button
// =======================
document
    .getElementById(
        "checksumBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/checksum"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "checksumResult"
                )
                .innerText =
                data.checksum;
        }
    );


// =======================
// Task Scheduler Button
// =======================
document
    .getElementById(
        "scheduleBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/schedule"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "scheduleResult"
                )
                .innerText =
                data.message;
        }
    );

// =======================
// Compare Buffer vs Stream
// =======================
document
    .getElementById(
        "compareBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/compare"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "compareResult"
                )
                .innerHTML =
                `
<h2>Comparison Table</h2>

<table border="1">

<tr>
<th>Type</th>
<th>Characters</th>
<th>Execution Time</th>
<th>Memory Usage</th>
</tr>

<tr>
<td>Buffer</td>
<td>${data.buffer.characters}</td>
<td>${data.buffer.executionTime}</td>
<td>${data.buffer.memoryUsage}</td>
</tr>

<tr>
<td>Stream</td>
<td>${data.stream.characters}</td>
<td>${data.stream.executionTime}</td>
<td>${data.stream.memoryUsage}</td>
</tr>

</table>
`;
        }
    );

// =======================
// Echo API Button
// =======================
document
    .getElementById(
        "echoBtn"
    )
    .addEventListener(
        "click",
        async () => {

            const response =
                await fetch(
                    "/echo?name=aditya"
                );

            const data =
                await response.json();

            document
                .getElementById(
                    "echoResult"
                )
                .innerText =
                JSON.stringify(
                    data,
                    null,
                    2
                );
        }
    );


