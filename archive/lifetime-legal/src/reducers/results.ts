import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  resultReceiveData,
  resultRequestData,
  resultRequestDataFailure,
  SearchParams,
  resultSetSearchParams,
} from '../actions/results'
import { PagedResultContactModel_ } from '@reapit/foundations-ts-definitions'

export interface ResultsState {
  loading: boolean
  search: SearchParams | null
  contacts: PagedResultContactModel_ | null
}

export const defaultState: ResultsState = {
  loading: false,
  search: null,
  contacts: null,
}

const resultReducer = (state: ResultsState = defaultState, action: Action<any>): ResultsState => {
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
