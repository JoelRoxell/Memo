import * as React from 'react'
import { Switch, Route } from 'react-router'

import * as style from './Account.scss'
import Button from 'components/common/Button'
import { UserContext } from 'contexts/user-context'
import Dashboard from './subs/Dashboard'

function Account() {
  const user = React.useContext(UserContext)

  return (
    <div className={style.account}>
      <div className={style.top}>
        <div className={style.corner} />

        <div className={style.header} />
      </div>

      <div className={style.body}>
        <div className={style.navigation} />

        <div className={style.view}>
          <Switch>
            <Route
              exact
              path="/account"
              render={() => (
                <>
                  <Dashboard />

                  <Button title="Sign out" type="primary" onClick={() => user.signOut()} />
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
