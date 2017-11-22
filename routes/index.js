const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('main')
})

router.get('/event', function (req, res) {
  res.render('event')
})
router.get('/eventshow', function (req, res) {
  res.render('eventshow')
})

module.exports = router
