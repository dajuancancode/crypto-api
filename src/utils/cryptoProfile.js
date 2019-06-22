require('dotenv').config()
const axios = require('axios')

const {CRYPTO_API_KEY, NEWS_API_KEY} = process.env
const headers = {'X-CMC_PRO_API_KEY': CRYPTO_API_KEY}

class CryptoView {
  constructor(website, technical_doc, logo, description, news) {
    this.website       = website;
    this.technical_doc = technical_doc;
    this.logo          = logo;
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

const cryptoProfile = async (symbol, callback) => {
  const encodedSymbol = encodeURIComponent(symbol)
  const profileUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${encodedSymbol}`
  const newsUrl = `https://newsapi.org/v2/everything?q=${encodedSymbol}&apiKey=${NEWS_API_KEY}&pageSize=3&from=2019-06-01&language=en`

  try {
    const {data: {data}} = await axios.get(profileUrl, {headers})
    const response = await axios.get(newsUrl)
    const dataSymbol = data[symbol];
    
    let cryptoNewsList = []

    response.data.articles.forEach(article => {
      let newArticle = new NewsArticle(
        article.title, article.source.name,
        article.description, article.url,
        article.urlToImage, article.publishedAt
      )
      cryptoNewsList.push(newArticle)
    })

    const newCryptoProfile = new CryptoView(
      dataSymbol.urls.website[0], dataSymbol.urls.technical_doc[0],
      dataSymbol.logo, dataSymbol.description, cryptoNewsList
      )
    callback(undefined, newCryptoProfile)
  }catch(error) {
    callback(error, undefined)
  }
}

module.exports = cryptoProfile