import * as React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Icon from 'components/common/Icon'
import * as style from './Loader.scss'

const Wrapper = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
})

interface LoaderProps {
  active: boolean
}

function Loader(props: LoaderProps) {
  return (
    <div className={style.loader}>
      <PoseGroup>
        {props.active && (
          <Wrapper key="loader">
            <div style={{ textAlign: 'center' }}>
              <Icon
                name="loader"
                svgStyle={{
                  stroke: 'rgb(226, 192, 133)'
                }}
              />
            </div>
          </Wrapper>
        )}
      </PoseGroup>
    </div>
  )
}

export default Loader
