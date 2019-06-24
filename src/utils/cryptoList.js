require('dotenv').config()
const axios = require('axios')


const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10'
const {CRYPTO_API_KEY} = process.env

const headers = {'X-CMC_PRO_API_KEY': CRYPTO_API_KEY}

// Need to send name, symbol, price, percent_change_24h, percent_change_7d
class CryptoObject {
  constructor(id, name, symbol, price, percent_change_24h, percent_change_7d) {
    this.id                 = id;
    this.name               = name ;
    this.symbol             = symbol;
    this.price              = price;
    this.percent_change_24h = percent_change_24h;
    this.percent_change_7d  = percent_change_7d;
  }
}

const cryptoList = async (callback) => {
  try {
    const {data: {data}} = await axios.get(url, {headers})
    let cryptoArray = []
    let i = 1
    data.forEach(crypto => {
      let newCrypto = new CryptoObject(
        i, crypto.name, crypto.symbol, crypto.quote.USD.price,
        crypto.quote.USD.percent_change_24h, crypto.quote.USD.percent_change_7d
      )
      cryptoArray.push(newCrypto)
      i++
    })
    callback(undefined, cryptoArray)
  } catch (error) {
    callback(error.message, undefined)
  }
}

module.exports = cryptoList