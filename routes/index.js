const express = require('express')
const router = express.Router()
const Event = require('../models/event')

router.get('/', function (req, res) {
  Event.find().sort({datefield: -1}).limit(1).exec(function (err, event) {
    if (err) {
      console.log(err)
    } else {
      res.render('main', {page: 'main', event: event[0]})
    }
  })
})

router.get('/event', function (req, res) {
  Event.paginate({
  }, {
    page: req.query.page ? req.query.page : 1,
    limit: 1,
    sort: {datefield: -1}
  }, (err, filteredEvent) => {
    const events = filteredEvent.docs
    if (err) {
      req.flash('error', 'Something went wrong')
      res.redirect('back')
    } else {
      console.log(events)
      res.render('event', {
        page: 'event',
        currentPage: filteredEvent.page,
        pages: filteredEvent.pages,
        events: events
      })
    }
  })
})

module.exports = router
