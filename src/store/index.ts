import { combineReducers, Reducer, Dispatch } from 'redux'

import { CounterState, reducer as counterReducer } from './counter'

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: Dispatch<any>
}

export interface ApplicationState {
  counter: CounterState
}

export const reducers: Reducer<ApplicationState> = combineReducers<
  ApplicationState
>({
  counter: counterReducer
})
