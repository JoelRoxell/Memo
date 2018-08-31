import { Country } from './../../api/modules/AppConfig/index'
import { Language, Category } from 'api/modules/AppConfig'
import { thunk } from 'store'
import { Action } from 'redux'

interface GetLanguages extends Action {
  type: 'GET_LANGUAGES'
}
interface ReceiveLanguages extends Action {
  type: 'RECEIVE_LANGUAGES'
  payload: Array<Language>
}
interface GetCategories extends Action {
  type: 'GET_CATEGORIES'
}
interface ReceiveCategories extends Action {
  type: 'RECEIVE_CATEGORIES'
  payload: Array<Category>
}
interface GetCountries extends Action {
  type: 'GET_COUNTRIES'
}
interface ReceiveCountries extends Action {
  type: 'RECEIVE_COUNTRIES'
  payload: Array<Language>
}
interface SetOverlay extends Action {
  type: 'SET_OVERLAY'
  payload: boolean
}

export type ApplicationConfigActions =
  | GetLanguages
  | ReceiveLanguages
  | GetCategories
  | ReceiveCategories
  | GetCountries
  | ReceiveCountries
  | SetOverlay

export interface ApplicationConfigState {
  languages: Array<Language>
  loading: boolean
  countries: Array<Country>
  categories: Array<Category>
  overlay: boolean
}

export const getLanguages = () => {
  return thunk(async (dispatch, _, api) => {
    const languages = await api.modules.appConfig.getLanguages()

    dispatch(receiveLanguages(languages))
  })
}

export const receiveLanguages = (
  languages: Array<Language>
): ReceiveLanguages => {
  return {
    type: 'RECEIVE_LANGUAGES',
    payload: languages
  }
}

export const getCategories = () => {
  return thunk(async (dispatch, _, api) => {
    const categories = await api.modules.appConfig.getCategories()

    dispatch(receiveCategories(categories))
  })
}

export const receiveCategories = (
  categories: Array<Category>
): ReceiveCategories => {
  return {
    type: 'RECEIVE_CATEGORIES',
    payload: categories
  }
}

export const getCountries = () => {
  return thunk(async (dispatch, _, api) => {
    const categories = await api.modules.appConfig.getCountries()

    dispatch(receiveCountries(categories))
  })
}

export const receiveCountries = (
  countries: Array<Country>
): ReceiveCountries => {
  return {
    type: 'RECEIVE_COUNTRIES',
    payload: countries
  }
}

export const actions = {
  setOverlay(state: boolean): SetOverlay {
    return {
      type: 'SET_OVERLAY',
      payload: state
    }
  }
}

export const initialState: ApplicationConfigState = {
  languages: [],
  countries: [],
  categories: [],
  loading: false,
  overlay: false
}

export const reducer = (
  state: ApplicationConfigState = initialState,
  action: ApplicationConfigActions
): ApplicationConfigState => {
  switch (action.type) {
    case 'GET_LANGUAGES':
      return { ...state, loading: true }

    case 'RECEIVE_LANGUAGES':
      return {
        ...state,
        languages: action.payload
      }

    case 'RECEIVE_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }

    case 'RECEIVE_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      }

    case 'SET_OVERLAY':
      return {
        ...state,
        overlay: action.payload
      }

    default:
      return state
  }
}
