import * as React from 'react'
import posed from 'react-pose'

import * as style from './Item.scss'
import { NavLink } from 'react-router-dom'
import Icon from 'components/common/Icon'

const ItemAnimation = posed.li({
  visible: { x: 0, opacity: 1 },
  hidden: { x: -20, opacity: 0 }
})

interface ItemProps {
  icon: React.ReactElement
  title: string
  to: string
  badge?: number
}
const Item = (props: ItemProps) => (
  <ItemAnimation className={style.item} key={props.title}>
    <NavLink to={props.to} activeClassName={style.active}>
      <Icon icon={props.icon} badge={props.badge} />

      <p>{props.title}</p>
    </NavLink>
  </ItemAnimation>
)

export default Item
