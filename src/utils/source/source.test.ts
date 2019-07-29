import { ENV } from 'utils/env'
import source from './source'

describe('source', () => {
  test('config', () => {
    let src = source('test-img.jpg')

    expect(src).toEqual('https://localhost:8001/image/test-img.jpg')

    process.env.PROJECT_ENV = ENV.DEVELOPMENT
    src = source('test-img.jpg')

    expect(src).toEqual('https://localhost:8001/image/test-img.jpg')

    process.env.PROJECT_ENV = ENV.STAGING
    src = source('test-img.jpg')

    expect(src).toEqual('https://{image-endpoint-stage}/image/test-img.jpg')

    process.env.PROJECT_ENV = ENV.PRODUCTION
    src = source('test-img.jpg')

    expect(src).toEqual('https://{image-endpoint-live}/image/test-img.jpg')
  })

  test('none', () => {
    expect(source(null)).toEqual('')
  })
})
