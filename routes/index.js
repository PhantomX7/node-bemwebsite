const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/', function (req, res) {
  res.render('main')
})

module.exports = router
