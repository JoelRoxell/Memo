import * as React from 'react'
import { useState, ReactNode } from 'react'
import Api from 'api'

type User = {
  email: string
  password: string
  token: string | null
}
type UserContext = User & {
  setUser: (u: User) => void
  register: () => Promise<any>
  signIn: () => Promise<any>
  signOut: () => void
  loading: boolean
  error: string
}

// Default context object.
export const UserContext = React.createContext<UserContext>({
  email: '',
  password: '',
  token: null,
  setUser: () => {},
  register: () => Promise.resolve({ token: '' }),
  signIn: () => Promise.resolve({ token: '' }),
  signOut: () => null,
  loading: false,
  error: ''
})

export default function UserProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: '',
    token: localStorage.getItem('token')
  })
  const actions = {
    setUser,
    register() {
      setLoading(true)

      return Api.modules.auth
        .register(user.email, user.password)
        .then(res => {
          localStorage.setItem('token', res.token)

          console.log('success')
        })
        .catch(err => {
          console.log(err)

          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    },

    signIn() {
      setLoading(true)

      return Api.modules.auth
        .signIn(user.email, user.password)
        .then(res => {
          localStorage.setItem('token', res.token)

          setUser({ ...user, token: res.token })
        })
        .finally(() => {
          setLoading(false)
        })
    },

    signOut() {
      localStorage.removeItem('token')
      setUser({ email: '', password: '', token: '' })
    }
  }

  return (
    <UserContext.Provider
      value={{
        ...user,
        ...actions,
        loading,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
