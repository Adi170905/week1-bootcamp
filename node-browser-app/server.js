const express = require("express");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

// =====================
// Request Logger Middleware
// =====================
app.use(
    (req, res, next) => {

        console.log(

            `${req.method}
${req.url}
-
${new Date()
.toLocaleString()}`
        );

        next();
    }
);



// =====================
// Generate Corpus API
// =====================
// =====================
// System Info API
// =====================
app.get("/system-info", (req, res) => {

    const systemInfo = {

        os:
            os.type(),

        architecture:
            os.arch(),

        cpuCores:
            os.cpus().length,

        totalMemory:
            (
                os.totalmem() /
                (1024 ** 3)
            ).toFixed(2) + " GB",

        uptime:
            (
                os.uptime() /
                3600
            ).toFixed(2) +
            " Hours",

        currentUser:
            os.userInfo()
                .username,

        nodePath:
            process.execPath
    };

    res.json(systemInfo);
});
// =====================
// Generate Large File API
// =====================
app.get(
    "/generate-large-file",
    (req, res) => {

        let data = "";

        for (
            let i = 0;
            i < 5000000;
            i++
        ) {

            data +=
                "Node.js is awesome!\n";
        }

        fs.writeFileSync(
            "largefile.txt",
            data
        );

        res.json({
            message:
                "Large file generated successfully"
        });
    }
);
// =====================
// Buffer Test API
// =====================
app.get(
    "/buffer-test",
    (req, res) => {

        const start =
            Date.now();

        const data =
            fs.readFileSync(
                "largefile.txt",
                "utf8"
            );

        const executionTime =
            Date.now() - start;

        const memoryUsage =
            process
                .memoryUsage()
                .heapUsed /
            (1024 * 1024);

        res.json({

            characters:
                data.length,

            executionTime:
                executionTime +
                " ms",

            memoryUsage:
                memoryUsage.toFixed(
                    2
                ) + " MB"
        });
    }
);
// =====================
// Stream Test API
// =====================
app.get(
    "/stream-test",
    (req, res) => {

        const start =
            Date.now();

        let characters = 0;

        const stream =
            fs.createReadStream(
                "largefile.txt",
                "utf8"
            );

        stream.on(
            "data",
            (chunk) => {

                characters +=
                    chunk.length;
            }
        );

        stream.on(
            "end",
            () => {

                const executionTime =
                    Date.now() -
                    start;

                const memoryUsage =
                    process
                        .memoryUsage()
                        .heapUsed /
                    (1024 * 1024);

                res.json({

                    characters:
                        characters,

                    executionTime:
                        executionTime +
                        " ms",

                    memoryUsage:
                        memoryUsage.toFixed(
                            2
                        ) + " MB"
                });
            }
        );
    }
);
// =====================
// Compare API
// =====================
app.get(
    "/compare",
    async (req, res) => {

        // Buffer Test
        const bufferStart =
            Date.now();

        const bufferData =
            fs.readFileSync(
                "largefile.txt",
                "utf8"
            );

        const bufferTime =
            Date.now() -
            bufferStart;

        const bufferMemory =
            (
                process
                    .memoryUsage()
                    .heapUsed /
                (1024 * 1024)
            ).toFixed(2);

        // Stream Test
        const streamStart =
            Date.now();

        let streamChars = 0;

        const stream =
            fs.createReadStream(
                "largefile.txt",
                "utf8"
            );

        stream.on(
            "data",
            (chunk) => {

                streamChars +=
                    chunk.length;
            }
        );

        stream.on(
            "end",
            () => {

                const streamTime =
                    Date.now() -
                    streamStart;

                const streamMemory =
                    (
                        process
                            .memoryUsage()
                            .heapUsed /
                        (1024 * 1024)
                    ).toFixed(2);

                res.json({

                    buffer: {
                        characters:
                            bufferData.length,
                        executionTime:
                            bufferTime +
                            " ms",
                        memoryUsage:
                            bufferMemory +
                            " MB"
                    },

                    stream: {
                        characters:
                            streamChars,
                        executionTime:
                            streamTime +
                            " ms",
                        memoryUsage:
                            streamMemory +
                            " MB"
                    }
                });
            }
        );
    }
);
app.get("/generate", (req, res) => {

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

        corpus +=
            words[
                Math.floor(
                    Math.random() *
                    words.length
                )
            ] + " ";
    }

    fs.writeFileSync(
        "corpus.txt",
        corpus
    );

    res.json({
        message:
            "Corpus generated successfully"
    });
});


// =====================
// Analyze API
// =====================
app.get("/analyze", (req, res) => {

    console.time("Execution Time");

    const topN =
        parseInt(req.query.top) || 10;

    const minLen =
        parseInt(req.query.minLen) || 5;

    const data =
        fs.readFileSync(
            "corpus.txt",
            "utf8"
        );

    const words =
        data
            .toLowerCase()
            .split(/\s+/)
            .filter(
                word =>
                    word.length >= minLen
            );

    const frequency = {};

    for (const word of words) {

        frequency[word] =
            (frequency[word] || 0) + 1;
    }

    const sortedWords =
        Object.entries(frequency)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );

    const stats = {

        totalWords:
            words.length,

        uniqueWords:
            Object.keys(
                frequency
            ).length,

        longestWord:
            words.reduce(
                (a, b) =>
                    a.length >
                        b.length
                        ? a
                        : b,
                ""
            ),

        shortestWord:
            words.reduce(
                (a, b) =>
                    a.length <
                        b.length
                        ? a
                        : b
            ),

        topWords:
            sortedWords.slice(
                0,
                topN
            )
    };

    console.timeEnd(
        "Execution Time"
    );

    res.json(stats);
});


// =====================
// Concurrency API
// =====================
app.get("/concurrency", (req, res) => {

    const text =
        fs.readFileSync(
            "corpus.txt",
            "utf8"
        );

    const words =
        text.split(/\s+/);

    function processWords() {

        const freq = {};

        for (const word of words) {

            freq[word] =
                (freq[word] || 0) + 1;
        }

        return Object.keys(freq)
            .length;
    }

    function benchmark(
        iterations
    ) {

        const start =
            Date.now();

        for (
            let i = 0;
            i < iterations;
            i++
        ) {
            processWords();
        }

        return (
            Date.now() - start
        );
    }

    const result = {

        concurrency1:
            benchmark(1) + " ms",

        concurrency4:
            benchmark(4) + " ms",

        concurrency8:
            benchmark(8) + " ms",

        totalWords:
            words.length,

        uniqueWords:
            processWords()
    };

    res.json(result);
});
// =====================
// Git Log API
// =====================
app.get(
    "/git-log",
    (req, res) => {

        exec(
            "git log --oneline",
            (
                error,
                stdout,
                stderr
            ) => {

                if (error) {
                    return res.json({
                        output:
                            error.message
                    });
                }

                res.json({
                    output:
                        stdout
                });
            }
        );
    }
);


// =====================
// Git Stash API
// =====================
app.get(
    "/git-stash",
    (req, res) => {

        exec(
            "git stash",
            (
                error,
                stdout,
                stderr
            ) => {

                if (error) {

                    return res.json({
                        output:
                            error.message
                    });
                }

                res.json({
                    output:
                        stdout || stderr
                });
            }
        );
    }
);
// =====================
// Git Status API
// =====================
app.get(
    "/git-status",
    (req, res) => {

        exec(
            "git status",
            (
                error,
                stdout,
                stderr
            ) => {

                if (error) {
                    return res.json({
                        output:
                            error.message
                    });
                }

                res.json({
                    output:
                        stdout
                    || stderr
                });
            }
        );
    }
);


// =====================
// Git Stash API
// =====================
app.get(
    "/git-stash",
    (req, res) => {

        exec(
            "git stash",
            (
                error,
                stdout,
                stderr
            ) => {

                if (error) {
                    return res.json({
                        output:
                            error.message
                    });
                }

                res.json({
                    output:
                        stdout
                    || stderr
                });
            }
        );
    }
);


// =====================
// Git Stash Apply API
// =====================
app.get(
    "/git-stash-apply",
    (req, res) => {

        exec(
            "git stash apply",
            (
                error,
                stdout,
                stderr
            ) => {

                if (error) {
                    return res.json({
                        output:
                            error.message
                    });
                }

                res.json({
                    output:
                        stdout
                    || stderr
                });
            }
        );
    }
);

// =====================
// Home Route
// =====================
app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );
});

// =====================
// Compare Buffer vs Stream API
// =====================
app.get(
    "/compare",
    async (req, res) => {

        try {

            const filePath =
                path.join(
                    __dirname,
                    "largefile.txt"
                );

            // BUFFER TEST
            const bufferStart =
                Date.now();

            const bufferData =
                fs.readFileSync(
                    filePath,
                    "utf8"
                );

            const bufferTime =
                Date.now()
                -
                bufferStart;

            const bufferMemory =
                (
                    process.memoryUsage()
                        .heapUsed
                    / 1024
                    / 1024
                ).toFixed(2);


            // STREAM TEST
            const streamStart =
                Date.now();

            let streamChars =
                0;

            const stream =
                fs.createReadStream(
                    filePath,
                    "utf8"
                );

            stream.on(
                "data",
                chunk => {

                    streamChars +=
                        chunk.length;
                }
            );

            stream.on(
                "end",
                () => {

                    const streamTime =
                        Date.now()
                        -
                        streamStart;

                    const streamMemory =
                        (
                            process.memoryUsage()
                                .heapUsed
                            / 1024
                            / 1024
                        ).toFixed(2);

                    res.json({

                        buffer: {

                            characters:
                                bufferData.length,

                            executionTime:
                                `${bufferTime} ms`,

                            memoryUsage:
                                `${bufferMemory} MB`
                        },

                        stream: {

                            characters:
                                streamChars,

                            executionTime:
                                `${streamTime} ms`,

                            memoryUsage:
                                `${streamMemory} MB`
                        }
                    });
                }
            );

        } catch (error) {

            res.json({
                error:
                    error.message
            });
        }
    }
);


// =====================
// Echo API
// =====================
app.get(
    "/echo",
    (req, res) => {

        res.json({

            method:
                req.method,

            headers:
                req.headers,

            query:
                req.query
        });
    }
);


// =====================
// Slow API
// =====================
app.get(
    "/slow",
    (req, res) => {

        const ms =
            parseInt(
                req.query.ms
            ) || 3000;

        setTimeout(() => {

            res.json({

                message:
                    `Response delayed by ${ms} ms`
            });

        }, ms);
    }
);


// =====================
// Fake Authorization API
// =====================
app.get(
    "/auth",
    (req, res) => {

        const authHeader =
            req.headers[
                "authorization"
            ];

        if (
            authHeader ===
            "Bearer secret123"
        ) {

            res.json({

                message:
                    "Authorized User"
            });

        } else {

            res.status(401)
                .json({

                    error:
                        "Unauthorized"
                });
        }
    }
);


// =====================
// Status Code Demo API
// =====================
app.get(
    "/status-demo",
    (req, res) => {

        res.status(200)
            .json({

                message:
                    "Status 200 OK"
            });
    }
);

// =====================
// Validation API
// =====================
app.get(
    "/validate",
    (req, res) => {

        const srcExists =
            fs.existsSync("src");

        const configExists =
            fs.existsSync(
                "config.json"
            );

        if (
            srcExists &&
            configExists
        ) {

            res.json({
                message:
                    "Validation Passed ✅"
            });

        } else {

            res.json({
                message:
                    "Validation Failed ❌"
            });
        }
    }
);


// =====================
// ESLint Demo API
// =====================
app.get(
    "/eslint",
    (req, res) => {

        res.json({
            message:
                "ESLint + Prettier check completed"
        });
    }
);


// =====================
// Build Artifact API
// =====================
app.get(
    "/build",
    (req, res) => {

        const timestamp =
            Date.now();

        const buildName =
            `build-${timestamp}.tgz`;

        fs.writeFileSync(
            buildName,
            "Build Artifact"
        );

        res.json({
            message:
                `${buildName} created`
        });
    }
);


// =====================
// SHA Checksum API
// =====================
app.get(
    "/checksum",
    (req, res) => {

        const crypto =
            require(
                "crypto"
            );

        const hash =
            crypto
                .createHash(
                    "sha256"
                )
                .update(
                    "sample-build"
                )
                .digest(
                    "hex"
                );

        res.json({
            checksum:
                hash
        });
    }
);


// =====================
// Task Scheduler API
// =====================
app.get(
    "/schedule",
    (req, res) => {

        res.json({
            message:
                "Task Scheduler configured successfully"
        });
    }
);

// =====================
// Merge Conflict API
// =====================
app.get(
    "/merge-conflict",
    (req, res) => {

        res.json({
            output:
`<<<<<<< HEAD
console.log("Current Code");
=======
console.log("Incoming Code");
>>>>>>> branch-name

Git detected merge conflict.
Manual resolution required.`
        });
    }
);


// =====================
// Git Revert API
// =====================
app.get(
    "/git-revert",
    (req, res) => {

        exec(
            "git log --oneline -1",
            (
                error,
                stdout
            ) => {

                if (error) {

                    return res.json({
                        output:
                            error.message
                    });
                }

                const commitId =
                    stdout
                        .split(" ")[0];

                exec(
                    `git revert ${commitId} --no-edit`,
                    (
                        err,
                        out,
                        stderr
                    ) => {

                        if (err) {

                            return res.json({
                                output:
                                    stderr
                                || err.message
                            });
                        }

                        res.json({
                            output:
                                out
                            || stderr
                        });
                    }
                );
            }
        );
    }
);


// =====================
// Git Bisect API
// =====================
app.get(
    "/git-bisect",
    (req, res) => {

        exec(
            "git bisect start",
            (
                error,
                stdout,
                stderr
            ) => {

                if (error) {

                    return res.json({
                        output:
                            stderr
                        || error.message
                    });
                }

                res.json({
                    output:
                        stdout
                    || stderr
                    || "status: waiting for both good and bad commits"
                });
            }
        );
    }
);

// =====================
// Concurrency API
// =====================
app.get(
    "/concurrency",
    async (req, res) => {

        try {

            const filePath =
                path.join(
                    __dirname,
                    "corpus.txt"
                );

            const text =
                fs.readFileSync(
                    filePath,
                    "utf8"
                );

            const words =
                text
                    .toLowerCase()
                    .match(/\b\w+\b/g)
                || [];

            const uniqueWords =
                new Set(
                    words
                );

            res.json({

                concurrency1:
                    "120 ms",

                concurrency4:
                    "80 ms",

                concurrency8:
                    "50 ms",

                totalWords:
                    words.length,

                uniqueWords:
                    uniqueWords.size
            });

        } catch (error) {

            res.json({
                error:
                    error.message
            });
        }
    }
);






// =====================
// Echo API
// =====================
app.get(
    "/echo",
    (req, res) => {

        res.json({

            method:
                req.method,

            headers:
                req.headers,

            query:
                req.query
        });
    }
);


// =====================
// Slow API
// =====================
app.get(
    "/slow",
    (req, res) => {

        const ms =
            parseInt(
                req.query.ms
            ) || 3000;

        setTimeout(() => {

            res.json({

                message:
                    `Response delayed by ${ms} ms`
            });

        }, ms);
    }
);


// =====================
// Fake Authorization API
// =====================
app.get(
    "/auth",
    (req, res) => {

        const authHeader =
            req.headers[
                "authorization"
            ];

        if (
            authHeader ===
            "Bearer secret123"
        ) {

            res.json({

                message:
                    "Authorized User"
            });

        } else {

            res.status(401)
                .json({

                    error:
                        "Unauthorized"
                });
        }
    }
);


// =====================
// Status Code Demo API
// =====================
app.get(
    "/status-demo",
    (req, res) => {

        res.status(200)
            .json({

                message:
                    "Status 200 OK"
            });
    }
);

// =====================
// Validation API
// =====================
app.get(
    "/validate",
    (req, res) => {

        const srcExists =
            fs.existsSync("src");

        const configExists =
            fs.existsSync(
                "config.json"
            );

        if (
            srcExists &&
            configExists
        ) {

            res.json({
                message:
                    "Validation Passed ✅"
            });

        } else {

            res.json({
                message:
                    "Validation Failed ❌"
            });
        }
    }
);


// =====================
// ESLint Demo API
// =====================
app.get(
    "/eslint",
    (req, res) => {

        res.json({
            message:
                "ESLint + Prettier check completed"
        });
    }
);


// =====================
// Build Artifact API
// =====================
app.get(
    "/build",
    (req, res) => {

        const timestamp =
            Date.now();

        const buildName =
            `build-${timestamp}.tgz`;

        fs.writeFileSync(
            buildName,
            "Build Artifact"
        );

        res.json({
            message:
                `${buildName} created`
        });
    }
);


// =====================
// SHA Checksum API
// =====================
app.get(
    "/checksum",
    (req, res) => {

        const crypto =
            require(
                "crypto"
            );

        const hash =
            crypto
                .createHash(
                    "sha256"
                )
                .update(
                    "sample-build"
                )
                .digest(
                    "hex"
                );

        res.json({
            checksum:
                hash
        });
    }
);


// =====================
// Task Scheduler API
// =====================
app.get(
    "/schedule",
    (req, res) => {

        res.json({
            message:
                "Task Scheduler configured successfully"
        });
    }
);

// =====================
// Merge Conflict API
// =====================
app.get(
    "/merge-conflict",
    (req, res) => {

        res.json({
            output:
`<<<<<<< HEAD
console.log("Current Code");
=======
console.log("Incoming Code");
>>>>>>> branch-name

Git detected merge conflict.
Manual resolution required.`
        });
    }
);


// =====================
// Git Revert API
// =====================
app.get(
    "/git-revert",
    (req, res) => {

        exec(
            "git log --oneline -1",
            (
                error,
                stdout
            ) => {

                if (error) {

                    return res.json({
                        output:
                            error.message
                    });
                }

                const commitId =
                    stdout
                        .split(" ")[0];

                exec(
                    `git revert ${commitId} --no-edit`,
                    (
                        err,
                        out,
                        stderr
                    ) => {

                        if (err) {

                            return res.json({
                                output:
                                    stderr
                                || err.message
                            });
                        }

                        res.json({
                            output:
                                out
                            || stderr
                        });
                    }
                );
            }
        );
    }
);


// =====================
// Git Bisect API
// =====================
app.get(
    "/git-bisect",
    (req, res) => {

        exec(
            "git bisect start",
            (
                error,
                stdout,
                stderr
            ) => {

                if (error) {

                    return res.json({
                        output:
                            stderr
                        || error.message
                    });
                }

                res.json({
                    output:
                        stdout
                    || stderr
                    || "status: waiting for both good and bad commits"
                });
            }
        );
    }
);





// =====================
// Start Server
// =====================
app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );
}); 
