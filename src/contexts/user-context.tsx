import * as React from 'react'
import { useState, ReactNode } from 'react'
import Api from 'api'

export type User = {
  email: string
  password: string
  token: string | null
}
export type UserContext = User & {
  setUser: (u: User) => void
  register: () => Promise<any>
  signIn: () => Promise<any>
  signOut: () => Promise<void>
  loading: boolean
  error: string
  clearError: () => void
}

// Default context object.
export const UserContext = React.createContext<Partial<UserContext>>({})

export default function UserProvider({
  children,
  defaultUser
}: {
  children: ReactNode
  defaultUser?: User
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email: defaultUser ? defaultUser.email : '',
    password: defaultUser ? defaultUser.password : '',
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
          setUser({ ...user, token: res.token })
        })
        .catch(err => {
          setError(err.message)
          localStorage.removeItem('token')
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
        .catch(err => {
          setError(err.message)
          localStorage.removeItem('token')
        })
        .finally(() => {
          setLoading(false)
        })
    },

    signOut() {
      localStorage.removeItem('token')
      setUser({ email: '', password: '', token: '' })

      return Api.modules.auth.signOut()
    }
  }

  return (
    <UserContext.Provider
      value={{
        ...user,
        ...actions,
        loading,
        error,
        clearError: () => setError('')
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
