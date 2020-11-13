const mongoose = require('mongoose')
const { Schema } = mongoose

const bcrypt = require('bcryptjs')

const UserSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

// Fonction appelée à chaque enregistrement d'utilisateur
// Next = déclenchement de l'action suivante (en l'occurence la sauvegarde)
UserSchema.pre('save', function (next) {
    var user = this
    // this = user = l'utilisateur en train d'être modifié
    if (this.isModified('password') || this.isNew) {
        // Génération du sel pour le cryptage
        bcrypt.genSalt(10, (error, salt) => {
            // Gestion des erreurs
            if (error) {
                return next(error)
            } else {
                // Cryptage (hachage) du mot de passe
                bcrypt.hash(user.password, salt, (error, hash) => {
                    console.log(hash)
                    if (error) {
                        return next(error)
                    } else {
                        // Enregistrement de l'utilisateur avec le mot de passe haché
                        user.password = hash
                        return next()
                    }
                })
            }
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = (password, cb) => {
    bcrypt.compare(password, this.password, (error, isMatch) => {
        if (error) {
            return cb(error)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)
