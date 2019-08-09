import { mount, ReactWrapper } from 'enzyme'
import * as React from 'react'
import { act } from 'react-dom/test-utils'

import UserProvider, { UserContext } from './user-context'
import Api from 'api'

jest.mock('api')
const mockedApi = Api as jest.Mocked<typeof Api>

const HookWrapper = () => {
  const user = React.useContext(UserContext)

  return <div data-user={user} />
}

describe('user context', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>
  let data: UserContext

  function getData() {
    wrapper.update()

    return wrapper.find('div').props()['data-user']
  }

  beforeEach(() => {
    act(() => {
      wrapper = mount(
        <UserProvider
          defaultUser={{
            email: 'user',
            password: 'pwd',
            token: ''
          }}
        >
          <HookWrapper />
        </UserProvider>
      )
      data = getData()
    })
  })

  test('update context user', () => {
    act(() => {
      data.setUser({
        email: 'user-1',
        password: 'keff',
        token: 'test-token'
      })
    })

    data = getData()

    expect(data.email).toEqual('user-1')
    expect(data.password).toEqual('keff')
    expect(data.token).toEqual('test-token')
  })

  test('register - success', done => {
    mockedApi.modules.auth.register = (email: string, password: string) =>
      Promise.resolve({ token: 'signed-in-token' })

    act(() => {
      data.setUser({
        email: 'user',
        password: 'pwd',
        token: ''
      })
    })

    act(() => {
      data.register().finally(() => {
        data = getData()

        expect(data.token).toEqual('signed-in-token')
        done()
      })
    })
  })

  test('register - fail', done => {
    mockedApi.modules.auth.register = (email: string, password: string) =>
      Promise.reject({ message: 'Failed to register' })

    act(() => {
      wrapper = mount(
        <UserProvider
          defaultUser={{
            email: 'user',
            password: 'pwd',
            token: ''
          }}
        >
          <HookWrapper />
        </UserProvider>
      )
    })

    let data: UserContext = wrapper.find('div').props()['data-user']

    act(() => {
      data.register().finally(() => {
        data = getData()

        expect(data.error).toContain('Failed')
        done()
      })
    })
  })

  test('Sign in - success', async () => {
    mockedApi.modules.auth.signIn = (email: string, password: string) =>
      Promise.resolve({ token: 'success' })

    await data.signIn()
    data = getData()

    expect(localStorage.getItem('token')).toEqual('success')
    expect(data.token).toEqual('success')
  })

  test('Sign in - fail', async () => {
    mockedApi.modules.auth.signIn = (email: string, password: string) =>
      Promise.reject({ message: 'Failed to sign in' })

    await data.signIn()

    data = getData()

    expect(localStorage.getItem('token')).toBeNull()
    expect(data.error).toContain('Failed')
  })

  test('sign out', async () => {
    mockedApi.modules.auth.signOut = () => Promise.resolve()

    await data.signOut()

    data = getData()

    expect(data.email).toBeFalsy()
    expect(data.password).toBeFalsy()
    expect(data.token).toBeFalsy()
    expect(localStorage.getItem('token')).toBeFalsy()
  })

  test('clear err', async () => {
    mockedApi.modules.auth.signIn = () => Promise.reject({ message: 'error message' })

    await data.signIn()

    data = getData()

    expect(data.error).toBeTruthy()
    data.clearError()

    data = getData()

    expect(data.error).toBeFalsy()
  })
})
