import env from './env'

describe('env', () => {
  test('environment configuration', () => {
    const trueEnv = process.env.PROJECT_ENV
    const getEnv = () =>
      env({
        dev: 'dev-string',
        stage: 'stage-string',
        prod: 'prod-string'
      })

    expect(getEnv()).toEqual('dev-string')

    process.env.PROJECT_ENV = 'development'

    expect(getEnv()).toEqual('dev-string')

    process.env.PROJECT_ENV = 'stage'

    expect(getEnv()).toEqual('dev-string')

    process.env.PROJECT_ENV = 'production'

    expect(getEnv()).toEqual('prod-string')

    process.env.PROJECT_ENV = trueEnv
  })
})
