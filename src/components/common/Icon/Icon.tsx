import * as React from 'react'
import classNames from 'classnames'

import ICONS from './icons'
import * as style from './Icon.scss'

interface IconProps {
  name?: string
  icon?: React.ReactNode
  badge?: number
  badgeStyle?: string
  svgStyle?: {
    width?: number
    height?: number
    fill?: string
    stroke?: string
    className?: string
  }
}

function Icon(props: IconProps) {
  let Component

  if (props.name) Component = ICONS[props.name]
  else Component = props.icon

  if (!Component) throw '<Icon />: Either name or icon must be set for an svg to render properly.'

  return (
    <i className={style.icon}>
      {props.badge && (
        <div className={classNames(style.badge, props.badgeStyle)}>{props.badge}</div>
      )}

      <Component {...props.svgStyle} />
    </i>
  )
}

export default Icon
