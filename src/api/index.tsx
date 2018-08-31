import { AxiosStatic, AxiosError } from 'axios'

import Auth from './modules/auth'
import DB, { Config as DBConfig } from './modules/db'
import Profile from './modules/profile'
import Image from './modules/image'
import AppConfig from './modules/AppConfig'

interface Config {
  db: DBConfig
}

export interface ResponseError extends AxiosError {}

class Api {
  public modules: {
    auth: Auth
    db: DB
    profile: Profile
    image: Image
    appConfig: AppConfig
  }

  constructor(private http: AxiosStatic, config: Config) {
    this.modules = {
      auth: new Auth(this.http),
      db: new DB(config.db),
      profile: new Profile(this.http),
      image: new Image(this.http),
      appConfig: new AppConfig(this.http)
    }
  }
}

export default Api
