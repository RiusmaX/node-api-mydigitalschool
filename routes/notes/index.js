const router = require('express').Router()

// Import du modèle Mongoose Note
const Note = require('../../models/note')

// Fonction globale de récupération des notes
findNotes = () => {
    return new Promise((resolve, reject) => {
        Note.find((error, notes) => {
            if (error) {
                reject(error)
            } else {
                resolve(notes)
            }
        })
    })
}

// Nous sommes déjà dans /notes
router.route('/') // = localhost:PORT/notes/
.get((req, res) => { // Récupération de la liste de notes
    findNotes()
    .then(notes => res.send(notes))
    .catch(error => res.status(500).send(error))
})
.post((req, res) => { // Insertion d'un nouvel élément
    // On récupère nos variables envoyée par le client
    const title = req.body.title
    const description = req.body.description

    // On teste si la data reçue n'est pas nulle 
    if (!title) {
        return res.status(500).send('Le titre est manquant')
    } else if (!description) {
        return res.status(500).send('La description est manquante')
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
            } else {
                // Récupération de la liste des notes
                findNotes()
                .then((notes) => res.send(notes))
                .catch((error) => res.status(500).send(error))
            }
        })
    }
})
.delete((req, res) => { // Suppression d'un élément par son ID
    // On récupère l'ID de la note à supprimer
    const id = req.body.id

    if (!id) {
        return res.status(500).send('L\'id est manquant')
    } else {
        Note.findByIdAndDelete(id, (error, notes) => {
            if (error) {
                return res.status(500).send(error)
            } else {
                findNotes()
                .then((notes) => res.send(notes))
                .catch((error) => res.status(500).send(error))
            }
        })
    }
})
.put((req, res) => { // Mise à jour d'un élément par son ID
    // On récupère l'ID de la note à mettre à jour et les paramètres
    const id = req.body.id
    const title = req.body.title
    const description = req.body.description
    const isEnabled = req.body.isEnabled
    const isFavorite = req.body.isFavorite

    if (!id) {
        res.status(500).send('L\'id est manquant')
    } else {
        // On créé un nouvel objet node
        const _note = {
            // title: title,
            title,
            description,
            isEnabled,
            isFavorite
        }
        // On met à jour l'objet note
        Note.findByIdAndUpdate(id, _note, (error, notes) => {
            if (error) {
                return res.status(500).send(error)
            } else {
                findNotes()
                .then((notes) => res.send(notes))
                .catch((error) => res.status(500).send(error))
            }
        })
    }
})

module.exports = router
