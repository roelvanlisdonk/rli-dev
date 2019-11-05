"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const url = require("url");
const fs = require("fs");
const port = 3003;
// Init express
const app = express();
exports.app = app;
const frontendDir = path.join(__dirname, '../../frontend/src');
console.log(`frontendDir: ${frontendDir}.`);
app.get('*', (req, res) => {
    console.log(`get url: ${req.url}.`);
    const file = getFileName(req.url);
    console.log(`return file: ${file}.`);
    res.sendFile(file, { root: frontendDir });
});
// Start listening to requests.
app.listen(port, () => {
    console.log(`Local mock backend listening on port ${port}!!!`);
});
function getFileName(requestUrl) {
    const spaEntry = 'index.html';
    const urlParts = url.parse(requestUrl);
    const pathName = urlParts.pathname;
    if (!pathName || pathName === '/') {
        return spaEntry;
    }
    const fullFilePath = path.join(frontendDir, pathName);
    if (fs.existsSync(fullFilePath)) {
        // Return file path, because the file exists.
        return pathName;
    }
    if (fs.existsSync(`${fullFilePath}.js`)) {
        // A JavaScript module was requested, return the path to the JavaScript file.
        return `${pathName}.js`;
    }
    // We are using a spa, so return the spa entry for all unmatched paths.
    return spaEntry;
}
//# sourceMappingURL=server.js.map