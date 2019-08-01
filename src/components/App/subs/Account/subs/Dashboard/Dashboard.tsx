import * as React from 'react'

import * as style from './Dashboard.scss'
import Card from 'components/common/Card'
import Status from './subs/Status'
import { ICONS } from 'components/common/Icon'

function Dashboard() {
  return (
    <div className={style.dashboard}>
      <div className={style.top}>
        <Card className={style.card}>
          <Status
            numerator={7}
            denominator={7}
            icon={ICONS.growZone}
            title={'Active Zones'}
            color={'#6ebd8f'}
          />
        </Card>

        <Card className={style.card}>
          <Status
            numerator={200}
            denominator={6}
            icon={ICONS.led}
            title={'Used / Unused Lights'}
            color={'#ffee37'}
          />
        </Card>

        <Card className={style.card}>
          <Status
            numerator={4}
            denominator={1}
            icon={ICONS.sensor}
            title={'Active / Inactive Sensors'}
            color={'#0c7088'}
          />
        </Card>

        <Card className={style.card}>
          <Status numerator={6} icon={ICONS.bell} title={'New Notifications'} color={'#ffad5f'} />
        </Card>
      </div>

      <div className={style.bottom}>
        <Card className={style.powerConsumption}>{`Graf`}</Card>
      </div>
    </div>
  )
}

export default Dashboard
