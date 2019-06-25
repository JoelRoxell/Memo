import * as React from 'react'
import { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { ApplicationState, ConnectedReduxProps } from 'store'

import ProtectedRoute from 'components/common/ProtectedRoute'
import Loader from 'components/common/Loader'

const Register = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "register" */
    './subs/Register'
  )
)
const Account = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "account" */
    './subs/Account'
  )
)
const Login = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "login" */
    'components/App/subs/Login'
  )
)
const SignOut = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "sign-out" */
    'components/App/subs/SignOut'
  )
)

import * as style from './App.scss'

interface AppProps extends ConnectedReduxProps {
  userId: string | null
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <Router>
        <div className={style.app}>
          <div className={style.view}>
            <Suspense fallback={<Loader />}>
              <Switch>
                <ProtectedRoute path="/login" to="/account" component={Login} reversed />

                <ProtectedRoute path="/register" to="/login" component={Register} reversed />

                <ProtectedRoute path="/sign-out" to="/account" component={SignOut} />

                <ProtectedRoute path="/account" to="/login" component={Account} />

                <Route exact path="/" render={() => <Redirect to="/login" />} />
              </Switch>
            </Suspense>
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
