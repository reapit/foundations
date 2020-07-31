import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchScopeList, fetchScopeListSuccess, fetchScopeListFailed } from '@/actions/scopes'
import { ScopeModel } from '@reapit/foundations-ts-definitions'

export interface ScopeListState {
  data?: ScopeModel[]
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: ScopeListState = {
  data: [],
  isLoading: false,
  errorMessage: null,
}

const scopesReducer = (state: ScopeListState = defaultState, action: Action<any>): ScopeListState => {
  if (isType(action, fetchScopeList)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchScopeListSuccess)) {
    const { data } = action
    return {
      ...state,
      data,
      isLoading: false,
    }
  }

  if (isType(action, fetchScopeListFailed)) {
    return {
      ...state,
      errorMessage: action.data,
      isLoading: false,
    }
  }

  return state
}

export default scopesReducer
