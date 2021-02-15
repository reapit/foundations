import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  resultReceiveData,
  resultRequestData,
  resultRequestDataFailure,
  SearchParams,
  resultSetSearchParams,
} from '../actions/result'
import { ContactModelPagedResult } from '@reapit/foundations-ts-definitions'

export interface ResultState {
  loading: boolean
  search: SearchParams | null
  contacts: ContactModelPagedResult | null
}

export const defaultState: ResultState = {
  loading: false,
  search: null,
  contacts: null,
}

const resultReducer = (state: ResultState = defaultState, action: Action<any>): ResultState => {
  if (isType(action, resultSetSearchParams)) {
    return {
      ...state,
      search: action.data,
    }
  }

  if (isType(action, resultRequestData)) {
    return {
      ...state,
      loading: true,
    }
  }

  if (isType(action, resultReceiveData)) {
    return {
      ...state,
      loading: false,
      contacts: action.data || null,
    }
  }

  if (isType(action, resultRequestDataFailure)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default resultReducer
