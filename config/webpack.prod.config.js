const path = require('path')

const merge = require('webpack-merge')
const Visualizer = require('webpack-visualizer-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = require('./webpack.base.config')

const prodConfig = env => {
  return merge([
    {
      output: {
        filename: 'static/js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'static/js/[name].[hash:8].chunk.js',
        publicPath: '/'
      },
      optimization: {
        // minimizer: [new UglifyJsPlugin()],
        splitChunks: {
          chunks: 'all'
        }
      },
      plugins: [new Visualizer({ filename: './statistics.html' }), new CompressionPlugin()],
      stats: {
        modules: false,
        moduleTrace: false,
        entrypoints: false
      }
    }
  ])
}

module.exports = env => {
  return merge(baseConfig(env), prodConfig(env))
}
