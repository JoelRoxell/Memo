import * as React from 'react'
import * as style from './Profile.scss'
import Button from 'components/common/Button'
import Input from 'components/common/Input'
import { UserType } from 'api/modules/auth'
import Ionicon from 'react-ionicons'

import source from 'utils/source'

interface ProfileProps {
  userType: UserType
  name: string
  email: string
  presentation: string
  website: string
  stripe: any
  image: string | null
  onChange: (name: string, value: string) => void
  onUpload: (file: File) => void
  onSubmit: (
    payload: {
      presentation: string
      website: string
      image: string
      name?: string
      contact?: string
    }
  ) => void
  onMount: () => void
  loading: boolean
}

class Profile extends React.Component<ProfileProps> {
  state: { image: string | null }

  constructor(props: ProfileProps) {
    super(props)

    this.state = { image: null }
  }

  componentDidMount() {
    this.props.onMount()
  }

  render() {
    const profileImage = source(this.props.image)

    return (
      <div className={style.profile}>
        <h2 className={style.title}>Profile</h2>

        <div className={style.profileInformation}>
          <div className={style.imageWrapper}>
            <div
              onClick={() => {
                const elm = document.getElementById('profile-image-input')

                if (elm) {
                  elm.click()
                }
              }}
            >
              <input
                hidden
                type="file"
                id="profile-image-input"
                name="profile-image"
                onChange={e => {
                  if (e.target.files) {
                    const file = e.target.files[0]
                    const reader = new FileReader()

                    reader.onloadend = () => {
                      this.setState({ image: reader.result })

                      this.props.onUpload(file)
                    }

                    reader.readAsDataURL(file)
                  }
                }}
              />

              <img
                src={profileImage}
                alt="profile-image"
                className={style.profileImage}
              />

              <div className={style.iconWrapper}>
                <Ionicon className={style.icon} icon={'md-create'} />
              </div>
            </div>

            <div className={style.type}>
              {this.props.userType == UserType.Podcaster
                ? 'Podcaster'
                : 'Sponsor'}
            </div>

            <div className={style.email}>{this.props.email}</div>
          </div>

          <div className={style.form}>
            <Input
              autoComplete="Presentation"
              name="presentation"
              placeholder="Presentation..."
              title="presentation"
              value={this.props.presentation}
              onChange={this.props.onChange}
            />

            <Input
              placeholder="https://"
              title="Website"
              name="website"
              autoComplete="website"
              value={this.props.website}
              onChange={this.props.onChange}
            />

            <Button
              type="primary"
              title="save"
              onClick={() => {
                this.props.onSubmit({
                  name: this.props.name,
                  presentation: this.props.presentation,
                  website: this.props.website,
                  image: this.props.image || ''
                })
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
