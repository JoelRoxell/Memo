import * as React from 'react'
import { Suspense, lazy } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'

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
const About = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "login" */
    'components/App/subs/About'
  )
)
const SignOut = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "sign-out" */
    'components/App/subs/SignOut'
  )
)

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100, beforeChildren: true },
  exit: { opacity: 0 }
})

function App() {
  React.useEffect(() => {
    console.info(`project env: ${process.env.PROJECT_ENV}`)
    console.info(`version: ${config.version}`)
  }, [])

  return (
    <UserProvider>
      <Route
        render={({ location }) => (
          <div className={style.app}>
            <div className={style.view}>
              <PoseGroup>
                <RouteContainer key={location.pathname} style={{ width: '100%' }}>
                  <Suspense fallback={<Loader key="loader" />}>
                    <Switch location={location} key="switcher">
                      <ProtectedRoute
                        path="/account"
                        redirect="/login"
                        component={Account}
                        key="login"
                      />

                      <ProtectedRoute
                        path="/login"
                        redirect="/account"
                        component={Login}
                        reversed
                        key="login"
                      />

                      <ProtectedRoute
                        path="/register"
                        redirect="/account"
                        component={Register}
                        reversed
                        key="register"
                      />

                      <ProtectedRoute
                        path="/sign-out"
                        redirect="/login"
                        component={SignOut}
                        key="sign-out"
                      />

                      <Route path="/about" component={About} key="account" />

                      <Route exact path="/" render={() => <Redirect to="/login" key="none" />} />
                    </Switch>
                  </Suspense>
                </RouteContainer>
              </PoseGroup>
            </div>
          </div>
        )}
      />

      <div>{config.version}</div>
    </UserProvider>
  )
}

export default App
