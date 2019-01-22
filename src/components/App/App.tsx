import * as React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { ApplicationState, ConnectedReduxProps } from 'store'
import Register from './subs/Register'
import Account from './subs/Account'

import * as style from './App.scss'
import Login from 'components/App/subs/Login'
import ProtectedRoute from 'components/common/ProtectedRoute'
import SignOut from 'components/App/subs/SignOut'

interface AppProps extends ConnectedReduxProps {
  userId: string | null
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <Router>
        <div className={style.app}>
          <div className={style.view}>
            <Switch>
              <ProtectedRoute path="/login" to="/account" component={Login} reversed />

              <ProtectedRoute path="/register" to="/login" component={Register} reversed />

              <ProtectedRoute path="/sign-out" to="/account" component={SignOut} />

              <ProtectedRoute path="/account" to="/login" component={Account} />

              <Route exact path="/" render={() => <Redirect to="/login" />} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  userId: state.auth.decodedToken ? state.auth.decodedToken.sub : null
})

export default connect(mapStateToProps)(App)
