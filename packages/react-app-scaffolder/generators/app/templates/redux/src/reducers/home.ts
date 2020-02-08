import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { homeLoading, homeReceiveData, homeClearData, homeRequestDataFailure } from '../actions/home'

export interface HomeState {
  loading: boolean
  homeData: {} | null
}

export const defaultState: HomeState = {
  loading: false,
  homeData: null,
}

const homeReducer = (state: HomeState = defaultState, action: Action<any>): HomeState => {
  if (isType(action, homeLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  if (isType(action, homeReceiveData)) {
    return {
      ...state,
      loading: false,
      homeData: action.data || null,
    }
  }

  if (isType(action, homeClearData)) {
    return {
      ...state,
      loading: false,
      homeData: action.data,
    }
  }

  if (isType(action, homeRequestDataFailure)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default homeReducer
