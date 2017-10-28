const express = require('express')
const router = express.Router({mergeParams: true})
const middleware = require('../middleware')
const passport = require('passport')
const User = require('../models/user')

// ====================
// ADMIN ROUTES
// ====================

router.get('/', middleware.isLoggedIn, (req, res) => {
  res.render('admin')
})

//  ===========
// AUTH ROUTES
//  ===========

// show register form
router.get('/register', (req, res) => {
  res.render('register')
})

// handle sign up logic
router.post('/register', (req, res) => {
  const newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/')
    })
  })
})

// show login form
router.get('/login', (req, res) => {
  res.render('login')
})

// handling login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), (req, res) => {
})

// logout route
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
