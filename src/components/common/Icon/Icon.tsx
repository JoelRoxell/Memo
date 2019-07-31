import * as React from 'react'

import ICONS from './icons'

interface IconProps {
  name?: string
  icon?: React.ReactNode
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

  return <Component {...props.svgStyle} />
}

export default Icon
