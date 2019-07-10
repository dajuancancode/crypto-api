const express = require('express')
const cryptoListView = require('./utils/cryptoList')
const cryptoProfileView = require('./utils/cryptoProfile')

const app = express()
const port = process.env.PORT || 3000

app.get('/api/list', async (req, res) => {
  try {
    const cryptoList = await cryptoListView()
    res.send({cryptoList})
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
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