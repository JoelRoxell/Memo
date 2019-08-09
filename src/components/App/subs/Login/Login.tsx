import * as React from 'react'
import posed from 'react-pose'

import Input from 'components/common/Input'
import Button from 'components/common/Button'
import { UserContext } from 'contexts/UserContext'
import Loader from 'components/common/Loader'
import Card from 'components/common/Card'

import * as style from './Login.scss'
import Logo from 'components/common/Logo'

const Container = posed.div({
  hidden: {
    opacity: 0,
    y: '3%'
  },
  visible: {
    delayChildren: 300,
    staggerChildren: 50,
    opacity: 1,
    y: '0%',
    transition: {
      y: { type: 'spring', stiffness: 800, damping: 50 }
    }
  }
})

function Login() {
  const user = React.useContext(UserContext) as UserContext
  const valid = user.email.length > 3 && user.password.length > 3

  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    setActive(!active)
  }, [])

  return (
    <div className={style.login}>
      <Container pose={active ? 'visible' : 'hidden'}>
        <Card className={style.view}>
          <form
            className={style.form}
            onSubmit={e => {
              e.preventDefault()

              user.signIn()
            }}
          >
            <Logo className={style.logo} />

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
              className={style.input}
            />

            <Input
              title="Password"
              name="password"
              placeholder="password"
              value={user.password}
              autoComplete="password"
              type="password"
              onChange={(name, value) => {
                user.clearError()
                user.setUser({ ...user, [name]: value })
              }}
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

            <div className={style.error}>{user.error}</div>

            <Loader active={user.loading} />
          </form>
        </Card>

        <div className={style.copy}>{`© 2019 X AB. All rights reserved.`}</div>
      </Container>
    </div>
  )
}

export default Login
