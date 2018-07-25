const NextRouter = require('next/router')
const gtag = require('./gtag')

const routes = module.exports = require('next-routes')()

NextRouter.onRouteChangeComplete = (url) => {
  gtag.pageview(url)
}

routes
  .add('index', '/')
  .add('team', '/team')
  .add('faq', '/faq')
  .add('products-details', '/products/:slug')
