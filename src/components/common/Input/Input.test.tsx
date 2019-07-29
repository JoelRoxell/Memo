import * as React from 'react'
import { mount, shallow } from 'enzyme'
import Input from 'components/common/Input'
import { act } from 'react-dom/test-utils'

const InputWrapper = () => {
  const [text, setText] = React.useState('')

  return (
    <Input
      autoComplete="email"
      placeholder="email"
      title="email"
      value={text}
      onChange={(_, value) => {
        setText(value)
      }}
    />
  )
}

describe('Input', () => {
  test('render', () => {
    let wrapper = shallow(
      <Input
        autoComplete="email"
        placeholder="email"
        title="email"
        value={'default-text'}
        onChange={(_, __) => {}}
        leftIcon="left"
        rightIcon="right"
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  test('change', () => {
    let wrapper = mount(<InputWrapper />)

    act(() => {
      wrapper
        .find('input')
        .simulate('change', { target: { name: 'input', value: 'Some input text' } })
    })
    wrapper.update()
    expect(wrapper.find('input').prop('value')).toEqual('Some input text')
  })
})
