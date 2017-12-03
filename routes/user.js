const express = require('express')
const router = express.Router()
const Event = require('../models/event')

router.get('/', (req, res) => {
  Event.paginate({
  }, {
    page: req.query.page ? req.query.page : 1,
    limit: 5,
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

// SHOW - shows more info about one event
router.get('/:id', (req, res) => {
    // find the event with provided ID
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) {
      console.log(err)
    } else {
      let photos
      if (foundEvent.photos) {
        photos = foundEvent.photos.split(',')
      } else {
        photos = []
      }
      res.render('eventshow', {page: 'event', event: foundEvent, photos: photos})
    }
  })
})

module.exports = router
