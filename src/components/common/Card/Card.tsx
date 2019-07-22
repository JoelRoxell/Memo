import * as React from 'react'
import classNames from 'classnames'

import * as styles from './Card.scss'

interface CardProps {
  className?: string
  style?: { [prop: string]: string }
  children: React.ReactNode
}

function Card({ className, children, style }: CardProps) {
  return (
    <div className={classNames(styles.card, className)} style={style}>
      {children}
    </div>
  )
}

export default Card
