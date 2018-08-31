import * as React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'
import User from './subs/User'

import * as style from './Register.scss'
import { ApplicationState, ConnectedReduxProps } from 'store'
import { onChange, register } from 'store/auth'
import { UserType } from 'api/modules/auth'

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
                return (
                  <User
                    loading={this.props.loading}
                    email={this.props.email}
                    name={this.props.name}
                    password={this.props.password}
                    error={this.props.error}
                    agreedTerms={this.props.agreedTerms}
                    onChange={(name, value) =>
                      this.props.dispatch(onChange(name, value))
                    }
                    submit={() => {
                      this.props.dispatch(
                        register(
                          this.props.email,
                          this.props.password,
                          UserType.Podcaster,
                          this.props.agreedTerms,
                          this.props.name
                        )
                      )
                    }}
                  />
                )
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
