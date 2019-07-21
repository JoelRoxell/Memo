import * as React from 'react'

import Button from 'components/common/Button'

import * as style from './Register.scss'
import { UserContext } from 'contexts/user-context'
import Loader from 'components/common/Loader'

function Register() {
  const user = React.useContext(UserContext)

  return (
    <div className={style.register}>
      <div className={style.view}>
        {`This is should be a register page...`}

        <Button to="login" title="Login" type="default" />

        <Button
          title="Register"
          type="default"
          onClick={() => {
            user.register()
          }}
        />

        {user.loading && <Loader />}
      </div>
    </div>
  )
}

export default Register
