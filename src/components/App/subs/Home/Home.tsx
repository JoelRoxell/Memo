import * as React from 'react'

import * as style from './Home.scss'

interface HomeProps {
  title: string
}

function Home(props: HomeProps) {
  return (
    <div className={style.home}>
      <p>{props.title}</p>
    </div>
  )
}

export default Home
