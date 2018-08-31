import * as React from 'react'
import * as style from './Navigation.scss'
import Button from 'components/common/Button'
import Divider from 'components/common/Divider'
import Logo from 'components/common/Logo'
import { connect } from 'react-redux'
import { ApplicationState } from 'store'
import Avatar from 'components/App/subs/Navigation/subs/Avatar'
import { DecodedToken } from 'store/auth'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface NavigationProps extends RouteComponentProps<any> {
  token: DecodedToken
  image: string
}

class Navigation extends React.Component<NavigationProps> {
  render() {
    return (
      <div className={style.navigation}>
        {/* <BetaBanner /> */}

        <Logo />

        {this.props.token && (
          <Avatar
            userType={this.props.token.userType}
            image={this.props.image}
            email={this.props.token.email}
          />
        )}

        <div className={style.menu}>
          <div className={style.upper}>
            {!this.props.token && (
              <div className={style.notSignedIn}>
                <Button
                  className={style.login}
                  type="default"
                  title="Login"
                  to="/login"
                />

                <Button type="primary" title="Register" to="/register/user" />
              </div>
            )}
          </div>

          <Divider className={style.divider} />

          <div className={style.lower}>
            {!this.props.token && (
              <Button type="none" title="home" to="/home" left />
            )}

            <Button type="none" title="About" to="/about" left />
          </div>
        </div>

        {this.props.token && (
          <Button
            type="none"
            title="Sign out"
            to="/sign-out"
            icon="ios-log-out"
          />
        )}
      </div>
    )
  }
}

export default withRouter(
  connect(({ auth, profile }: ApplicationState) => ({
    token: auth.decodedToken,
    image: profile.image
  }))(Navigation)
)
