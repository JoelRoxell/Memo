import * as React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

test('Button onClick', () => {
  let didClick = false

  const button = shallow(<Button title="Click" onClick={() => (didClick = true)} />)

  // Interaction demo
  button.simulate('click')

  expect(button.text()).toEqual('Click')
  expect(didClick).toBeTruthy()

  // Snapshot demo
  expect(button).toMatchSnapshot()
})
