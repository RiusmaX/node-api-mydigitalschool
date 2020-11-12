const router = require('express').Router()

var notes = [
    {
        id: '1',
        title: 'Ma note 1',
        description: 'Ma description 1',
        isEnabled: true,
        isFavorite: false
    },
    {
        id: '2',
        title: 'Ma note 2',
        description: 'Ma description 2',
        isEnabled: true,
        isFavorite: false
    },
    {
        id: '3',
        title: 'Ma note 3',
        description: 'Ma description 3',
        isEnabled: true,
        isFavorite: false
    }
]

// Nous sommes déjà dans /notes
router.route('/') // = localhost:PORT/notes/
.get((req, res) => { // Récupération de la liste de notes
    // On répond avec la liste des notes
    res.send(notes)
})
.post((req, res) => {
    console.log('body', req.body)
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
        
        // On ajoute la note à la liste
        notes.push({
            id: Math.random().toString(36).substr(2, 9),
            title: title,
            description: description,
            isEnabled: true,
            isFavorite: false
        })

        // On envoit la liste mise à jour
        res.send(notes)
    }
})

module.exports = router