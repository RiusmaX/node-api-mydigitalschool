const router = require('express').Router()
const SendMail = require('../../tools/mailer')

router.route('/send').post((req, res) => {
  const dest = req.body.dest
  // const dest = req.body.dest || 'cacahouette72@gmail.com'
  const message = req.body.message

  if (!dest) {
    return res.status(500).send('ERREUR : Destinaire manquant')
  } else if (!message) {
    return res.status(500).send('ERREUR : Message manquant')
  } else {
    SendMail(dest, message)
    return res.send('Email envoyé !')
  }
})

module.exports = router
