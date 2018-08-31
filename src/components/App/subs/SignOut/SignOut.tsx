import * as React from 'react'
import { connect } from 'react-redux'
import { ConnectedReduxProps } from 'store'
import { signOut } from 'store/auth'
import { Redirect } from 'react-router'

import * as style from './SignOut.scss'

class SignOut extends React.Component<ConnectedReduxProps> {
  componentWillMount() {
    this.props.dispatch(signOut())
  }

  render() {
    return (
      <div className={style.signOut}>
        <Redirect to="/" />
      </div>
    )
  }
}

export default connect()(SignOut)
