"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('./app');
const http = require('http');
const config_1 = require("./utils/config");
const logger_1 = require("./utils/logger");
const server = http.createServer(app);
server.listen(config_1.PORT, () => {
    logger_1.info(`Server running on port ${config_1.PORT}`);
});
