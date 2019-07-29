import * as React from 'react'
import { mount } from 'enzyme'
import Checkbox from 'components/common/Checkbox'
import { act } from 'react-dom/test-utils'

const CheckboxWrapper = () => {
  const [active, setActive] = React.useState(false)

  return (
    <Checkbox
      selected={active}
      onChange={() => {
        console.log('Change!')

        setActive(!active)
      }}
    />
  )
}

describe('Checkbox', () => {
  test('render', () => {
    const wrapper = mount(<Checkbox selected />)

    expect(wrapper).toMatchSnapshot()
  })
  test('toggle', () => {
    const wrapper = mount(<CheckboxWrapper />)

    expect(wrapper.find(Checkbox).prop('selected')).toBeFalsy()

    act(() => {
      wrapper.find(Checkbox).simulate('click')
    })
    wrapper.update()

    expect(wrapper.find(Checkbox).prop('selected')).toBeTruthy()
  })
})
