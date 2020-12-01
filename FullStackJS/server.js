const fs = require('fs');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const {method, url} = req;
    if (method === 'POST' && url === '/logdate') {
        try {
            let date = new Date();
            console.log(`${method} : ${url}`)

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.write('Logged the date!');
            res.end();

            fs.appendFileSync('datelog.txt', `${date.toUTCString()}\n`);
        }
        catch (err) {
            console.log(err);
        }
    }
    else if (method === 'GET' && url === '/dates') {
        console.log(`${method} : ${url}`);
        try {
            let dateContents = fs.readFileSync('datelog.txt');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.write(`Dates:\n${dateContents}`);
            res.end();
        } catch (err) {
            console.log(err);
        }
    }
    else {
        console.log(`${method} : ${url}`);

        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.write('Resource not available');
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
