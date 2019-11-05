"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const url = require("url");
const port = 3003;
// Init express
const app = express();
const frontendDir = path.join(__dirname, '../../dist/frontend/src');
app.get('*', (req, res) => {
    console.log(`get url: ${req.url}.`);
    // By default return the index.html, because we are serving a single page app.
    let file = 'index.html';
    // Determines if string ends with a file extension.
    const regEx = /\.(?!\/).*$/;
    if (regEx.test(req.url) && !req.url.endsWith(file)) {
        // Return contents of requested file, because user requests a static file and it is not index.html.
        const urlParts = url.parse(req.url);
        file = urlParts.pathname;
    }
    console.log(`return file: ${file}.`);
    res.sendFile(file, { root: frontendDir });
});
// Start listening to requests.
app.listen(port, () => {
    console.log(`Local mock backend listening on port ${port}!!!`);
});
//# sourceMappingURL=server.js.map