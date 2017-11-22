const express = require('express')
const router = express.Router()
const Event = require('../models/event')

router.get('/', (req, res) => {
  Event.find().sort({datefield: -1}).limit(1).exec(function (err, event) {
    if (err) {
      console.log(err)
    } else {
      res.render('main', {page: 'main', event: event[0]})
    }
  })
})

module.exports = router
