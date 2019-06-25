import * as React from 'react'

import Button from 'components/common/Button'

import * as style from './Register.scss'

function Register() {
  return (
    <div className={style.register}>
      <div className={style.view}>
        {`This is should be a register page...`}

        <Button to="login" title="Login" type="default" />
      </div>
    </div>
  )
}

export default Register
