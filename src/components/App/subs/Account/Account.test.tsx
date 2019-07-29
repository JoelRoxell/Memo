import * as React from 'react'
import { shallow } from 'enzyme'
import Account from 'components/App/subs/Account'

describe('Account', () => {
  test('render', () => {
    const wrapper = shallow(<Account />)

    expect(wrapper).toMatchSnapshot()
  })
})
