import mongoose from 'mongoose'

mongoose.set('useFindAndModify', false)

const timeslotSchema = new mongoose.Schema({
  date: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  duration: { type: Number },
  available: { type: Boolean, default: true }
})

module.exports = mongoose.model('Timeslot', timeslotSchema)
