import * as React from 'react'
import { shallow } from 'enzyme'
import About from 'components/App/subs/About'

describe('About', () => {
  test('render', () => {
    const wrapper = shallow(<About />)

    expect(wrapper).toMatchSnapshot()
  })
})
