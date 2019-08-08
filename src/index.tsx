import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from 'components/App'

function render(App: any) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement
  )
}

render(App)

/*
 * Enable support for hot-reloading the application.
 */
if (module.hot) {
  module.hot.accept('components/App', () => {
    console.log('run')

    render(App)
  })
}
