"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('useFindAndModify', false);
const timeslotSchema = new mongoose_1.default.Schema({
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    duration: { type: Number },
    available: { type: Boolean, default: true }
});
module.exports = mongoose_1.default.model('Timeslot', timeslotSchema);
