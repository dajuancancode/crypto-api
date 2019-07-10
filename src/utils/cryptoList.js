require('dotenv').config()
const axios = require('axios')
const { createCrypto } = require('./newCrypto')


const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10'
const {CRYPTO_API_KEY} = process.env

const headers = {'X-CMC_PRO_API_KEY': CRYPTO_API_KEY}

// Need to send name, symbol, price, percent_change_24h, percent_change_7d



const cryptoList = async () => {
  const {data: {data}} = await axios.get(url, {headers})
  let cryptoArray = []
  let i = 1
  data.forEach(crypto => {
    let newCrypto = createCrypto(i, crypto)
    cryptoArray.push(newCrypto)
  })

  return cryptoArray
}

module.exports = cryptoList