import * as React from 'react'
import * as style from './Checkbox.scss'
import * as classNames from 'classnames'

interface CheckboxProps {
  onChange?: () => any
  selected: boolean
}

class Checkbox extends React.Component<CheckboxProps> {
  render() {
    return (
      <div
        onClick={this.props.onChange}
        className={classNames(style.checkbox, {
          [style.active]: this.props.selected
        })}
      >
        <input
          className={style.checkbox}
          type="checkbox"
          checked={this.props.selected}
        />
      </div>
    )
  }
}

export default Checkbox
