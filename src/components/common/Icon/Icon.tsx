import * as React from 'react'

import UserIcon from 'assets/svg/fill.svg'
import EyeWithLine from 'assets/svg/eye-with-line.svg'
import LogoSvg from 'assets/svg/logo.svg'
import LoaderSvg from 'assets/svg/loader.svg'

export const ICONS = {
  user: UserIcon,
  eye: EyeWithLine,
  logo: LogoSvg,
  loader: LoaderSvg
}

interface IconProps {
  name?: string
  width?: number
  height?: number
  fill?: string
  stroke?: string
  className?: string
  icon?: any
}

function Icon(props: IconProps) {
  let Component

  if (props.name) Component = ICONS[props.name]
  else Component = props.icon

  if (!Component) throw '<Icon />: Either name or icon must be set for an svg to render properly.'

  return <Component {...props} />
}

export default Icon
