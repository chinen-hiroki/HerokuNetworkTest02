const router = require('express').Router()

router.get('/',(req, res) => {
  res.render('main', {remoteIp: req.ip})
})

module.exports = router