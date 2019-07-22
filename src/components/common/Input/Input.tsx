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

function Input(props: InputProps) {
  return (
    <div className={style.input}>
      <div className={style.label}>{props.title}</div>

      <input
        className={style.textField}
        name={props.name || props.title}
        type={props.type || 'text'}
        value={props.value}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        onChange={event => {
          if (props.onChange) {
            props.onChange(event.target.name, event.target.value)
          }
        }}
      />
    </div>
  )
}

export default Input
