const express = require('express')
const cryptoList = require('./utils/cryptoList')
const cryptoProfile = require('./utils/cryptoProfile')

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

app.get('/api/crypto/:symbol', (req, res) => {
  cryptoProfile(req.params.symbol, (error, data) => {
    if (error){
      return res.send({error})
    }
    res.send({data})
  })
})

app.get('*' , (req, res) => {
  res.send({error: '404'})
})

app.listen(port, () => {console.log(`Server is up on port ${port}`)})