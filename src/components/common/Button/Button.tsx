import * as React from 'react'
import * as classNames from 'classnames'

import { NavLink } from 'react-router-dom'

import * as style from './Button.scss'

interface ButtonProps {
  title: string
  to?: string
  type?: string
  className?: string
  disabled?: boolean
  icon?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any
  left?: boolean
}

Button.types = {
  SECONDARY: 'secondary',
  PRIMARY: 'primary'
}

function Button(props: ButtonProps) {
  let className

  switch (props.type) {
    case Button.types.PRIMARY:
      className = style.primary
      break
    case Button.types.SECONDARY:
      className = style.secondary
      break
    default:
      className = style.primary
  }

  return props.to ? (
    <NavLink
      activeClassName={style.activeLink}
      className={classNames(style.button, className, props.className)}
      to={props.disabled ? '' : props.to}
    >
      <div className={classNames(style.inner, { [style.left]: props.left })}>
        <p className={style.text}>{props.title}</p>
      </div>
    </NavLink>
  ) : (
    <button
      onClick={props.onClick}
      className={classNames(style.button, className, props.className)}
      disabled={props.disabled}
    >
      <p>{props.title}</p>
    </button>
  )
}

export default Button
