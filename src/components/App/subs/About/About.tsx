import * as React from 'react'
import * as style from './About.scss'

interface AboutProps {
  title: string
}

class About extends React.Component<AboutProps> {
  render() {
    return (
      <div className={style.about}>
        <p>About</p>
      </div>
    )
  }
}

export default About
