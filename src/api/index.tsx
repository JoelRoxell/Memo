import { AxiosStatic, AxiosError } from 'axios'

import Auth from './modules/auth'
import DB, { Config as DBConfig } from './modules/db'

interface Config {
  db: DBConfig
}

export interface ResponseError extends AxiosError {}

class Api {
  public modules: {
    auth: Auth
    db: DB
  }

  constructor(private http: AxiosStatic, config: Config) {
    this.modules = {
      auth: new Auth(this.http),
      db: new DB(config.db)
    }
  }
}

export default Api
