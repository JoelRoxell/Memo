import * as React from 'react'
import * as style from './Button.scss'
import { NavLink } from 'react-router-dom'
import * as classNames from 'classnames'

interface ButtonProps {
  title: string
  to?: string
  type: 'primary' | 'default' | 'none'
  className?: string
  disabled?: boolean
  icon?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any
  left?: boolean
}

class Button extends React.Component<ButtonProps> {
  render() {
    let className

    switch (this.props.type) {
      case 'primary':
        className = style.primary
        break
      case 'default':
        className = style.normal
        break
      default:
        className = style.none
    }

    return this.props.to ? (
      <NavLink
        activeClassName={style.activeLink}
        className={classNames(style.button, className, this.props.className)}
        to={this.props.disabled ? '' : this.props.to}
      >
        <div className={classNames(style.inner, { [style.left]: this.props.left })}>
          <p className={style.text}>{this.props.title}</p>
        </div>
      </NavLink>
    ) : (
      <button
        onClick={this.props.onClick}
        className={classNames(style.button, className, this.props.className)}
        disabled={this.props.disabled}
      >
        <p>{this.props.title}</p>
      </button>
    )
  }
}

export default Button
