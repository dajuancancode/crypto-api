require('dotenv').config()

const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('/api/list', (req, res) => {
  res.send({test: 'Yooo'})
})

app.get('/api/crypto/:id', (req, res) => {
  res.send({id: req.params.id})
})

app.get('*' , (req, res) => {
  res.send({error: '404'})
})

app.listen(port, () => {console.log(`Server is up on port ${port}`)})