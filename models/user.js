const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set("useFindAndModify", false);
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    passwordHash: String
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;
