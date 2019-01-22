import { AxiosStatic } from 'axios'
import { env } from 'utils/env'

export interface Token {
  token: string
}

class Auth {
  private http: AxiosStatic
  private socket: string

  constructor(http: AxiosStatic) {
    this.http = http
    this.socket = env({
      dev: 'https://localhost:8001/user',
      prod: 'https://{auth-endpoint}/user',
      stage: 'https://{auth-endpoint}/user'
    })
  }

  public async register(email: string, password: string): Promise<Token> {
    const response = await this.http.post<Token>(this.socket, {
      email,
      password,
      name
    })

    return response.data
  }

  public async signIn(email: string, password: string): Promise<Token> {
    const response = await this.http.patch<Token>(this.socket, {
      email,
      password
    })

    return response.data
  }
}

export default Auth
