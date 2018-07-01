import * as React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { ApplicationState, ConnectedReduxProps } from 'store'
import { increment } from 'store/counter'
import Title from 'components/common/Title'
import About from './subs/About'
import Account from './subs/Account'
import Browse from './subs/Browse'
import Home from './subs/Home'

import * as style from './App.scss'

// Consider using dispatch to props instead.
interface AppProps extends ConnectedReduxProps {
  counter: number
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <Router>
        <div className={style.app}>
          <Title />

          {`Pod is alive, with HMR: ` + this.props.counter}

          <div onClick={() => this.props.dispatch(increment(1))}>increment</div>

          <div>
            <Link to="/">Home</Link>

            <Link to="/about">About</Link>

            <Link to="/account/1339">Account</Link>

            <Link to="/browse">Browse</Link>
          </div>

          <Route path="/about" component={About} />

          <Route path="/account/:id" component={Account} />

          <Route path="/browse" component={Browse} />

          <Route exact path="/" component={Home} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  counter: state.counter.count
})

export default hot(module)(connect(mapStateToProps)(App))
