// Initialisation de l'environnement
require('dotenv').config()

// Imports
const express = require('express')
const bodyParser = require('body-parser')
// Connecteur à la base de données MongoDB
const mongoose = require('mongoose')

const Logger = require('./tools/logger')

const app = express()

// Réglage du port d'écoute
const port = process.env.PORT || 3000

var router = express.Router()

// Initialisation de la connexion à la base de données
const mongoURL = process.env.MONGO_URL + '?retryWrites=true&w=majority'

// Initialisation des paramètres de la base de données
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Connection à la base de donnée
mongoose.connect(mongoURL, dbOptions, error => {
  if (error) {
    throw error
  }
})

// Passage en mode debug
mongoose.set('debug', true)

// Récupération de l'objet db
const db = mongoose.connection

// Listener d'erreurs
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'))

// Listener d'information de connection réussie
db.once('open', () => {
  console.info('Connexion à la base : OK')
})

// Mise en place du bodyParser afin d'obtenir un objet req.body dans la requête
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Mise en place du logger
app.use(Logger)

app.use(router)

// Routes
app.use('/', require('./routes'))
app.use('/notes', require('./routes/notes'))

// Start server listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
