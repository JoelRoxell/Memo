import * as React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'
// import {} from 'jest'

describe('Button', () => {
  test('Button onClick', () => {
    const cb = jest.fn(x => {})
    const button = shallow(<Button title="A clickable button" onClick={cb} />)

    // Interaction demo
    button.simulate('click').simulate('click')

    expect(button.text()).toEqual('A clickable button')
    expect(cb.mock.calls.length).toEqual(2)

    // Snapshot demo
    expect(button).toMatchSnapshot()
  })
})
