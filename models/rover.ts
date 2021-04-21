import mongoose from 'mongoose'

mongoose.set('useFindAndModify', false)

const roverSchema = new mongoose.Schema({
  jitsiUrl: { type: String, default: "not set" },
  roverUrl: { type: String, default: "not set" },
  mjpgUrl: { type: String, default: "not set" },
  userId: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

module.exports = mongoose.model('Rover', roverSchema)
