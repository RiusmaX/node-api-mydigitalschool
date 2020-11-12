const express = require('express')
const app = express()
const port = 3000
var router = express.Router()

app.use(router)

app.use('/', require('./routes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
