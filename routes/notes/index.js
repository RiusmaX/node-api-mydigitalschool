const router = require('express').Router()

// Import du modèle Mongoose Note
const Note = require('../../models/note')

// Nous sommes déjà dans /notes
router.route('/') // = localhost:PORT/notes/
.get((req, res) => { // Récupération de la liste de notes
    Note.find((error, notes) => {
        if (error) {
           return res.status(500).send(error)
        }
        // On répond avec la liste des notes
        return res.send(notes)
    })
})
.post((req, res) => { // Insertion d'un nouvel élément
    // On récupère nos variables envoyée par le client
    const title = req.body.title
    const description = req.body.description

    // On teste si la data reçue n'est pas nulle 
    if (!title) {
        res.status(500).send('Le titre est manquant')
    } else if (!description) {
        res.status(500).send('La description est manquante')
    } else {
        // La data est OK
        const note = new Note()
        note.title = title
        note.description = description

        // On ajoute la note à la base de données
        note.save((error, note) => {
            // Traitement des erreurs
            if (error) {
                return res.status(500).send(error)
            }

            // Récupération de la liste des notes
            Note.find((error, notes) => {
                if (error) {
                    return res.status(500).send(error)
                }
                // On envoit la liste des notes
                return res.send(notes)
            })
        })
    }
})
.delete((req, res) => { // Suppression d'un élément par son ID
    // On récupère l'ID de la note à supprimer
    const id = req.body.id

    if (!id) {
        res.status(500).send('L\'id est manquant')
    } else {
        // On recherche dans le tableau l'index de l'objet possédant l'id envoyé en paramètre
    
    }
})
.put((req, res) => { // Mise à jour d'un élément par son ID
    // On récupère l'ID de la note à mettre à jour
    const id = req.body.id

    if (!id) {
        res.status(500).send('L\'id est manquant')
    } else {
       
    }
})

module.exports = router