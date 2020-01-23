import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { homeLoading, homeReceiveData, homeClearData, homeRequestDataFailure, homeTabChange } from '../actions/home'

export interface HomeState {
  loading: boolean
  homeData: {} | null
  homeTab: 'LIST' | 'MAP'
}

export const defaultState: HomeState = {
  loading: false,
  homeData: null,
  homeTab: 'LIST'
}

const homeReducer = (state: HomeState = defaultState, action: Action<any>): HomeState => {
  if (isType(action, homeLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, homeReceiveData)) {
    return {
      ...state,
      loading: false,
      homeData: action.data || null
    }
  }

  if (isType(action, homeClearData)) {
    return {
      ...state,
      loading: false,
      homeData: action.data
    }
  }

  if (isType(action, homeRequestDataFailure)) {
    return {
      ...state,
      loading: false
    }
  }

  if (isType(action, homeTabChange)) {
    return {
      ...state,
      homeTab: action.data
    }
  }

  return state
}

export default homeReducer
