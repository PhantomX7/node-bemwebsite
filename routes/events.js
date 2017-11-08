const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const { isLoggedIn } = require('../middleware/index')
const { cloudinary, upload } = require('../middleware/cloudinary')

function escapeRegex (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

// INDEX - show all events
router.get('/', isLoggedIn, (req, res) => {
  const limit = 7
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi')
    Event.paginate({
      title: regex
    }, {
      page: req.query.page ? req.query.page : 1,
      limit: limit
    }, (err, filteredEvent) => {
      const events=filteredEvent.docs
      if (err) {
        req.flash('error', 'Something went wrong')
        res.redirect('back')
      } else {
        res.render('events/index', {
          query: req.query.search,
          currentPage: filteredEvent.page,
          pages: filteredEvent.pages,
          events: events,
          success: `Your search for "${req.query.search}" returned ${events.length} result(s)...`
        })
      }
    })
  } else {
    // Get all events from DB
    Event.paginate({},
       {
        page: req.query.page ? req.query.page : 1,
        limit: limit
      },  (err, allEvents) => {
      if (err) {
        console.log(err)
      } else {
        res.render('events/index', {
          query: "",
          currentPage: allEvents.page,
          pages: allEvents.pages,
          events: allEvents.docs
        })
      }
    })
  }
})

// CREATE - add new event to DB
router.post('/', isLoggedIn, upload.single('image'), async (req, res) => {
  if (!req.file) {
    req.flash('error', 'Please upload an image.')
    return res.redirect('back')
  }
  try {
    // upload image to cloudinary and set resulting url to image variable
    let result = await cloudinary.uploader.upload(req.file.path)
    let image = result.secure_url
    // get data from form and add to event object
    const title = req.body.title
    const content = req.body.content
    const description = req.body.description
    const date = req.body.date
    const finished = Boolean(req.body.finished)
    const author = {
      id: req.user._id,
      username: req.user.username
    }

    const newEvent = {title, content, image, description, date, finished, author}
    // Create a new event and save to DB
    await Event.create(newEvent, function (err, newlyCreated) {
      if (err) {
        console.log(err)
      } else {
            // redirect back to events page
        console.log('event created')
        req.flash('success', 'you created an event')
        res.redirect('/admin/events')
      }
    })
  } catch (err) {
    req.flash('error', err.message)
  }
  res.redirect('/admin/events')
})

// NEW - show form to create new event
router.get('/new', isLoggedIn, (req, res) => {
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

router.get('/:id/edit', isLoggedIn, (req, res) => {
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
router.put('/:id', isLoggedIn, (req, res) => {
  // get data from form and add to event object
  const title = req.body.title
  const content = req.body.content
  const image = req.body.image
  const description = req.body.description
  const date = req.body.date
  const finished = Boolean(req.body.finished)
  console.log(finished)
  console.log(req.body.finished)

  const updatedEvent = {title, content, image, description, date, finished}

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
router.delete('/:id', isLoggedIn, function (req, res) {
  Event.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/admin/events')
    } else {
      res.redirect('/admin/events')
    }
  })
})

module.exports = router
