import mongoose from 'mongoose'

mongoose.set('useFindAndModify', false)

const exhibitionSchema = new mongoose.Schema({
  artspace: { type: String },
  rovers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rover'
    }
  ],
  description: { type: String },
  openingDay: { type: String },
  closingDay: { type: String },
})

module.exports = mongoose.model('Exhibition', exhibitionSchema)
