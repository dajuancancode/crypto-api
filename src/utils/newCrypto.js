const cloudinary = require('cloudinary')

class CryptoObject {
  constructor(id, logo, name, symbol, price, percent_change_24h, circulating_supply, volume, market_cap) {
    this.id                 = id;
    this.logo               = logo
    this.name               = name ;
    this.symbol             = symbol;
    this.price              = price;
    this.percent_change_24h = percent_change_24h;
    this.circulating_supply = circulating_supply;
    this.volume             = volume;
    this.market_cap         = market_cap;
  }
}

const createCrypto = (i,crypto) => {
  let newCrypto = new CryptoObject(
    i,
    cloudinary.image(`cryptoicons/${crypto.symbol.toLowerCase()}`, {format: "png"}),
    crypto.name,
    crypto.symbol,
    crypto.quote.USD.price.toFixed(2),
    crypto.quote.USD.percent_change_24h.toFixed(2), 
    crypto.circulating_supply.toFixed(0),
    crypto.quote.USD.volume_24h.toFixed(0),
    crypto.quote.USD.market_cap.toFixed(0)
  )
  return newCrypto
}

module.exports = { createCrypto }