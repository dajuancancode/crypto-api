const express = require('express')
const cryptoList = require('./utils/cryptoList')

const app = express()
const port = process.env.PORT || 3000

app.get('/api/list', (req, res) => {
  cryptoList((error, data) => {
    if(error){
      return res.send({error})
    }
    res.send({data})
  })
})

app.get('/api/crypto/:id', (req, res) => {
  res.send({id: req.params.id})
})

app.get('*' , (req, res) => {
  res.send({error: '404'})
})

app.listen(port, () => {console.log(`Server is up on port ${port}`)})