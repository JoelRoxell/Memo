import * as React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import * as style from './Account.scss'
import { UserContext } from 'contexts/UserContext'
import Dashboard from './subs/Dashboard'
import Navigation from './subs/Navigation'
import posed, { PoseGroup } from 'react-pose'
import Loader from 'components/common/Loader'
import Icon from 'components/common/Icon'
import StatusBar from './subs/StatusBar'

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100, beforeChildren: true },
  exit: { opacity: 0 }
})

const LogoContainer = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
})

function Account() {
  const user = React.useContext(UserContext) as UserContext

  const [mounted, setDidMount] = React.useState(false)

  React.useEffect(() => {
    setDidMount(!mounted)
  }, [])

  return (
    <div className={style.account}>
      <div className={style.top}>
        <div className={style.corner}>
          <LogoContainer pose={mounted ? 'visible' : 'hidden'}>
            <Icon name="logo" svgStyle={{ className: style.logo }} />
          </LogoContainer>
        </div>

        <div className={style.header}>
          <StatusBar username={user.email} notificationCount={6} totalPower={1.3} />
        </div>
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

                        <Route
                          exact
                          path="/account/analytics"
                          render={() => (
                            <>
                              <div>Analytics</div>
                            </>
                          )}
                        />

                        <Route
                          exact
                          path="/account/system"
                          render={() => (
                            <>
                              <div>System</div>
                            </>
                          )}
                        />

                        <Route
                          exact
                          path="/account/Settings"
                          render={() => (
                            <>
                              <div>Settings</div>
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
