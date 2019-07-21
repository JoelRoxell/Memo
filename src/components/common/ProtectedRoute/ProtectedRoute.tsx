import * as React from 'react'
import { Route, Redirect } from 'react-router'

interface ProtectedRouteProps {
  token?: string
  path: string
  to: string
  component: any
  render?: any
  reversed?: boolean
}

// TODO: update to use context

export default class ProtectedRoute extends React.Component<ProtectedRouteProps> {
  render() {
    const Component = this.props.component || this.props.render
    const token = this.props.token ? 1 : 0
    const reversed = this.props.reversed ? 1 : 0

    return (
      <Route
        path={this.props.path}
        render={() =>
          token ^ reversed ? <Component {...this.props} /> : <Redirect to={this.props.to} />
        }
      />
    )
  }
}
