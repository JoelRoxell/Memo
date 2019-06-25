import * as React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'

import { ConnectedReduxProps, ApplicationState } from 'store'
import { DecodedToken } from 'store/auth'

import * as style from './Account.scss'

interface AccountProps extends ConnectedReduxProps {
  open: boolean
  presentation: string
  image: string
  email: string
  name: string
  loading: boolean
  token: DecodedToken
  loadingStripe: boolean
  match: {
    params: {
      id: string
    }
  }
}

class Account extends React.Component<AccountProps> {
  render() {
    return (
      <div className={style.account}>
        <Switch>
          <Route exact path="/account" render={() => <div>test</div>} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  name: state.auth.name,
  token: state.auth.decodedToken
})

export default connect(mapStateToProps)(Account)
