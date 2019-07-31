import * as React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'
import Login from './App/subs/Login'
import SignOut from './App/subs/SignOut'
import UserProvider from 'contexts/user-context'

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
})

export const AppBk = () => {
  return (
    <UserProvider>
      <Route
        render={({ location }) => {
          console.log(location.pathname)

          return (
            <div id="site-container">
              <header>
                <h1>Route transitions with Pose and React Router</h1>
              </header>
              <div id="content-container">
                <ul id="site-nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>

                <PoseGroup>
                  <RouteContainer key={location.pathname}>
                    <Switch location={location}>
                      <Route exact path="/" component={Login} key="home" />

                      <Route path="/about" component={SignOut} key="about" />
                    </Switch>
                  </RouteContainer>
                </PoseGroup>
              </div>
            </div>
          )
        }}
      />
    </UserProvider>
  )
}
