"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('useFindAndModify', false);
const userSchema = new mongoose_1.default.Schema({
    username: { type: String },
    password: { type: String },
});
module.exports = mongoose_1.default.model('User', userSchema);
