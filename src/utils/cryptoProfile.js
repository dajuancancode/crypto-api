require('dotenv').config()
const axios = require('axios')

const {CRYPTO_API_KEY, NEWS_API_KEY} = process.env
const headers = {'X-CMC_PRO_API_KEY': CRYPTO_API_KEY}

class CryptoView {
  constructor(name, website, technical_doc, description, news) {
    this.name          = name;
    this.website       = website;
    this.technical_doc = technical_doc;
    this.description   = description;
    this.news          = news;
  }
}

class NewsArticle {
  constructor (title, source, description, url, image, publishedAt) {
    this.title       = title;
    this.source      = source;
    this.description = description;
    this.url         = url;
    this.image       = image;
    this.publishedAt = publishedAt;
  }
}

const cryptoProfile = async (symbol) => {
  const encodedSymbol = encodeURIComponent(symbol)
  const profileUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${encodedSymbol}`
  
  const {data: {data}} = await axios.get(profileUrl, {headers})
  const dataSymbol = data[symbol]
  const dataName = (dataSymbol.name === 'EOS') ? encodeURIComponent('EOS Crypto') : encodeURIComponent(dataSymbol.name)
  const newsUrl = `https://newsapi.org/v2/everything?q=${dataName}&apiKey=${NEWS_API_KEY}&pageSize=4&language=en`
  const {data: {articles}} = await axios.get(newsUrl)
  
  
  let cryptoNewsList = []

  articles.forEach(article => {
    let newArticle = new NewsArticle(
      article.title, article.source.name,
      article.description, article.url,
      article.urlToImage, article.publishedAt
    )
    cryptoNewsList.push(newArticle)
  })

  const newCryptoProfile = new CryptoView(
    dataSymbol.name, dataSymbol.urls.website[0], dataSymbol.urls.technical_doc[0],
    dataSymbol.description, cryptoNewsList
  )

  return newCryptoProfile
}

module.exports = cryptoProfile