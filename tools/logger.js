const loggerMiddleware = (req, res, next) => {
    if (req) {
        console.info(
           `Requête ${req.method} reçue de ${req.ip} à destination de ${req.url}`
        )
    }
    // if (res) {
    //     console.info(
    //         `Réponse ${res}`
    //     )
    // }
    next()
}

module.exports = Logger = loggerMiddleware
