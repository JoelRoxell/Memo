import { AxiosStatic } from 'axios'
import env from 'utils/env'

export interface ProfileModel {
  id: string
  name?: string
  image: string
}

class Profile {
  private http: AxiosStatic
  private profileEndpoint: string

  constructor(http: AxiosStatic) {
    this.http = http
    this.profileEndpoint = env({
      dev: 'https://localhost:8001/profile',
      stage: 'https://{profile-endpoint}/profile',
      prod: 'https://{profile-endpoint}/profile'
    })
  }

  async getProfile(sub: string) {
    const response = await this.http.get<ProfileModel>(
      this.profileEndpoint + `/${sub}`
    )

    return response.data
  }

  async update(profile: ProfileModel, jwt: string) {
    const response = await this.http.post<ProfileModel>(
      this.profileEndpoint,
      {
        name: profile.name,
        image: profile.image
      },
      {
        headers: { Authorization: jwt }
      }
    )

    return response.data
  }
}

export default Profile
