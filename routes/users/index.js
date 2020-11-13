const router = require('express').Router()

const User = require('../../models/user')

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

router.route('/')
.get((req, res) => {
    findUsers()
    .then(users => res.send(users))
    .catch(error => res.status(500).send(error))
})

// Route imbriquée (sous-route)
router.route('/register') // <URL>:<PORT>/users/register
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

module.exports = router
