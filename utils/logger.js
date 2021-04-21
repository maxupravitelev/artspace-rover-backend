"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};
exports.log_error = (...params) => {
    console.log(...params);
};
