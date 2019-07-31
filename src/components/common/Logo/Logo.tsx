import * as React from 'react'
import classNames from 'classnames'
import posed from 'react-pose'

import * as style from './Logo.scss'
import Icon from '../Icon'

interface LogoProps {
  className?: string
}

const Box = posed.div({
  visible: {
    opacity: 1,
    y: '-3%',
    transition: {
      type: 'spring',
      stiffness: 100,
      opacity: { ease: 'easeOut', duration: 600 },
      y: { ease: 'easeOut', duration: 600 },
      default: { ease: 'linear', duration: 500 }
    }
  },
  hidden: { opacity: 0, y: '0%' }
})

function Logo(props: LogoProps) {
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    setActive(!active)
  }, [])

  return (
    <Box pose={active ? 'visible' : 'hidden'}>
      <div className={classNames(style.logo, props.className)}>
        <Icon name="logo" svgStyle={{ fill: '#e2c085' }} />
      </div>
    </Box>
  )
}

export default Logo
