require('dotenv').config()
const axios = require('axios')


const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10'
const {API_KEY} = process.env

const headers = {'X-CMC_PRO_API_KEY': API_KEY}

// Need to send name, symbol, price, percent_change_24h, percent_change_7d
class CryptoObject {
  constructor(name, symbol, price, percent_change_24h, percent_change_7d) {
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
    data.forEach(crypto => {
      let newCrypto = new CryptoObject(
        crypto.name, crypto.symbol, crypto.quote.USD.price,
        crypto.quote.USD.percent_change_24h, crypto.quote.USD.percent_change_7d
      )
      cryptoArray.push(newCrypto)
    })
    callback(undefined, cryptoArray)
  } catch (error) {
    callback(error.message, undefined)
  }
}

module.exports = cryptoList