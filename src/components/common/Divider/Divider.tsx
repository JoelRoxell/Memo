import * as React from 'react'
import * as style from './Divider.scss'
import * as classNames from 'classnames'

interface DividerProps {
  title?: string
  className?: string
}

class Divider extends React.Component<DividerProps> {
  render() {
    return (
      <div className={classNames(style.divider, this.props.className)}>
        <div className={style.left} />

        {this.props.title && (
          <div className={style.text}>{this.props.title}</div>
        )}

        <div className={style.line} />
      </div>
    )
  }
}

export default Divider
