const express = require('express')
const router = express.Router({mergeParams: true})
const middleware = require('../middleware')

// ====================
// ADMIN ROUTES
// ====================

router.get('/', middleware.isLoggedIn, (req, res) => {
  res.render('admin')
})

module.exports = router
