const router = require('express').Router()
const limiter = require('./limiterController.js')

router.get('/',limiter, (req, res) => {
  res.render('main', {remoteIp: req.ip})
})

module.exports = router