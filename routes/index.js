const express = require('express')
const router = express.Router()
const Event = require('../models/event')
var nodemailer = require('nodemailer')
var GMAIL_PASSWORD = process.env.GMAIL_PASSWORD || 'password'

router.get('/', (req, res) => {
<<<<<<< HEAD
  Event.find().sort({dateStart: 'descending'}).limit(1).exec(function (err, event) {
=======
  Event.find().sort({dateStart: -1}).limit(1).exec(function (err, event) {
>>>>>>> a3e294dac8b925a2e20e854af8b2ccc0c9a72c06
    if (err) {
      console.log(err)
    } else {
      res.render('main', {page: 'main', event: event[0]})
    }
  })
})

router.post('/', function (req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alderbeagle@gmail.com',
      pass: GMAIL_PASSWORD
    }
  })

  var mailOptions = {
    from: 'bemuphmedan@ardent-family.com',
    to: 'henrytanjaya11@gmail.com',
    subject: 'Form',
    html: '<b>Name : </b>' + req.body.name +
            '<br><b>Email : </b>' + req.body.email +
            '<br><b>Message : </b>' + req.body.message
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
      res.redirect('/')
    }
  })
})

module.exports = router
