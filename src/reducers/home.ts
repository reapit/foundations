import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { homeLoading, homeReceiveData, homeClearData } from '../actions/home'

export interface HomeItem {
  data: {
    children: {
      data: {
        id: string
        title: string
        url: string
      }
    }[]
  }
}

export interface HomeState {
  loading: boolean
  homeData: HomeItem | null
}

export const defaultState: HomeState = {
  loading: false,
  homeData: null
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

  return state
}

export default homeReducer
