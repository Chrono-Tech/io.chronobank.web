const next = require('next')
const router = require('./src/router')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = router.getRequestHandler(app)

// With express
const express = require('express')

app.prepare().then(() => {
  express().use(handler).listen(process.env.PORT || 3001)
})
