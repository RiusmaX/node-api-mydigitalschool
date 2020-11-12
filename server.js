// Initialisation de l'environnement
require('dotenv').config()

// Imports
const express = require('express')
const bodyParser = require('body-parser')
const Logger = require('./tools/logger')

const app = express()

// Réglage du port d'écoute
const port = process.env.PORT || 3000
var router = express.Router()

// Mise en place du bodyParser afin d'obtenir un objet req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Mise en place du logger
app.use(Logger)

app.use(router)

/**
 * Routes
 */
app.use('/', require('./routes'))
app.use('/notes', require('./routes/notes'))

// Start server listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
