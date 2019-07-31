import * as React from 'react'

import Button from 'components/common/Button'

import * as style from './Register.scss'
import { UserContext } from 'contexts/user-context'
import Loader from 'components/common/Loader'
import Input from 'components/common/Input'

function Register() {
  const user = React.useContext(UserContext) as UserContext

  return (
    <div className={style.register}>
      <div className={style.view}>
        <form>
          <Input
            title="User"
            name="email"
            placeholder="email"
            value={user.email}
            autoComplete="email"
            onChange={(name, value) => {
              user.clearError()
              user.setUser({ ...user, [name]: value })
            }}
            validate={(value: string) => {
              return value.length > 3
            }}
            rightIcon="user"
            // className={style.input}
          />
          {`This is should be a register page...`}

          <Button to="login" title="Login" type="default" />

          <Button
            title="Register"
            type="default"
            onClick={() => {
              user.register()
            }}
          />
        </form>

        {user.loading && <Loader />}
      </div>
    </div>
  )
}

export default Register
