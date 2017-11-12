module.exports = {
  apps: [
    {
      name: 'io.chronobank.web',
      script: 'server.js',
      watch: false,
      env: {
        'PORT': 3001,
        'NODE_ENV': 'development'
      },
      env_production: {
        'PORT': 3011,
        'NODE_ENV': 'production'
      }
    }
  ]
}
