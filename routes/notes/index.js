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
.get((req, res) => {
    res.send(notes)
})

module.exports = router