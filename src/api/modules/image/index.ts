import { env } from 'utils/env'
import { AxiosStatic } from 'axios'

class Image {
  private http: AxiosStatic
  private imageEndpoint: string

  constructor(http: AxiosStatic) {
    this.http = http
    this.imageEndpoint = env({
      dev: 'https://localhost:8001/image',
      stage: 'https://{image-endpoint}/image',
      prod: 'https://{image-endpoint}/profile'
    })
  }

  async uploadImages<T>(files: { [name: string]: File }) {
    const data = new FormData()
    const items = Object.keys(files)

    items.map(name => {
      data.append(name, files[name])
    })

    const response = await this.http.post<T>(this.imageEndpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  }
}

export default Image
