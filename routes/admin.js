const express = require('express')
const router = express.Router({mergeParams: true})
const middleware = require('../middleware')
const passport = require('passport')
const User = require('../models/user')

// ====================
// ADMIN ROUTES
// ====================

router.get('/', middleware.isLoggedIn, (req, res) => {
  res.redirect('/admin/events')
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
      return res.render('register', {error: err.message})
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', 'Welcome to Bem Website ' + user.username)
      res.redirect('/admin/events')
    })
  })
})

// show login form
router.get('/login', (req, res) => {
  res.render('login')
})

// handling login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: true
}), (req, res) => {
})

// logout route
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
