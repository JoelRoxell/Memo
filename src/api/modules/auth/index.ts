import { AxiosInstance } from 'axios'
import { env } from 'utils/env'

export interface Token {
  token: string
}

class Auth {
  private http: AxiosInstance
  private socket: string

  constructor(http: AxiosInstance) {
    this.http = http
    this.socket = env({
      dev: 'http://localhost:8005/user',
      prod: 'https://{auth-endpoint}/user',
      stage: 'https://{auth-endpoint}/user'
    })
  }

  public async register(email: string, password: string): Promise<Token> {
    const response = await this.http.post<Token>(this.socket, {
      email,
      password
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

  public async signOut() {
    const response = await this.http.delete(this.socket)

    return response.data
  }
}

export default Auth
