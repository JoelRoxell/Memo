import * as React from 'react'
import * as style from './Input.scss'

interface InputProps {
  title: string
  value: string | number
  placeholder: string
  autoComplete: string
  name?: string
  type?: string
  onChange?: (inputName: string, value: string) => any
}

class Input extends React.Component<InputProps> {
  render() {
    return (
      <div className={style.input}>
        <div>{this.props.title}</div>

        <input
          className={style.textField}
          name={this.props.name || this.props.title}
          type={this.props.type || 'text'}
          value={this.props.value}
          placeholder={this.props.placeholder}
          autoComplete={this.props.autoComplete}
          onChange={event => {
            if (this.props.onChange) {
              this.props.onChange(event.target.name, event.target.value)
            }
          }}
        />
      </div>
    )
  }
}

export default Input
