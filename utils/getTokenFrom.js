"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};
