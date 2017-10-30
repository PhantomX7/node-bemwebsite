const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date: Date,
  description: String,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
})

module.exports = mongoose.model('Event', eventSchema)
