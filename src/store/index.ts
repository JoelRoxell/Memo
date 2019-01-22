import { combineReducers, Reducer } from 'redux'
import Api from 'api'
import { AuthState, reducer as authReducer, initialState as authInitialState } from './auth'

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps {
  dispatch: Dispatch<any>
}

export interface ApplicationState {
  auth: AuthState
}

export function createInitialState(): ApplicationState {
  return {
    auth: authInitialState
  }
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  auth: authReducer
})

/**
 * Function is used to allow us to get the parameters implicitly typed in the defined callback.
 * @param cb
 */
export function thunk<T>(
  cb: (dispatch: Dispatch<T>, getState: () => ApplicationState, api: Api) => void
) {
  return cb
}

// Below type definitions are used to fix errors thrown by TS on thunk actions.
export type ThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState: () => S, extraArgument: E) => R

export interface Dispatch<S> {
  <R, E>(asyncAction: ThunkAction<R, S, E>): R
}
export interface Dispatch<S> {
  <A>(action: A & { type: any }): A & { type: any }
}
