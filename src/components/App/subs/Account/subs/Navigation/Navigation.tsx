import * as React from 'react'

import * as style from './Navigation.scss'
import { UserContext } from 'contexts/user-context'
import Icon, { ICONS } from 'components/common/Icon'
import posed from 'react-pose'
import Item from './subs/Item'

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

function Navigation({ user }: NavigationProps) {
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    setActive(!active)
  }, [])

  return (
    <div className={style.navigation}>
      <Sidebar key="nav-selections" pose={active ? 'visible' : 'hidden'}>
        <Item icon={ICONS.home} title="Dashboard" to="/account/dashboard" />

        <Item icon={ICONS.growZone} title="Grow Zones" to="/account/grow-zones" />

        <Item icon={ICONS.density} title="Analytics" to="/account/analytics" />

        <Item icon={ICONS.system} title="System" to="/account/system" />

        <Item icon={ICONS.settings} title="Settings" to="/account/settings" />
      </Sidebar>

      <div className={style.signOut} onClick={() => user.signOut()}>
        <Icon icon={ICONS.logout} />

        <p>{'Logout'}</p>
      </div>
    </div>
  )
}

export default Navigation
