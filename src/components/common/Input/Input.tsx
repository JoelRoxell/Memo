import * as React from 'react'
import { useState, useEffect } from 'react'
import * as classNames from 'classnames'

import * as style from './Input.scss'

interface InputProps {
  title: string
  value: string | number
  placeholder: string
  autoComplete: string
  name?: string
  type?: string
  onChange?: (inputName: string, value: string) => any
  validate: (value: string | number) => boolean
}

function Input(props: InputProps) {
  const [isDirty, setIsDirty] = useState(true)

  let styleState = null

  if (!isDirty) {
    styleState = props.validate(props.value) ? style.success : style.err
  }

  return (
    <div className={style.input}>
      <div className={style.label}>{props.title}</div>

      <input
        className={classNames(style.textField, styleState)}
        name={props.name || props.title}
        type={props.type || 'text'}
        value={props.value}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        onChange={event => {
          setIsDirty(false)

          if (props.onChange) {
            props.onChange(event.target.name, event.target.value)
          }
        }}
      />
    </div>
  )
}

export default Input
