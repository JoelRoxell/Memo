import * as React from 'react'

import UserIcon from 'assets/svg/fill.svg'
import EyeWithLine from 'assets/svg/eye-with-line.svg'
import LogoSvg from 'assets/svg/logo.svg'

const ICONS = {
  user: UserIcon,
  eye: EyeWithLine,
  logo: LogoSvg
}

interface IconProps {
  name: string
  width?: number
  height?: number
  fill?: string
  className?: string
}

function Icon(props: IconProps) {
  const Component = ICONS[props.name]

  return <Component {...props} />
}

export default Icon
