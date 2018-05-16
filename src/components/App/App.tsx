import * as React from 'react'
import { hot } from 'react-hot-loader'

import Title from '../Title'

import * as style from './App.scss'

class App extends React.Component {
  componentDidMount() {
    console.info('App did load')
  }

  render() {
    return (
      <div className={style.app}>
        <Title />

        {`Pod is alive, with HMR`}
      </div>
    )
  }
}

export default hot(module)(App)
