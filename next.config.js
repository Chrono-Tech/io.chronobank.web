const path = require('path')
const glob = require('glob')

module.exports = {
  distDir: 'build',
  // eslint-disable-next-line
  webpack: (config, { dev }) => {
    config.resolve.alias = {
      'src': path.join(__dirname, 'src')
    }
    config.resolve.extensions = ['.js', '.jsx', '.json', '.scss', '.css']
    config.module.rules.push(
      {
        test: /\.(css|scss|sass)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader'
      },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      { test: /\.otf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [ { loader: 'url-loader', options: { limit: '10000', mimetype: 'application/font-woff' } } ] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [ { loader: 'url-loader', options: { limit: '10000', mimetype: 'octet-stream' } } ] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [ { loader: 'url-loader', options: { limit: '10000', mimetype: 'image/svg+xml' } } ] }
    )
    return config
  }
}
