import * as React from 'react'
import { useState } from 'react'
import * as classNames from 'classnames'

import * as style from './Input.scss'
import Icon from 'components/common/Icon'

interface InputProps {
  title: string
  value: string | number
  placeholder: string
  autoComplete: string
  name?: string
  type?: string
  onChange?: (inputName: string, value: string) => any
  validate?: (value: string | number) => boolean
  leftIcon?: string
  rightIcon?: string
  className?: string
}

function Input(props: InputProps) {
  const [isDirty, setIsDirty] = useState(true)
  const [focus, setFocus] = useState(false)

  let styleState = null

  if (!isDirty && props.validate) {
    styleState = props.validate(props.value) ? style.success : style.err
  }

  return (
    <div className={classNames(style.input, props.className)}>
      <div className={style.label}>{props.title}</div>

      <div className={style.inputWrapper}>
        {props.leftIcon && (
          <Icon
            name={props.leftIcon}
            svgStyle={{
              className: classNames(style.leftIcon, styleState, { [style.focus]: focus }),
              width: 24,
              height: 24
            }}
          />
        )}

        <input
          className={classNames(style.textField, styleState)}
          name={props.name || props.title}
          type={props.type || 'text'}
          value={props.value}
          placeholder={props.placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoComplete={props.autoComplete}
          onChange={event => {
            setIsDirty(false)

            if (props.onChange) {
              props.onChange(event.target.name, event.target.value)
            }
          }}
        />

        {props.rightIcon && (
          <Icon
            name={props.rightIcon}
            svgStyle={{
              className: classNames(style.rightIcon, styleState, { [style.focus]: focus }),
              width: 24,
              height: 24
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Input
