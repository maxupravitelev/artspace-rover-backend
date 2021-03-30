"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const requestLogger = (request, response, next) => {
    logger_1.info('Method:', request.method);
    logger_1.info('Path:  ', request.path);
    logger_1.info('Body:  ', request.body);
    logger_1.info('---');
    next();
};
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, request, response, next) => {
    logger_1.log_error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
