import * as React from 'react'

import EyeWithLine from 'assets/svg/eye-with-line.svg'
import LogoSvg from 'assets/svg/logo.svg'
import LoaderSvg from 'assets/svg/loader.svg'
import SystemSvg from 'assets/svg/system.svg'
import SettingsSvg from 'assets/svg/settings.svg'
import SensorSvg from 'assets/svg/sensor.svg'
import LogoutSvg from 'assets/svg/logout.svg'
import BellSvg from 'assets/svg/bell.svg'
import LightSvg from 'assets/svg/light.svg'
import HomeSvg from 'assets/svg/home.svg'
import DensitySvg from 'assets/svg/density.svg'
import UserSvg from 'assets/svg/user.svg'
import GrowZoneSvg from 'assets/svg/grow-zone.svg'

export const ICONS = {
  eye: EyeWithLine,
  logo: LogoSvg,
  loader: LoaderSvg,
  system: SystemSvg,
  settings: SettingsSvg,
  sensor: SensorSvg,
  logout: LogoutSvg,
  bell: BellSvg,
  light: LightSvg,
  home: HomeSvg,
  density: DensitySvg,
  user: UserSvg,
  growZone: GrowZoneSvg
}

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
