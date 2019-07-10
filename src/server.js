require('dotenv').config()

const express = require('express')
const cloudinary = require('cloudinary')
const cryptoListView = require('./utils/cryptoList')
const cryptoProfileView = require('./utils/cryptoProfile')

const app = express()
const port = process.env.PORT || 3000

cloudinary.config()

app.get('/api/list', async (req, res) => {
  try {
    const cryptoList = await cryptoListView()
    res.send({cryptoList})
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
})

app.get('/api/crypto/:symbol', async (req, res) => {
  try {
    const cryptoProfile = await cryptoProfileView(req.params.symbol)
    res.send({cryptoProfile})
  } catch (e) {
    res.status(400).send()
  }
})

app.get('*' , (req, res) => {
  res.send({error: '404'})
})

app.listen(port, () => {console.log(`Server is up on port ${port}`)})