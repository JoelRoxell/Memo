const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const outputFolder = 'build'
const srcPath = path.resolve(__dirname, 'src')
const shouldUseSourceMap = false
const shouldUseRelativeAssetPaths = false
const cssFilename = 'static/css/[name].[hash:8].css'
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}

module.exports = {
  entry: srcPath + '/index.tsx',
  output: {
    filename: 'static/js/[name].[hash:8].js',
    path: path.resolve(__dirname, outputFolder),
    chunkFilename: 'static/js/bundle.[hash:8].chunk.js',
    publicPath: '/'
  },

  devtool: shouldUseSourceMap ? 'source-map' : false,

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      components: path.join(srcPath, 'components'),
      store: path.join(srcPath, 'store'),
      api: path.join(srcPath, 'api'),
      config: path.join(srcPath, 'config'),
      assets: path.join(srcPath, 'assets'),
      utils: path.join(srcPath, 'utils')
    }
  },

  plugins: [
    // new InterpolateHtmlPlugin(env.raw),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: srcPath + '/index.html',
      minify: {
        removeComments: true
      }
    }),
    new ExtractTextPlugin({ filename: cssFilename }),
    new webpack.DefinePlugin({
      'process.env': {
        PROJECT_ENV: `"${process.env.PROJECT_ENV}"`
      }
    })
    // new ManifestPlugin({
    //   fileName: 'asset-manifest.json',
    // }),
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
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('typings-for-css-modules-loader'),
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
                    prepend: [
                      path.resolve('src/utils/functions'),
                      path.resolve('src/utils/variables')
                    ]
                  }
                }
              ]
            },
            extractTextPluginOptions
          )
        )
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
      }
    ]
  }
}
