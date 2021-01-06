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
.patch((req, res) => { // Mise à jour d'un élément par son ID
    // On récupère l'ID de la note à mettre à jour et les paramètres
    const id = req.body.id

    if (!id) {
        res.status(500).send('L\'id est manquant')
    } else {
        // On créé un nouvel objet node
        var _note = {}

        // On construit l'objet en fonction des paramètres du body
        if (req.body.description) _note.description = req.body.description
        if (req.body.title) _note.title = req.body.title
        if (req.body.isEnabled !== undefined && req.body.isEnabled !== null) _note.isEnabled = req.body.isEnabled
        if (req.body.isFavorite !== undefined && req.body.isFavorite !== null) _note.isFavorite = req.body.isFavorite

        // On met à jour l'objet note
        Note.findByIdAndUpdate(id, _note, { useFindAndModify: true }, (error, notes) => {
            if (error) {
                console.error(error)
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
