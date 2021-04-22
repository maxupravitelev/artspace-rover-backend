import mongoose from 'mongoose'
const Timeslot = require('./timeslot')

mongoose.set('useFindAndModify', false)

const visitorSchema = new mongoose.Schema({
  eMailAddress: { type: String, 
    // requiered: true 
  },
  passphrase: { type: String, 
    // requiered: true 
  },
  timeslot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Timeslot
  },
})

module.exports = mongoose.model('Visitor', visitorSchema)
