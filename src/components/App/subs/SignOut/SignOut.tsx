import * as React from 'react'

import { Redirect } from 'react-router'

import * as style from './SignOut.scss'

function SignOut() {
  React.useEffect(() => console.log('Sign out'), [])

  return (
    <div className={style.signOut}>
      <Redirect to="/" />
    </div>
  )
}

export default SignOut
