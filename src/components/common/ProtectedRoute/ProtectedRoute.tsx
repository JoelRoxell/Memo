import * as React from 'react'
import { Route, Redirect } from 'react-router'
import { UserContext } from 'contexts/user-context'

interface ProtectedRouteProps {
  path: string
  redirect: string
  component: any
  render?: any
  reversed?: boolean
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const user = React.useContext(UserContext)
  const Component = props.component || props.render
  const token = user.token ? 1 : 0
  const reversed = props.reversed ? 1 : 0

  return (
    <Route
      path={props.path}
      render={() =>
        token ^ reversed ? <Component {...props} /> : <Redirect to={props.redirect} />
      }
    />
  )
}

export default ProtectedRoute
