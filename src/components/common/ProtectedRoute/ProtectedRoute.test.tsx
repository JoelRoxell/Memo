import * as React from 'react'
import { mount } from 'enzyme'
import { Route, Switch, MemoryRouter } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import UserProvider from 'contexts/UserContext'

const Protected = () => <div>protected</div>
const Login = () => <div>Login</div>

describe('ProtectedRoute', () => {
  test('render', () => {
    const wrapper = mount(
      <UserProvider
        defaultUser={{ email: 'signed@test.com', password: 'abc123', token: 'ZXhpc3Q=' }}
      >
        <MemoryRouter initialEntries={['/account']}>
          <Switch>
            <ProtectedRoute component={Protected} path="/account" redirect="/login" />

            <Route component={() => <div>Login</div>} path="/login" />
          </Switch>
        </MemoryRouter>
      </UserProvider>
    )

    expect(wrapper.find(Protected)).toHaveLength(1)
  })

  test('redirect', () => {
    const wrapper = mount(
      <UserProvider>
        <MemoryRouter initialEntries={['/account']}>
          <Switch>
            <ProtectedRoute component={Protected} path="/account" redirect="/login" />

            <Route component={Login} path="/login" />
          </Switch>
        </MemoryRouter>
      </UserProvider>
    )

    expect(wrapper.find(Login)).toHaveLength(1)
  })
})
