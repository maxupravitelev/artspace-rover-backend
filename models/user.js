"use strict";
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set("useFindAndModify", false);
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    passwordHash: String,
    rovers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rover'
        }
    ],
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
