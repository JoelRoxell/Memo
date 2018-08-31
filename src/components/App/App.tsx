import * as React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import { ApplicationState, ConnectedReduxProps } from 'store'
import Register from './subs/Register'
import Account from './subs/Account'

import * as style from './App.scss'
import Login from 'components/App/subs/Login'
import Navigation from 'components/App/subs/Navigation'
import image from 'assets/background-landing.png'
import ProtectedRoute from 'components/common/ProtectedRoute'
import SignOut from 'components/App/subs/SignOut'
import { getProfile } from 'store/profile'

interface AppProps extends ConnectedReduxProps {
  overlay: boolean
  userId: string | null
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    if (this.props.userId) {
      this.props.dispatch(getProfile(this.props.userId))
    }
  }

  render() {
    return (
      <Router>
        <div className={style.app}>
          <div className={style.view}>
            <Navigation />

            <Switch>
              <ProtectedRoute
                path="/login"
                to="/account"
                component={Login}
                reversed
              />

              <ProtectedRoute
                path="/register"
                to="/login"
                component={Register}
                reversed
              />

              <ProtectedRoute
                path="/sign-out"
                to="/account"
                component={SignOut}
              />

              <ProtectedRoute path="/account" to="/login" component={Account} />

              <Route exact path="/" render={() => <Redirect to="/browse" />} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  overlay: state.applicationConfig.overlay,
  userId: state.auth.decodedToken ? state.auth.decodedToken.sub : null
})

export default hot(module)(connect(mapStateToProps)(App))
