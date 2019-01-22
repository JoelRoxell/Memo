import * as React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'

import * as style from './Register.scss'
import { ApplicationState, ConnectedReduxProps } from 'store'

interface RegisterProps extends ConnectedReduxProps {
  loading: boolean
  email: string
  name: string
  contact: string
  password: string
  agreedTerms: boolean
  error: string
  token: string
}

class Register extends React.Component<RegisterProps> {
  render() {
    return (
      <div className={style.register}>
        <div className={style.view}>
          <Switch>
            <Route
              path="/register/podcaster"
              render={() => {
                return <div />
              }}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    loading: state.auth.loading,
    email: state.auth.email,
    name: state.auth.name,
    contact: state.auth.contact,
    password: state.auth.password,
    agreedTerms: state.auth.agreedTerms,
    error: state.auth.error,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(Register)
