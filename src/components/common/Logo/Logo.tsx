import * as React from 'react'
import classNames from 'classnames'

import * as style from './Logo.scss'
import Icon from '../Icon'

interface LogoProps {
  className?: string
}

function Logo(props: LogoProps) {
  console.log(style)

  return (
    <div className={classNames(style.logo, props.className)}>
      <Icon name="logo" fill="#e2c085" />
    </div>
  )
}

export default Logo
