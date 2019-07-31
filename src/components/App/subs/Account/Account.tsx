import * as React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import * as style from './Account.scss'
import { UserContext } from 'contexts/user-context'
import Dashboard from './subs/Dashboard'
import Navigation from './subs/Navigation'
import posed, { PoseGroup } from 'react-pose'
import Loader from 'components/common/Loader'

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100, beforeChildren: true },
  exit: { opacity: 0 }
})

function Account() {
  const user = React.useContext(UserContext) as UserContext

  return (
    <div className={style.account}>
      <div className={style.top}>
        <div className={style.corner} />

        <div className={style.header} />
      </div>

      <div className={style.body}>
        <Navigation user={user} />

        <div className={style.view}>
          <Route
            render={({ location }) => {
              const location_key = location.pathname.split('/')[2] // only animate view on root-sub(2)-path-changes.

              return (
                <PoseGroup>
                  <RouteContainer key={location_key} style={{ width: '100%' }}>
                    <React.Suspense fallback={<Loader active key="loader" />}>
                      <Switch location={location} key="switcher">
                        <Route
                          exact
                          path="/account/dashboard"
                          render={() => (
                            <>
                              <Dashboard />
                            </>
                          )}
                        />

                        <Route
                          exact
                          path="/account/grow-zones"
                          render={() => (
                            <>
                              <div>Grow some</div>
                            </>
                          )}
                        />

                        <Route exact path="/" render={() => <Redirect to="/login" key="none" />} />
                      </Switch>
                    </React.Suspense>
                  </RouteContainer>
                </PoseGroup>
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Account
