import * as React from 'react'
import posed from 'react-pose'

const Animation = posed.div({
  visible: {
    opacity: 1,
    y: '0%'
  },
  hidden: {
    opacity: 0,
    y: '5%'
  }
})

const FadeIn = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    setActive(!active)
  }, [])

  return <Animation pose={active ? 'visible' : 'hidden'}>{children}</Animation>
}

export default FadeIn
