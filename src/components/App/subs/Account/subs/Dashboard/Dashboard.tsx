import * as React from 'react'

import * as style from './Dashboard.scss'
import Card from 'components/common/Card'

function Dashboard() {
  return (
    <div className={style.dashboard}>
      <div className={style.top}>
        <Card className={style.card}>{`Active Zones`}</Card>

        <Card className={style.card}>{`user / Unused Lights`}</Card>

        <Card className={style.card}>{`Active / Inactive Sensors`}</Card>

        <Card className={style.card}>{`New Notifications`}</Card>
      </div>

      <div className={style.bottom}>
        <Card className={style.powerConsumption}>{`Graf`}</Card>
      </div>
    </div>
  )
}

export default Dashboard
