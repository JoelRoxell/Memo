import * as React from 'react'
import classNames from 'classnames'

import * as style from './Status.scss'
import Icon from 'components/common/Icon'
import posed from 'react-pose'
import Card from 'components/common/Card'
import { useDidMount } from 'hooks/useDidMount'

interface StatusProps {
  icon: React.ReactNode
  numerator: number
  denominator?: number
  className?: string
  title: string
  color: string
}

const StatusAnimation = posed.div({
  mounted: {
    opacity: 1
  },
  unMounted: {
    opacity: 0
  },
  initialPose: 'unMounted'
})

function Status(props: StatusProps) {
  const mounted = useDidMount()

  return (
    <StatusAnimation pose={mounted ? 'mounted' : 'unMounted'} className={props.className}>
      <Card className={classNames(style.status, props.className)}>
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
      </Card>
    </StatusAnimation>
  )
}

export default Status
