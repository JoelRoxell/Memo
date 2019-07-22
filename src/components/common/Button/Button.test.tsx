import * as React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

test('Button onClick', () => {
  let didClick = false

  const button = shallow(<Button title="A clickable button" onClick={() => (didClick = true)} />)

  // Interaction demo
  button.simulate('click')

  expect(button.text()).toEqual('A clickable button')
  expect(didClick).toBeTruthy()

  // Snapshot demo
  expect(button).toMatchSnapshot()
})
