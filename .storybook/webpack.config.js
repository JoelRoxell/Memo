const path = require('path')

const base = require('../config/webpack.base.config')

const SRC_PATH = path.join(__dirname, '../src')
const STORIES_PATH = path.join(__dirname, '../stories')

// don't need stories path if you have your stories inside your

module.exports = ({ config }) => {
  const baseConfig = base('story_book')

  config.resolve = { ...config.resolve, ...baseConfig.resolve }
  config.plugins.push(baseConfig.plugins[5]) // CSS-module plugin

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH, STORIES_PATH],
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFileName: './.storybook/tsconfig.json'
        }
      },
      { loader: require.resolve('react-docgen-typescript-loader') }
    ]
  })

  config.module.rules.push(...baseConfig.module.rules)

  return config
}
