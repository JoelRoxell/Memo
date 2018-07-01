import * as React from 'react'
import * as style from './Account.scss'

interface AccountProps {
  title: string
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
        <p>Account {`id: ${this.props.match.params.id}`}</p>
      </div>
    )
  }
}

export default Account
