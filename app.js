const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./configs/config.json');
const mimeTypes = require('./configs/mimeTypes.json');

// Create server object w/ request & response arg fields.
const server = http.createServer((req, res) => {});

// Handles simple requests. Per connection basis. Cannot do keep-alive requests.
server.on('request', (req, res) => {
    // If filepath is blank, redirect to index.html.
    if(req.url == '/') {
        req.url = '/index.html';
    };

    fs.readFile(config.root+req.url, (err, data) => {
        // On a file reading error, send a 404 and end response.
        if(err) 
        {
            // Log request url, log 404 (not found).
            process.stdout.write(`Get    : ${path.normalize(config.root+req.url)}\nStatus : 404\nType   : ${getMimeType(path.extname(req.url))}\n\n`);
            res.statusCode = 404;
            res.end();
            return;
        };

        res.writeHead(200, {
            // Return character encoding and content type. Content-type is taken from `getMimeType()` function. 
            'Content-Encoding': 'identity',
            'Content-Type': getMimeType(path.extname(req.url))
        });
        // Log request url, log 200 (OK), log mimetype.
        process.stdout.write(`Get    : ${path.normalize(config.root+req.url)}\nStatus : 200\nType   : ${getMimeType(path.extname(req.url))}\n\n`);
        res.end(data);
    });

    // Add a log breakline indicating end of transaction.
    for(i = 1; i <= config.logBreakLineLen; i++) {
        process.stdout.write('-');
    }
    process.stdout.write('\n\n');
});

// Listen on port 80, log occurance.
server.listen(config.port, config.hostname, () => {
    console.log(`Server listening on http://${config.hostname}:${config.port}/\n`);
});

// Upon entrance of (a) file extension, will check known mimeTypes and return appropriate mimeType if known. 
// Else, will return default mimeType located in config.json.
function getMimeType(ext) {
    for(i = 0; i < mimeTypes.length; i++) {
        if(ext === mimeTypes[i].ext) {
            return mimeTypes[i].typ;
        }
    }
    return config.defaultMimeType;
}