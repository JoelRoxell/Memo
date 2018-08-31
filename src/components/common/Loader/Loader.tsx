import * as React from 'react'
import * as Ionicon from 'react-ionicons'

class Loader extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Ionicon
          icon="ios-radio-button-off"
          fontSize="60px"
          color="#51a6ff"
          beat={true}
        />
      </div>
    )
  }
}

export default Loader
