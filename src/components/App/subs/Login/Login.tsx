import * as React from 'react'

import Input from 'components/common/Input'
import Button from 'components/common/Button'
import { UserContext } from 'contexts/user-context'
import Loader from 'components/common/Loader'
import backgroundImage from 'assets/img/leaf.jpg'
import Card from 'components/common/Card'

import * as style from './Login.scss'

function Login() {
  const user = React.useContext(UserContext)
  const valid = user.email.length > 3 && user.password.length > 3

  return (
    <div className={style.login} style={{ background: `url(${backgroundImage})` }}>
      <Card className={style.view}>
        <form
          className={style.form}
          onSubmit={e => {
            e.preventDefault()

            user.signIn()
          }}
        >
          <div className={style.logo}>{`Login title`}</div>

          <Input
            title="User"
            name="email"
            placeholder="email"
            value={user.email}
            autoComplete="email"
            onChange={(name, value) => user.setUser({ ...user, [name]: value })}
            validate={(value: string) => {
              return value.length > 3
            }}
            rightIcon="user"
            className={style.input}
          />

          <Input
            title="Password"
            name="password"
            placeholder="password"
            value={user.password}
            autoComplete="password"
            type="password"
            onChange={(name, value) => user.setUser({ ...user, [name]: value })}
            validate={(value: string) => value.length > 3}
            rightIcon="eye"
            className={style.input}
          />

          <Button title="Sign in" disabled={!valid} />

          <div className={style.split}>
            <div className={style.line} />

            <div className={style.text}>{`or`}</div>

            <div className={style.line} />
          </div>

          <Button type={Button.types.SECONDARY} to="register" title="Register as a new User" />

          {user.loading && <Loader />}

          {user.error && <div className={style.error}>{user.error}</div>}
        </form>
      </Card>
      <div className={style.copy}>{`© 2019 X AB. All rights reserved.`}</div>
    </div>
  )
}

export default Login
