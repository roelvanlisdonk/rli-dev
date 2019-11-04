"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const port = 3000;
// Init express
const app = express_1.default();
// Start listening to requests.
app.listen(port, () => {
    console.log(`Local mock backend listening on port ${port}!!!`);
});
//# sourceMappingURL=server.js.map