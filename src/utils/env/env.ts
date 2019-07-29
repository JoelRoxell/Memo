export const ENV = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production'
}

export function env(config: { dev: string; stage: string; prod: string }) {
  switch (process.env.PROJECT_ENV) {
    case ENV.STAGING:
      return config.stage

    case ENV.PRODUCTION:
      return config.prod

    case ENV.DEVELOPMENT:
    default:
      return config.dev
  }
}

export default env
