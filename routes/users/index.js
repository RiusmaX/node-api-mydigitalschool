const router = require('express').Router()
// Import de la librairie de gestion des tokens
const jwt = require('jsonwebtoken')

const User = require('../../models/user')
const withAuth = require('../../middlewares/auth')

findUsers = () => {
  return new Promise((resolve, reject) => {
    User.find((error, users) => {
      if (error) {
        reject(error)
      } else {
        resolve(users)
      }
    })
  })
}

router
  .route('/') // <URL>:<PORT>/users
  .get(withAuth, (req, res) => {
    // Récupération du token
    const token = req.headers.authorization.split(' ')[1]
    const id = jwt.decode(token).id
    // Fonction avec callback
    // User.findById(id, (error, user) => {
    //     if (error) {
    //         return res.status(500).send(error)
    //     } else {
    //         return res.send(user)
    //     }
    // })

    // Fonction avec promesse
    User.findById(id)
      .select('-password')
      .then(user => res.send(user))
      .catch(error => res.status(500).send(error))

    // Promesse avec return
    // User.findById(id).select('-password')
    // .then(user => {
    //     return res.send(user)
    // })
    // .catch(error => res.status(500).send(error))
  })

// Route imbriquée (sous-route)
router
  .route('/register') // <URL>:<PORT>/users/register
  .post((req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password

    if (!firstName) {
      return res.status(500).send('Prénom manquant')
    } else if (!lastName) {
      return res.status(500).send('Nom manquant')
    } else if (!email) {
      return res.status(500).send('Email manquant')
    } else if (!phone) {
      return res.status(500).send('Téléphone manquant')
    } else if (!password) {
      return res.status(500).send('Mot de passe manquant')
    } else {
      const user = new User({
        firstName,
        lastName,
        email,
        phone,
        password
      })

      user.save((error, user) => {
        if (error) {
          return res.status(500).send(error)
        } else {
          return res.send(user)
        }
      })
    }
  })

router
  .route('/login') // <URL>:<PORT>/users/login
  .post((req, res) => {
    // Collecte des paramètres de la requête
    const email = req.body.email
    const password = req.body.password

    if (!email) {
      return res.status(500).send('Email manquant')
    } else if (!password) {
      return res.status(500).send('Mot de passe manquant')
    } else {
      // Récupération de l'utilisateur
      User.findOne({ email: email }, (error, user) => {
        if (error) {
          return res.status(500).send('Identifiants invalides')
        } else {
          // Comparaison du mot de passe
          user.comparePassword(password, (error, isMatch) => {
            if (error) {
              // Mots de passe non identiques
              return res.status(500).send('Identifiants invalides')
            } else if (isMatch) {
              // Mots de passe identiques
              // On prépare le payload du token (informations contenues dans le token)
              const payload = {
                id: user._id
              }
              // Génération du token d'accès (payload + secret + options)
              jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '7d' },
                (error, token) => {
                  if (error) {
                    return res
                      .status(500)
                      .send('Erreur dans la génération du token')
                  }
                  // Envoi du user + token en réponse
                  return res.send({
                    user,
                    token
                  })
                }
              )
            }
          })
        }
      })
    }
  })

module.exports = router
