const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const middleware = require('../middleware')

// INDEX - show all events
router.get('/', middleware.isLoggedIn, (req, res) => {
    // Get all events from DB
  Event.find({}, function (err, allEvents) {
    if (err) {
      console.log(err)
    } else {
      res.render('events/index', {events: allEvents})
    }
  })
})

// CREATE - add new event to DB
router.post('/', middleware.isLoggedIn, (req, res) => {
  // get data from form and add to event object
  const title = req.body.title
  const content = req.body.content
  const image = req.body.image
  const description = req.body.description
  const date = req.body.date
  const finished = req.body.finished
  const author = {
    id: req.user._id,
    username: req.user.username
  }

  const newEvent = {title, content, image, description, date, finished, author}
  // Create a new event and save to DB
  Event.create(newEvent, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
          // redirect back to events page
      req.flash('success', 'you created an event')
      res.redirect('/admin/events')
    }
  })
})

// NEW - show form to create new event
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('events/new')
})

// SHOW - shows more info about one event
router.get('/:id', (req, res) => {
    // find the event with provided ID
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) {
      console.log(err)
    } else {
      console.log(foundEvent)
            // render show template with that event
      res.render('events/show', {event: foundEvent})
    }
  })
})

// EDIT

router.get('/:id/edit', middleware.isLoggedIn, (req, res) => {
  Event.findById(req.params.id, function (err, foundEvent) {
    if (err) {
      req.flash('error', err.message)
      res.redirect('back')
    } else {
      res.render('events/edit', {event: foundEvent})
    }
  })
})

// UPDATE
router.put('/:id', middleware.isLoggedIn, (req, res) => {
  // get data from form and add to event object
  const title = req.body.title
  const content = req.body.content
  const image = req.body.image
  const description = req.body.description
  const date = req.body.date

  const updatedEvent = {title, content, image, description, date}

  Event.findByIdAndUpdate(req.params.id, {$set: updatedEvent}, function (err, event) {
    if (err) {
      req.flash('error', err.message)
      res.redirect('back')
    } else {
      req.flash('success', 'Successfully Updated!')
      res.redirect('/admin/events/' + event._id)
    }
  })
})

// DESTROY
router.delete('/:id', middleware.isLoggedIn, function (req, res) {
  Event.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/admin/events')
    } else {
      res.redirect('/admin/events')
    }
  })
})

module.exports = router
