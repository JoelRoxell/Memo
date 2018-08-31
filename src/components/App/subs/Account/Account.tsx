import * as React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'
import { ConnectedReduxProps, ApplicationState } from 'store'
import Profile from 'components/App/subs/Account/subs/Profile'
import { UserType } from 'api/modules/auth'
import {
  getProfile,
  onChange,
  updateProfile,
  uploadProfileImage
} from 'store/profile'
import { DecodedToken } from 'store/auth'

import * as style from './Account.scss'

interface AccountProps extends ConnectedReduxProps {
  open: boolean
  presentation: string
  image: string
  website: string
  type: UserType
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
          <Route
            exact
            path="/account"
            render={() => (
              <Profile
                onMount={() => {
                  this.props.dispatch(getProfile(this.props.token.sub))
                }}
                name={this.props.name}
                email={this.props.email}
                presentation={this.props.presentation}
                image={this.props.image}
                userType={this.props.type}
                stripe={{}}
                website={this.props.website}
                onChange={(name, value) => {
                  this.props.dispatch(onChange(name, value))
                }}
                onSubmit={() => this.props.dispatch(updateProfile())}
                onUpload={file => this.props.dispatch(uploadProfileImage(file))}
                loading={this.props.loadingStripe}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  image: state.profile.image,
  name: state.auth.name,
  token: state.auth.decodedToken,
  loading: state.profile.loading
})

export default connect(mapStateToProps)(Account)
