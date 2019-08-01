import * as React from 'react'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

import * as style from './StatusBar.scss'
import Icon, { ICONS } from 'components/common/Icon'
import { getTime } from 'utils/time'

interface StatusBarProps {
  username: string
  totalPower: number
  notificationCount: number
}

function StatusBar(props: StatusBarProps) {
  const now = new Date(),
    [, month, dayN, year] = now.toDateString().split(' '),
    [timer, setTimer] = useState(getTime())

  useEffect(() => {
    const i = setInterval(() => {
      setTimer(getTime())
    }, 1000)

    return () => clearInterval(i)
  })

  return (
    <div className={style.statusBar}>
      <div className={style.item}>
        <img alt="profile-image" className={style.profileImage} />

        <p>{props.username || `Jane Doe`}</p>
      </div>

      <div className={style.splitter} />

      <div className={classNames(style.item, style.time)}>
        <p>{`${timer[0]}:${timer[1]}`}</p>
        <p>{`:${timer[2]}`}</p>
      </div>

      <div className={style.splitter} />

      <div className={style.item}>
        <p>{`${month} ${dayN}, ${year}`}</p>
      </div>

      <div className={style.splitter} />

      <div className={style.item}>
        <p>{`Total power: 1.3 kW`}</p>
      </div>

      <div className={style.splitter} />

      <div className={style.item}>
        <Icon icon={ICONS.bell} badge={props.notificationCount} badgeStyle={style.badge} />
      </div>
    </div>
  )
}

export default StatusBar
