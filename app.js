const express = require('express')
const app = express()

const { uniqueNamesGenerator, adjectives, animals } = require
('unique-names-generator')

app.use(express.json())

const appName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals],
  length: 2
}).toUpperCase()

app.get('/', (req, res) => {
  res.send({ message: `Olá Mundo, todos estão bem? ${appName}` })
})

const host = process.env.HOSTNAME || "localhost"

const port = process.env.PORT || 3000,
  server = app.listen(port, () => {
    console.log('Docker está rodando no meu servidor', appName, port, host)
  })

module.exports = server

