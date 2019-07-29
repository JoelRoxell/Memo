import * as React from 'react'
import * as classNames from 'classnames'

import * as style from './Checkbox.scss'

interface CheckboxProps {
  onChange?: () => any
  selected: boolean
  name?: string
}

function Checkbox(props: CheckboxProps) {
  return (
    <div
      onClick={props.onChange}
      className={classNames(style.checkbox, {
        [style.active]: props.selected
      })}
    >
      <input
        className={style.checkbox}
        type="checkbox"
        checked={props.selected}
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  )
}

export default Checkbox
