module.exports = {
  apps: [
    {
      name: 'io.chronobank.web',
      script: 'server.js',
      watch: false,
      env: {
        'PORT': 3001,
        'NODE_ENV': 'development',
        'API_ENDPOINT': 'http://backend.chronobank.tp.ntr1x.com/api/v1'
      },
      env_production: {
        'PORT': 3011,
        'NODE_ENV': 'production',
        'API_ENDPOINT': 'https://backend.chronobank.io/api/v1'
      }
    }
  ]
}
