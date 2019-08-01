import * as React from 'react'
import posed from 'react-pose'

import * as style from './Dashboard.scss'
import Card from 'components/common/Card'
import Status from './subs/Status'
import { ICONS } from 'components/common/Icon'

const ListAnimation = posed.div({
  mounted: {
    opacity: 1,
    delayChildren: 200,
    staggerChildren: 200
  },
  unMounted: {
    opacity: 0
  },
  initialPose: 'unMounted'
})

function Dashboard() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  })

  return (
    <div className={style.dashboard}>
      <ListAnimation pose={mounted ? 'mounted' : 'unMounted'}>
        <div className={style.top}>
          <Status
            className={style.card}
            numerator={7}
            denominator={7}
            icon={ICONS.growZone}
            title={'Active Zones'}
            color={'#6ebd8f'}
          />

          <Status
            className={style.card}
            numerator={200}
            denominator={6}
            icon={ICONS.led}
            title={'Used / Unused Lights'}
            color={'#ffee37'}
          />

          <Status
            className={style.card}
            numerator={4}
            denominator={1}
            icon={ICONS.sensor}
            title={'Active / Inactive Sensors'}
            color={'#0c7088'}
          />

          <Status
            className={style.card}
            numerator={6}
            icon={ICONS.bell}
            title={'New Notifications'}
            color={'#ffad5f'}
          />
        </div>
      </ListAnimation>

      <div className={style.bottom}>
        <Card className={style.powerConsumption}>{`Graf`}</Card>
      </div>
    </div>
  )
}

export default Dashboard
