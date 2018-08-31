import * as React from 'react'
import * as style from 'components/App/subs/Register/subs/User/User.scss'
import Input from 'components/common/Input'
import Button from 'components/common/Button'

interface PodcasterProps {
  loading: boolean
  name: string
  email: string
  password: string
  agreedTerms: boolean
  error: string
  onChange: (inputName: string, value: string) => any
  submit: () => void
}

class Podcaster extends React.Component<PodcasterProps> {
  render() {
    return (
      <form
        className={style.podcaster}
        onKeyPress={e => e.key === 'Enter' && this.props.submit()}
        onSubmit={e => {
          e.preventDefault()

          this.props.submit()
        }}
      >
        <h2>Podcaster sign up</h2>

        <p>Sign up using company information</p>

        <Input
          title="name"
          placeholder="name"
          value={this.props.name}
          onChange={this.props.onChange}
          autoComplete="name"
        />

        <Input
          title="email"
          placeholder="email"
          value={this.props.email}
          onChange={this.props.onChange}
          autoComplete="email"
        />

        <Input
          title="password"
          placeholder="password"
          value={this.props.password}
          onChange={this.props.onChange}
          type="password"
          autoComplete="password"
        />

        {this.props.error && (
          <div className={style.error}>{this.props.error}</div>
        )}

        <Button type="primary" title="Submit" />
      </form>
    )
  }
}

export default Podcaster
