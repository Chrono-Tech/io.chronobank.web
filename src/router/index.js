const routes = module.exports = require('next-routes')()

routes
  .add('index', '/')
  .add('team', '/team')
  .add('products-details', '/products/:slug')
