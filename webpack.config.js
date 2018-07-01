const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const autoprefixer = require('autoprefixer')

const output = 'dist'
const srcPath = path.resolve(__dirname, 'src')
const outputPath = path.resolve(__dirname, output)

module.exports = {
  entry: srcPath + '/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/'
  },

  devtool: 'cheap-module-source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      components: path.join(srcPath, 'components'),
      store: path.join(srcPath, 'store')
    }
  },

  devServer: {
    historyApiFallback: true,
    contentBase: output,
    stats: {
      modules: false
    },
    hot: true,
    compress: true
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: srcPath + '/index.html'
    })
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
        test: /\.scss$/,
        include: srcPath,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('typings-for-css-modules-loader'),
            options: {
              modules: true,
              camelCase: true,
              namedExport: true
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {
            loader: require.resolve('sass-loader')
          }
        ]
      }
    ]
  }
}
