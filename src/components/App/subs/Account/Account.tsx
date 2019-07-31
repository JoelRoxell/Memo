import * as React from 'react'
import { Switch, Route } from 'react-router'

import * as style from './Account.scss'
import { UserContext } from 'contexts/user-context'
import Dashboard from './subs/Dashboard'
import Navigation from './subs/Navigation'

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
          <Switch>
            <Route
              exact
              path="/account/dashboard"
              render={() => (
                <>
                  <Dashboard />
                </>
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Account
