const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const eventSchema = new mongoose.Schema({
  title: String,
  caption: String,
  image: String,
  dateStart: Date,
  dateFinish: Date,
  description: String,
  createdAt: { type: Date, default: Date.now },
  finished: Boolean,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  photos: String

})
eventSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Event', eventSchema)
