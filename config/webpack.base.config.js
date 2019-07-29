const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const autoprefixer = require('autoprefixer')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const srcPath = path.resolve(__dirname, '../src')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = env => {
  return merge([
    {
      entry: srcPath + '/index.tsx',
      output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
        publicPath: '/',
        chunkFilename: '[name].bundle.js'
      },
      devtool: 'cheap-module-source-map',
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          components: path.join(srcPath, 'components'),
          store: path.join(srcPath, 'store'),
          api: path.join(srcPath, 'api'),
          'project-config': path.join(srcPath, 'project-config'),
          assets: path.join(srcPath, 'assets'),
          utils: path.join(srcPath, 'utils'),
          contexts: path.join(srcPath, 'contexts')
        }
      },
      devServer: {
        historyApiFallback: true,
        contentBase: 'dist',
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
          template: srcPath + '/index.html',
          minify: {
            removeComments: true
          }
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
        new webpack.DefinePlugin({
          'process.env': {
            VERSION: JSON.stringify(env.VERSION),
            PLATFORM: JSON.stringify(env.PLATFORM),
            PROJECT_ENV: JSON.stringify(env.PROJECT_ENV)
          }
        }),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: devMode ? '[name].css' : '[name].[hash].css',
          chunkFilename: devMode ? '[id].[name].css' : '[id].[name].[hash].css'
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
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // only enable hot in development
                  hmr: process.env.NODE_ENV === 'development',
                  // if hmr does not work, this is a forceful method.
                  reloadAll: true
                }
              },
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
                  prepend: [
                    path.resolve('src/utils/functions'),
                    path.resolve('src/utils/variables')
                  ]
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
            use: ['babel-loader', 'react-svg-loader']
          }
        ]
      }
    }
  ])
}
