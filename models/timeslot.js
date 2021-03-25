const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const timeslotSchema = new mongoose.Schema({
    date: { type: String },
    time: { type: String },
    duration: { type: Number },
    available: { type: Boolean }
});
module.exports = mongoose.model('Timeslot', timeslotSchema);
