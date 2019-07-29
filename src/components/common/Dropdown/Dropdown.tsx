import * as React from 'react'
import * as classNames from 'classnames'
import * as style from './Dropdown.scss'
import Checkbox from 'components/common/Checkbox'
import Icon from '../Icon'

interface Item {
  value: string | number
  id: string
}
interface DropdownProps {
  title: string
  items: Array<Item>
  onSelect: (item: Item | Item[]) => void
  className?: string
  selected?: string
  multi?: boolean
  icon?: string
}

class Dropdown extends React.Component<DropdownProps> {
  state: { selected: Item | Item[] | null; active: boolean }

  constructor(props: DropdownProps) {
    super(props)

    if (this.props.selected) {
      const item = this.props.items.find(x => x.id === this.props.selected)

      if (item) {
        this.state = {
          selected: item,
          active: false
        }
      }
    } else {
      this.state = { selected: this.props.multi ? [] : null, active: false }
    }
  }

  onClick = (item: Item) => {
    if (this.props.multi) {
      const items = this.state.selected as Item[]

      const index = items.findIndex(x => x.id === item.id)
      const selections = items.concat()

      if (index == -1) {
        selections.push(item)
      } else {
        selections.splice(index, 1)
      }

      this.setState({ selected: selections })
      this.props.onSelect(selections)
    } else {
      this.setState({ selected: item })

      this.props.onSelect(item)
    }
  }

  toggle = (state: boolean) => {
    this.setState({ ...this.state, active: state })
  }

  render() {
    // TODO: should animate and then remove item list, not only hide it.
    return (
      <div
        className={classNames(style.dropdown, this.props.className)}
        onMouseLeave={() => this.toggle(false)}
      >
        <div
          className={classNames(style.button, {
            [style.active]: this.state.active
          })}
          onClick={() => this.toggle(!this.state.active)}
        >
          {this.props.icon && <Icon name={this.props.icon} className={style.icon} />}

          {this.props.title}
        </div>

        <div
          className={classNames(style.list, {
            [style.active]: this.state.active
          })}
        >
          {this.props.items.map((item, i) => {
            let selected = false

            if (Array.isArray(this.state.selected)) {
              selected = this.state.selected.findIndex(x => x.id == item.id) > -1
            } else if (this.state.selected) {
              selected = this.state.selected.id == item.id
            }

            return (
              <div key={i} className={style.itemWrapper}>
                <div className={style.item} onClick={_ => this.onClick(item)}>
                  <Checkbox selected={selected} />

                  <div className={style.text}>{item.value}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Dropdown
