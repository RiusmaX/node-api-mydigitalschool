const router = require('express').Router()

router.route('/').all((req, res) => {
  res.send("Bienvenue sur mon API")
})

module.exports = router