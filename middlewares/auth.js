const jwt = require('jsonwebtoken')

const withAuth = (req, res, next) => {
    if (req.headers.authorization) {
        // req.headers.authorization = Bearer <token>
        // On sépare le champ authorization en 2 pour récupérer le token
        const token = req.headers.authorization.split(' ')[1] // = ['Bearer', '<token>']
        if (!token) {
            // Pas de token dans le header authorization
            res.status(401).send('Unauthorized: No token provided')
        } else {
            // Token présent dans le header authorization
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    // Le token est invalide
                    res.status(401).send('Unauthorized: Invalid token')
                } else {
                    // Le token est valide
                    // Vérification de la date 
                    const now = new Date().getTime() / 1000
                    if (decoded.exp < now) {
                        res.status(401).send('Unauthorized: Expired token')
                    } else {
                        // Passage à l'action suivante
                        next()
                    }
                }
            })
        }
    } else {
        res.status(401).send('Unauthorized: No token provided')
    }
}

module.exports = withAuth
