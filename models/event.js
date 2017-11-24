const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const eventSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date: Date,
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})
eventSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Event', eventSchema)
