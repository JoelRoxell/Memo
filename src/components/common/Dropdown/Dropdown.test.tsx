import * as React from 'react'
import { mount } from 'enzyme'

import Dropdown from 'components/common/Dropdown'
import { act } from 'react-dom/test-utils'
import Checkbox from '../Checkbox'

describe('Dropdown', () => {
  test('render', () => {
    const wrapper = mount(
      <Dropdown
        items={[{ id: '1', value: 'first' }, { id: '2', value: 'second' }]}
        title="Select something"
        onSelect={item => item}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  test('show / hide', () => {
    const wrapper = mount(
      <Dropdown
        items={[{ id: '1', value: 'first' }, { id: '2', value: 'second' }]}
        title="Select something"
        onSelect={item => console.log('selected', item)}
      />
    )

    act(() => {
      wrapper.find('.button').simulate('click')
    })

    wrapper.update()

    expect(wrapper.find('.button').getDOMNode().className).toEqual('button active')
    expect(wrapper).toMatchSnapshot()
  })

  test('select / unselect', () => {
    const wrapper = mount(
      <Dropdown
        items={[{ id: '1', value: 'first' }, { id: '2', value: 'second' }]}
        title="Select something"
        onSelect={item => console.log('selected', item)}
      />
    )

    act(() => {
      wrapper.find('.button').simulate('click')
    })

    wrapper.update()

    expect(wrapper).toMatchSnapshot()

    const item = wrapper.find('.item').first()

    act(() => {
      item.simulate('click')
    })

    wrapper.update()

    expect(
      wrapper
        .find(Checkbox)
        .first()
        .prop('selected')
    ).toBeTruthy()
  })

  test('multi select', () => {
    const wrapper = mount(
      <Dropdown
        items={[{ id: '1', value: 'first' }, { id: '2', value: 'second' }]}
        title="Select something"
        onSelect={item => console.log('selected', item)}
        multi
      />
    )

    act(() => {
      wrapper.find('.button').simulate('click')
    })

    wrapper.update()

    expect(wrapper).toMatchSnapshot()

    const item = wrapper.find('.item').first()

    act(() => {
      item.simulate('click')
    })

    wrapper.update()

    expect(
      wrapper
        .find(Checkbox)
        .first()
        .prop('selected')
    ).toBeTruthy()

    act(() => {
      item.simulate('click')
    })

    wrapper.update()

    expect(
      wrapper
        .find(Checkbox)
        .first()
        .prop('selected')
    ).toBeFalsy()
  })
})
