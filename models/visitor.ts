import mongoose from 'mongoose'

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
    ref: 'timeslot'
  },
})

module.exports = mongoose.model('Visitor', visitorSchema)
