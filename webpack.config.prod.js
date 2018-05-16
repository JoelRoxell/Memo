const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const autoprefixer = require('autoprefixer')

const outputFolder = 'build'
const srcPath = path.resolve(__dirname, 'src')
const outputPath = path.resolve(__dirname, outputFolder)
const shouldUseSourceMap = false
const shouldUseRelativeAssetPaths = false
const cssFilename = 'static/css/[id].[hash:8].css'
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}

module.exports = {
  entry: srcPath + '/index.tsx',
  output: {
    filename: 'static/js/[name].[hash:8].js',
    path: path.resolve(__dirname, outputFolder),
    chunkFilename: 'static/js/bundle.[hash:8].chunk.js'
  },

  devtool: shouldUseSourceMap ? 'source-map' : false,

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  plugins: [
    // new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: srcPath + '/index.html',
      minify: {
        removeComments: true
      }
    }),
    new ExtractTextPlugin({
      filename: cssFilename
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
        test: /\.scss$/,
        include: srcPath,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                // require.resolve('style-loader'),
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
            },
            extractTextPluginOptions
          )
        )
      }
    ]
  }
}
