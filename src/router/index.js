const routes = module.exports = require('next-routes')()

routes
  .add('index', '/')
  .add('team', '/team')
  .add('faq', '/faq')
  .add('products-details', '/products/:slug')
