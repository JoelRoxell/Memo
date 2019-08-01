import * as React from 'react'
import { mount } from 'enzyme'
import StatusBar from './StatusBar'

describe('Status bar', () => {
  test('render', () => {
    const wrapper = mount(<StatusBar notificationCount={3} totalPower={1.25} username="Vanessa" />)

    expect(wrapper.find('.badge').text()).toEqual('3')
  })
})
