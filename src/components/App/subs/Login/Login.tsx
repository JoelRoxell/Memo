import * as React from 'react'

import Input from 'components/common/Input'
import Button from 'components/common/Button'
import { ConnectedReduxProps, ApplicationState } from 'store'
import { connect } from 'react-redux'
import { signIn, onChange } from 'store/auth'

import * as style from './Login.scss'

interface LoginProps extends ConnectedReduxProps {
  email: string
  password: string
  error: string
}

class Login extends React.Component<LoginProps> {
  render() {
    return (
      <div className={style.login}>
        <form
          className={style.view}
          onSubmit={e => {
            e.preventDefault()

            this.props.dispatch(signIn(this.props.email, this.props.password))
          }}
        >
          <div className={style.title}>{`Login`}</div>

          <Input
            title="Email"
            name="email"
            placeholder="email"
            value={this.props.email}
            autoComplete="email"
            onChange={(name, value) => {
              this.props.dispatch(onChange(name, value))
            }}
          />

          <Input
            title="Password"
            name="password"
            placeholder="password"
            value={this.props.password}
            autoComplete="password"
            type="password"
            onChange={(name, value) => {
              this.props.dispatch(onChange(name, value))
            }}
          />

          <Button type="primary" title="Sign in" />

          <Button to="register" type="default" title="Register" className={style.registerButton} />

          {this.props.error && <div className={style.error}>{this.props.error}</div>}
        </form>
      </div>
    )
  }
}

export default connect(({ auth }: ApplicationState) => ({
  email: auth.email,
  password: auth.password,
  error: auth.error
}))(Login)
