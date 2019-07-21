import * as React from 'react'
import { Switch, Route } from 'react-router'

import * as style from './Account.scss'

function Account() {
  return (
    <div className={style.account}>
      <Switch>
        <Route exact path="/account" render={() => <div>test</div>} />
      </Switch>
    </div>
  )
}

export default Account
