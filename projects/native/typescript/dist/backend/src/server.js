"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = require("path");
const port = 3000;
// Init express
const app = express_1.default();
const frontendDir = path_1.default.join(__dirname, '../frontend');
app.get('*', (_, res) => {
    console.log('send index.html');
    res.sendFile('index.html', { root: frontendDir });
});
// Start listening to requests.
app.listen(port, () => {
    console.log(`Local mock backend listening on port ${port}!!!`);
});
//# sourceMappingURL=server.js.map