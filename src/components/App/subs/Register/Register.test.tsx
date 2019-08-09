import * as React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'

import Register from 'components/App/subs/Register'
import UserProvider from 'contexts/UserContext'

describe('Register', () => {
  test('render', () => {
    const wrapper = mount(
      <UserProvider>
        <Router>
          <Register />
        </Router>
      </UserProvider>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
