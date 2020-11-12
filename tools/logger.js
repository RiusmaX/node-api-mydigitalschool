const loggerMiddleware = (req, res, next) => {
    console.info(
        'J\'ai reçu une requête ' + req
    )
}

module.exports = Logger = loggerMiddleware