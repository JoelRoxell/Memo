import * as React from 'react'
import * as style from './Logo.scss'

interface LogoProps {}

class Logo extends React.Component<LogoProps> {
  render() {
    return (
      <div className={style.logo}>
        <strong>My</strong>
        project
      </div>
    )
  }
}

export default Logo
