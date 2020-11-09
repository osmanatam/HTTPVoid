const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

// Create server object w/ request & response arg fields.
const server = http.createServer((req, res) => {});

// Handles simple requests. Per connection basis. Cannot do keep-alive requests.
server.on('request', (req, res) => {
    // If filepath is blank, redirect to index.html.
    if(req.url == '/') {
        req.url = '/index.html';
    };

    fs.readFile('./files'+req.url, (err, data) => {
        // On a file reading error, send a 404 and end response.
        if(err) 
        {
            res.statusCode = 404;
            res.end();
        };
        res.writeHead(200, {
            // Return character encoding and content type. Content-type is taken from `getMimeType()` function. 
            'Content-Encoding': 'identity',
            'Content-Type': getMimeType(path.extname(req.url))
        });
        res.end(data);
    });
});

// Listen on port 80, log occurance.
server.listen(config.port, config.hostname, () => {
    console.log(`Server listening on http://${config.hostname}:${config.port}/`);
});

// When a file's extension is parsed, returns a content-type. Defaults to text/plain if not found.
// TODO : Set known mimetypes in `config.json` for automatic usage later.
function getMimeType(extension) {
    switch(extension) {
        case '.html':
            return('text/html');
            break;
        
        case '.css':
            return('text/css');
            break;

        case '.json':
            return('application/json');
            break;

        default:
            return('text/plain');
            break;
    }
}