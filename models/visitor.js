"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Timeslot = require('./timeslot');
mongoose_1.default.set('useFindAndModify', false);
const visitorSchema = new mongoose_1.default.Schema({
    eMailAddress: { type: String,
    },
    passphrase: { type: String,
    },
    timeslot: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: Timeslot
    },
});
module.exports = mongoose_1.default.model('Visitor', visitorSchema);
