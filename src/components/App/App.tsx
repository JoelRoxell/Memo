import * as React from 'react'
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import ProtectedRoute from 'components/common/ProtectedRoute'
import Loader from 'components/common/Loader'

import UserProvider from 'contexts/user-context'
import config from 'project-config'

import * as style from './App.scss'

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

function App() {
  React.useEffect(() => {
    console.info(`project env: ${process.env.PROJECT_ENV}`)
    console.info(`version: ${config.version}`)
  }, [])

  return (
    <UserProvider>
      <Router>
        <div className={style.app}>
          <div className={style.view}>
            <Suspense fallback={<Loader />}>
              <Switch>
                <ProtectedRoute path="/login" redirect="/account" component={Login} reversed />

                <ProtectedRoute
                  path="/register"
                  redirect="/account"
                  component={Register}
                  reversed
                />

                <ProtectedRoute path="/sign-out" redirect="/login" component={SignOut} />

                <ProtectedRoute path="/account" redirect="/login" component={Account} />

                <Route exact path="/" render={() => <Redirect to="/login" />} />
              </Switch>
            </Suspense>
          </div>
        </div>

        <div>{config.version}</div>
      </Router>
    </UserProvider>
  )
}

export default App
