const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: { presets: ['env', 'react'] }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { minimize: true } },
          'sass-loader'
        ]
      },
      { test: /\.pug$/, use: 'pug-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Serene',
      template: './static/index.pug',
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      name: false,

      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  }
}
