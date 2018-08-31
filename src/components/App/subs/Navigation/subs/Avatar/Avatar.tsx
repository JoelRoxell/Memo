import * as React from 'react'
import * as style from './Avatar.scss'
import { UserType } from 'api/modules/auth'
import source from 'utils/source'

interface AvatarProps {
  userType: UserType
  email: string
  image: string
}

class Avatar extends React.Component<AvatarProps> {
  render() {
    return (
      <div className={style.avatar}>
        <img src={source(this.props.image)} className={style.image} />

        <div className={style.userType}>
          {this.props.userType === UserType.Podcaster ? 'Podcaster' : 'Sponsor'}
        </div>

        <div className={style.email}>{this.props.email}</div>
      </div>
    )
  }
}

export default Avatar
