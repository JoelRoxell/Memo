const path = require('path')

const merge = require('webpack-merge')
const Visualizer = require('webpack-visualizer-plugin')

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
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
      },
      plugins: [new Visualizer({ filename: './statistics.html' })],
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
