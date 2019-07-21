import * as React from 'react'

import Input from 'components/common/Input'
import Button from 'components/common/Button'

import * as style from './Login.scss'
import { UserContext } from 'contexts/user-context'
import Loader from 'components/common/Loader'

function Login() {
  const user = React.useContext(UserContext)
  console.log(user)

  return (
    <div className={style.login}>
      <form
        className={style.view}
        onSubmit={e => {
          e.preventDefault()

          user.signIn()
        }}
      >
        <div className={style.title}>{`Login title`}</div>

        <Input
          title="Email"
          name="email"
          placeholder="email"
          value={user.email}
          autoComplete="email"
          onChange={(name, value) => user.setUser({ ...user, [name]: value })}
        />

        <Input
          title="Password"
          name="password"
          placeholder="password"
          value={user.password}
          autoComplete="password"
          type="password"
          onChange={(name, value) => user.setUser({ ...user, [name]: value })}
        />

        <Button type="primary" title="Sign in" />

        <Button to="register" type="default" title="Register" className={style.registerButton} />

        {user.loading && <Loader />}

        {/* {error && <div className={style.error}>{error}</div>} */}
      </form>
    </div>
  )
}

export default Login
