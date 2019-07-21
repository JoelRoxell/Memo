import * as React from 'react'
import { useState } from 'react'
import Api from 'api'

type User = {
  email: string
  password: string
  token: string
}
type UserContext = User & {
  setUser: (u: User) => void
  register: () => Promise<any>
  signIn: () => Promise<any>
  loading: boolean
  error: string
}

// Default context object.
export const UserContext = React.createContext<UserContext>({
  email: '',
  password: '',
  token: '',
  setUser: () => {},
  register: () => Promise.resolve({ token: '' }),
  signIn: () => Promise.resolve({ token: '' }),
  loading: false,
  error: ''
})

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: '',
    token: ''
  })
  const actions = {
    setUser,
    register() {
      setLoading(true)

      return Api.modules.auth
        .register(user.email, user.password)
        .then(() => {
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

      return Api.modules.auth.signIn(user.email, user.password).finally(() => {
        setLoading(false)
      })
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
