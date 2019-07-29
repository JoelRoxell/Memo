import * as React from 'react'
import { shallow } from 'enzyme'

import SignOut from 'components/App/subs/SignOut'

describe('SignOut', () => {
  test('render', () => {
    const wrapper = shallow(<SignOut />)

    expect(wrapper).toMatchSnapshot()
  })
})
