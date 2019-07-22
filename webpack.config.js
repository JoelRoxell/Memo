const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const autoprefixer = require('autoprefixer')

const config = require('./webpack.config.prod')
const output = 'dist'
const srcPath = path.resolve(__dirname, 'src')

const devConfig = Object.assign(config, {
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/' + output,
    publicPath: '/',
    chunkFilename: '[name].bundle.js'
  },

  devtool: 'cheap-module-source-map',

  devServer: {
    historyApiFallback: true,
    contentBase: output,
    stats: {
      modules: false
    },
    hot: true,
    compress: true,
    overlay: true
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: srcPath + '/index.html'
    }),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/])
  ],

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true // HMR doesn't work without this
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        include: srcPath,
        use: [
          require.resolve('style-loader'),
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true,
              banner: '// This file is generated automatically'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              },
              localsConvention: 'camelCaseOnly'
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [require('postcss-flexbugs-fixes'), autoprefixer()]
            }
          },
          {
            loader: require.resolve('sass-loader')
          },
          {
            loader: 'prepend-style-loader',
            options: {
              prepend: [path.resolve('src/utils/functions'), path.resolve('src/utils/variables')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader'
            // options: {
            //   jsx: true // true outputs JSX tags
            // }
          }
        ]
      }
    ]
  }
})

module.exports = devConfig
