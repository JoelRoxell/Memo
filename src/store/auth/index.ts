import { ReceiveSignIn } from './index'
import { Token } from 'api/modules/auth/index'
import { Action } from 'redux'
import { thunk } from 'store'
import { UserType } from 'api/modules/auth'

export interface Register extends Action {
  type: 'REGISTER'
  payload: {
    email: string
    password: string
    type: UserType
    acceptedAgreement: boolean
  }
}
export interface ReceiveRegister extends Action {
  type: 'RECEIVE_REGISTER'
  payload: Token
}
export interface RegisterError extends Action {
  type: 'REGISTER_ERROR'
  payload: string
}
export interface SignIn extends Action {
  type: 'SIGN_IN'
  payload: {
    email: string
    password: string
  }
}
export interface ReceiveSignIn extends Action {
  type: 'RECEIVED_SIGN_IN'
  payload: Token
}
export interface SignInError extends Action {
  type: 'SIGN_IN_ERROR'
  payload: string
}
export interface OnChange extends Action {
  type: 'AUTH_ONCHANGE'
  payload: {
    attribute: string
    value: string | boolean
  }
}
export interface ToggleTerms extends Action {
  type: 'TOGGLE_TERMS'
}
export interface SignOut extends Action {
  type: 'SIGN_OUT'
}
export type AuthActions =
  | Register
  | ReceiveRegister
  | RegisterError
  | SignIn
  | ReceiveSignIn
  | SignInError
  | OnChange
  | ToggleTerms
  | SignOut

export interface DecodedToken {
  sub: string
  email: string
  name: string
  userType: UserType
  iat: number
  exp: number
}

export interface AuthState {
  token?: string
  decodedToken?: DecodedToken
  userId?: string
  loading: boolean
  email: string
  password: string
  agreedTerms: boolean
  name: string
  contact: string
  error: string
}
export const onChange = (name: string, value: string): OnChange => {
  return {
    type: 'AUTH_ONCHANGE',
    payload: {
      attribute: name,
      value
    }
  }
}
export const toggleTerms = (): ToggleTerms => {
  return {
    type: 'TOGGLE_TERMS'
  }
}
export const register = (
  email: string,
  password: string,
  type: UserType,
  acceptedAgreement: boolean,
  name: string,
  contact?: string
) => {
  return thunk(async (dispatch, _, api) => {
    dispatch({
      type: 'REGISTER',
      payload: {
        email,
        password,
        type,
        acceptedAgreement,
        contact
      }
    })

    try {
      const token = await api.modules.auth.register(
        email,
        password,
        type,
        acceptedAgreement,
        name,
        contact
      )

      dispatch({
        type: 'RECEIVE_REGISTER',
        payload: token
      })
    } catch (err) {
      dispatch({
        type: 'REGISTER_ERROR',
        payload: err.response.data.error // TODO: determine if we can determine type.
      })
    }
  })
}
export const signIn = (email: string, password: string) => {
  return thunk(async (dispatch, _, api) => {
    dispatch({
      type: 'SIGN_IN',
      payload: {
        email,
        password
      }
    })

    try {
      const token = await api.modules.auth.signIn(email, password)

      api.modules.db.put('auth', 'token', token)

      dispatch({
        type: 'RECEIVED_SIGN_IN',
        payload: token
      })
    } catch (err) {
      dispatch({ type: 'SIGN_IN_ERROR', payload: err.response.data.error })
    }
  })
}

export const signOut = () => {
  return thunk((dispatch, _, api) => {
    api.modules.db.delete()

    dispatch({
      type: 'SIGN_OUT'
    })
  })
}

export const initialState: AuthState = {
  loading: false,
  agreedTerms: false,
  email: '',
  password: '',
  name: '',
  contact: '',
  error: ''
}

export const reducer = (
  state: AuthState = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        loading: true
      }

    case 'RECEIVE_REGISTER': {
      const userData = extractTokenData(action.payload.token)
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        decodedToken: userData
      }
    }

    case 'REGISTER_ERROR':
      return {
        ...state,
        error: action.payload
      }

    case 'SIGN_IN':
      return {
        ...state,
        loading: true
      }

    case 'SIGN_OUT':
      return {
        ...initialState,
        token: undefined,
        decodedToken: undefined
      }

    case 'RECEIVED_SIGN_IN':
      const userData = extractTokenData(action.payload.token)

      return {
        ...state,
        loading: false,
        token: action.payload.token,
        decodedToken: userData
      }

    case 'SIGN_IN_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case 'AUTH_ONCHANGE':
      return {
        ...state,
        [action.payload.attribute]: action.payload.value,
        error: ''
      }

    case 'TOGGLE_TERMS':
      return {
        ...state,
        agreedTerms: !state.agreedTerms
      }

    default:
      return state
  }
}

export function extractTokenData(token: string) {
  const chunks = token.split('.')
  const data = window.atob(chunks[1])

  const t = JSON.parse(data)
  t.userType = t['user_type']

  return t
}
