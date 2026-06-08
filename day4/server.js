const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);

    // /echo endpoint
    if (parsedUrl.pathname === '/echo') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(req.headers, null, 2));
    }

    // /slow?ms=3000 endpoint
    else if (parsedUrl.pathname === '/slow') {

        const delay = parsedUrl.query.ms || 3000;

        setTimeout(() => {

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end(`Response delayed by ${delay} ms`);

        }, delay);
    }

    // /cache endpoint
    else if (parsedUrl.pathname === '/cache') {

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600'
        });

        res.end('Cache enabled response');
    }

    // Default route
    else {

        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.end('Route not found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});