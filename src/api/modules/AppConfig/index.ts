import { env } from 'utils/env'
import { AxiosStatic } from 'axios'

export interface Language {
  name: string
  code: string
  id: string
}
export interface Category {
  name: string
  id: string
}
export interface Country {
  name: string
  code: string
  id: string
}

class AppConfig {
  http: AxiosStatic
  endpointLanguage: string
  endpointCategory: string
  endpointCountry: string

  constructor(http: AxiosStatic) {
    this.http = http
    this.endpointLanguage = env({
      dev: 'https://localhost:8001/language',
      stage: 'https://{app-config-endpoint}/language',
      prod: 'http://{app-config-endpoint}/language'
    })
    this.endpointCategory = env({
      dev: 'https://localhost:8001/category',
      stage: 'https://{app-config-endpoint}/category',
      prod: 'http://{app-config-endpoint}/category'
    })
    this.endpointCountry = env({
      dev: 'https://localhost:8001/country',
      stage: 'https://{app-config-endpoint}/country',
      prod: 'http://{app-config-endpoint}/country'
    })
  }

  async getLanguages(): Promise<Array<Language>> {
    const response = await this.http.get<Array<Language>>(this.endpointLanguage)

    return response.data
  }

  async getCategories(): Promise<Array<Category>> {
    const response = await this.http.get(this.endpointCategory)

    return response.data
  }

  async getCountries(): Promise<Array<Country>> {
    const response = await this.http.get(this.endpointCountry)

    return response.data
  }
}

export default AppConfig
