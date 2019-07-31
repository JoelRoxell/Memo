import * as React from 'react'

import * as style from './Navigation.scss'
import { UserContext } from 'contexts/user-context'
import Icon from 'components/common/Icon'
import { ICONS } from 'components/common/Icon/Icon'
import posed from 'react-pose'
import { NavLink } from 'react-router-dom'

interface NavigationProps {
  user: UserContext
}

const Sidebar = posed.ul({
  hidden: {
    opacity: 0,
    y: '3%'
  },
  visible: {
    delayChildren: 150,
    staggerChildren: 100,
    opacity: 1,
    y: '0%',
    transition: {
      y: { type: 'spring', stiffness: 800, damping: 50 }
    }
  }
})

const Item = posed.li({
  visible: { x: 0, opacity: 1 },
  hidden: { x: -20, opacity: 0 }
})

function Navigation({ user }: NavigationProps) {
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    setActive(!active)
  }, [])

  return (
    <div className={style.navigation}>
      <Sidebar key="nav-selections" pose={active ? 'visible' : 'hidden'}>
        <Item className={style.link} key="dashboard">
          <NavLink to={'/account/dashboard'} activeClassName={style.active}>
            <Icon icon={ICONS.eye} />
            Dashboard
          </NavLink>
        </Item>

        <Item className={style.link} key="grow-zones">
          <NavLink to={'/account/grow-zones'} activeClassName={style.active}>
            <Icon icon={ICONS.eye} />
            Grow Zones
          </NavLink>
        </Item>
      </Sidebar>

      <div className={style.signOut} onClick={() => user.signOut()}>
        <Icon icon={ICONS.eye} />
      </div>
    </div>
  )
}

export default Navigation
