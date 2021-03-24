const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
});
module.exports = mongoose.model('User', userSchema);
