import { combineReducers, Reducer } from 'redux'

import { CounterState, reducer as counterReducer } from './counter'

export interface ApplicationState {
  counter: CounterState
}

export const reducers: Reducer<ApplicationState> = combineReducers<
  ApplicationState
>({
  counter: counterReducer
})
