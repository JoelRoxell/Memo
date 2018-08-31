import * as React from 'react'
import * as style from './Home.scss'

interface HomeProps {
  title: string
}

class Home extends React.Component<HomeProps> {
  render() {
    return (
      <div className={style.home}>
        <p>Home</p>
      </div>
    )
  }
}

export default Home
