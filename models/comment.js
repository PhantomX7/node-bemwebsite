var mongoose = require('mongoose')

var commentSchema = mongoose.Schema({
  name: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', commentSchema)
