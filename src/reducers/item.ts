import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { itemLoading, itemReceiveData, itemClearData } from '../actions/item'

export interface ItemItem {
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

export interface ItemState {
  loading: boolean
  itemData: ItemItem | null
}

export const defaultState: ItemState = {
  loading: false,
  itemData: null
}

const itemReducer = (state: ItemState = defaultState, action: Action<any>): ItemState => {
  if (isType(action, itemLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, itemReceiveData)) {
    return {
      ...state,
      loading: false,
      itemData: action.data || null
    }
  }

  if (isType(action, itemClearData)) {
    return {
      ...state,
      loading: false,
      itemData: action.data
    }
  }

  return state
}

export default itemReducer
