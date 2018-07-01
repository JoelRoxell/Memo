import * as React from 'react'
import * as style from './Browse.scss'

interface BrowseProps {
  title: string
}

class Browse extends React.Component<BrowseProps> {
  render() {
    return (
      <div className={style.browseView}>
        <p>Browse</p>

        <div className={style.text}>some simple text in the browse view</div>
      </div>
    )
  }
}

export default Browse
