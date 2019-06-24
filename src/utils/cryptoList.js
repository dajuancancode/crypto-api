require('dotenv').config()
const axios = require('axios')


const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10'
const {CRYPTO_API_KEY} = process.env

const headers = {'X-CMC_PRO_API_KEY': CRYPTO_API_KEY}

// Need to send name, symbol, price, percent_change_24h, percent_change_7d
class CryptoObject {
  constructor(id, logo, name, symbol, price, percent_change_24h, circulating_supply, volume, market_cap) {
    this.id                 = id;
    this.logo               = logo;
    this.name               = name ;
    this.symbol             = symbol;
    this.price              = price;
    this.percent_change_24h = percent_change_24h;
    this.circulating_supply = circulating_supply;
    this.volume             = volume;
    this.market_cap         = market_cap;
  }
}

const cryptoImg = [
  'https://i.ibb.co/VDrPBZC/btc-2x.png',
  'https://i.ibb.co/kgJGRxR/eth-2x.png',
  'https://i.ibb.co/3S2Bpmx/xrp-2x.png',
  'https://i.ibb.co/RQtZRBb/bch-2x.png',
  'https://i.ibb.co/h8JWF1K/ltc-2x.png',
  'https://i.ibb.co/58X2x86/eos-2x.png',
  'https://i.ibb.co/C25SsNC/bnb-2x.png',
  'https://i.ibb.co/XDNH7gv/bsv-2x.png',
  'https://i.ibb.co/gZyHrCQ/usdt-2x.png',
  'https://i.ibb.co/zfQ9b8Z/ada-2x.png',
]

const cryptoList = async (callback) => {
  try {
    const {data: {data}} = await axios.get(url, {headers})
    let cryptoArray = []
    let i = 1
    data.forEach(crypto => {
      let newCrypto = new CryptoObject(
        i, cryptoImg[i-1],crypto.name, crypto.symbol, crypto.quote.USD.price.toFixed(2),
        crypto.quote.USD.percent_change_24h.toFixed(2), 
        crypto.circulating_supply.toFixed(0), crypto.quote.USD.volume_24h.toFixed(0), crypto.quote.USD.market_cap.toFixed(0)
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