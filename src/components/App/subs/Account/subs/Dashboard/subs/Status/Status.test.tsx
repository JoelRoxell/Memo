import * as React from 'react'
import { shallow } from 'enzyme'

import Status from './Status'
import { ICONS } from 'components/common/Icon'

describe('Status', () => {
  test('render', () => {
    const wrapper = shallow(
      <Status color="red" icon={ICONS.bell} numerator={3} denominator={4} title="A test" />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
