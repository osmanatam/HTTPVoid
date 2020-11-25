# HTTPVoid

A basic HTTP server written in Javascript using Node.js.

--------------------------------------------------------

## TODO

- [ ] File servance.
  - [x] MimeType distinguishment.
    - [x] Add basic mimeType distinguisment function.
    - [x] Move mimeTypes to config.json for ease of use and prevention of code modification.
    - [x] Allow mimeType distinguishment function to loop through `configs/mimeTypes.json` and find matching mimeType from list.
  - [x] Basic 404 handling.
  - [x] Static file servance capabilities on simple HTTP request.

- [ ] Simple HTTP transaction.
  - [ ] On 'Connect'.
    - [ ]
  - [ ]

- [ ] sitemap.xml
sitemap.xml will be used to keep track of file locations in the `files/` directory. All files and directories must be mapped.

- [ ] .htaccess
  - [ ] Research `.htaccess` usage and implementation methods.

- [ ] Keep-Alive Transaction Capabilities
  - [ ] Keep-Alive Transaction Detection
  - [ ] Keep-Alive Timeout
    - [ ] Timeout time (ms) in `configs/keepAlive.json`.
    - [ ] ~Automatic~

## Function Breakdown
