import * as React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'

import Title from 'components/common/Title'

import * as style from './App.scss'
import { ApplicationState, ConnectedReduxProps } from 'store'
import { increment } from 'store/counter'

// Consider using dispatch to props instead.
interface AppProps extends ConnectedReduxProps {
  counter: number
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div className={style.app}>
        <Title />

        {`Pod is alive, with HMR: ` + this.props.counter}

        <div onClick={() => this.props.dispatch(increment(1))}>increment</div>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  counter: state.counter.count
})

export default hot(module)(connect(mapStateToProps)(App))
