import * as React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

import Login from 'components/App/subs/Login'
import UserProvider from 'contexts/user-context'

describe('Login', () => {
  test('render', () => {
    const wrapper = mount(
      <UserProvider>
        <Router>
          <Login />
        </Router>
      </UserProvider>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
