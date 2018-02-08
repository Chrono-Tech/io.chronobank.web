const routes = module.exports = require('next-routes')()

try {
  routes
    .add('index', '/')
    .add('team', '/team')
    .add('faq', '/faq')
    .add('products-details', '/products/:slug')
} catch(e) {
  console.log('router error', e)
}