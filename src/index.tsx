import * as React from 'react'
import * as ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { reducers, ApplicationState, createInitialState } from 'store'
import Api from 'api'
import App from 'components/App'
import Axios from 'axios'
import DB from 'api/modules/db'
import { Token } from 'api/modules/auth'
import { extractTokenData } from 'store/auth'

const api = new Api(Axios, {
  db: {
    onInit: async (db: DB) => {
      console.info('IDB initialized')

      const auth = await db.get<Token>('auth', 'token')

      let initialState = createInitialState()

      if (auth) {
        initialState.auth.token = auth.token
        initialState.auth.decodedToken = extractTokenData(auth.token)
      }

      render(initialState)
    }
  }
})

function render(state: ApplicationState) {
  const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
  })
  const store = createStore(
    reducers,
    state,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
  )

  // const actors = [
  //   // function onFilterDiff(state: ApplicationState, dispatch: Dispatch<any>) {
  //   //   state.browse.filter
  //   // }
  // ]
  // store.subscribe(() => {
  //   actors.forEach(fn => fn(store.getState(), store.dispatch))
  // })

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}
