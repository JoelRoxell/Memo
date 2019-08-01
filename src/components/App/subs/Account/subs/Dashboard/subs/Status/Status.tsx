import * as React from 'react'

import * as style from './Status.scss'
import Icon from 'components/common/Icon'

interface StatusProps {
  icon: React.ReactNode
  numerator: number
  denominator?: number
  title: string
  color: string
}

function Status(props: StatusProps) {
  return (
    <div className={style.status}>
      <div className={style.circleWrapper}>
        <div className={style.circle} style={{ backgroundColor: props.color }} />

        <Icon
          icon={props.icon}
          className={style.iconWrapper}
          svgStyle={{ className: style.icon, fill: props.color }}
        />
      </div>

      {props.denominator ? (
        <p className={style.ratio}>{`${props.numerator} / ${props.denominator}`}</p>
      ) : (
        <p className={style.ratio}>{`${props.numerator}`}</p>
      )}

      <p className={style.title}>{props.title}</p>
    </div>
  )
}

export default Status
