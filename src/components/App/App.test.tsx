import * as React from 'react'
import { shallow } from 'enzyme'
import App from 'components/App'

describe('App', () => {
  test('render', () => {
    const wrapper = shallow(<App />)

    expect(wrapper).toMatchSnapshot()
  })
})
