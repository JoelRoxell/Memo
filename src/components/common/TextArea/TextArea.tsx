import * as React from 'react'
import * as classNames from 'classnames'
import * as style from './TextArea.scss'

interface TextAreaProps {
  title: string
  placeholder: string
  autoComplete: string
  name: string
  value: string
  onChange: (name: string, value: string) => any
}

class TextArea extends React.Component<TextAreaProps> {
  render() {
    return (
      <div className={style.textArea}>
        <div className={style.title}>
          <div className={classNames(style.border, style.left)} />

          <div className={style.text}>{this.props.title}</div>

          <div className={classNames(style.border, style.right)} />
        </div>

        <textarea
          className={style.input}
          placeholder={this.props.placeholder}
          autoComplete={this.props.autoComplete}
          onChange={e => this.props.onChange(e.target.name, e.target.value)}
          name={this.props.name}
          value={this.props.value}
        />
      </div>
    )
  }
}

export default TextArea
