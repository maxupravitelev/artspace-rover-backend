"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('useFindAndModify', false);
const roverSchema = new mongoose_1.default.Schema({
    jitsiUrl: { type: String, default: "not set" },
    roverUrl: { type: String, default: "not set" },
    mjpgUrl: { type: String, default: "not set" },
    userId: { type: String },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
});
module.exports = mongoose_1.default.model('Rover', roverSchema);
